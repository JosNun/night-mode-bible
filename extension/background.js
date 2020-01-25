chrome.runtime.onInstalled.addListener(() => {
  let currentlyEnabled;
  chrome.storage.sync.get(
    ['nightModeEnabled'],
    ({ nightModeEnabled: isEnabled }) => {
      currentlyEnabled = isEnabled;
    }
  );
  if (typeof currentlyEnabled === 'undefined') {
    chrome.storage.sync.set({ nightModeEnabled: true });
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
