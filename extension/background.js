console.log('running script');

// chrome.tabs.insertCSS({
//   file: 'styles.css',
// });

chrome.runtime.onInstalled.addListener(() => {
  let currentlyEnabled;
  chrome.storage.sync.get(
    ['nightModeEnabled'],
    ({ nightModeEnabled: isEnabled }) => {
      console.log(isEnabled);
      currentlyEnabled = isEnabled;
    }
  );
  if (typeof currentlyEnabled === 'undefined') {
    chrome.storage.sync.set({ nightModeEnabled: true });
    console.log('setting storage value');
  }
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: 'bible.com' },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    },
  ]);
});

chrome.webNavigation.onCommitted.addListener(
  () => {
    // chrome.tabs.insertCSS({
    //   file: 'styles.css',
    //   runAt: 'document_start',
    // });
  },
  { url: [{ hostSuffix: 'bible.com' }] }
);

chrome.storage.onChanged.addListener(changes => {
  console.log(changes.nightModeEnabled.newValue);
});

// chrome.runtime.onMessage.addListener((message, callback) => {
//   if (message == 'enableNightMode') {
//     chrome.tabs.executeScript({
//       file: 'styles.css',
//     });
//   }
// });
