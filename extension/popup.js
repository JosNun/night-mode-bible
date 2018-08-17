const body = document.getElementsByTagName('body')[0];

chrome.storage.sync.get(
  ['nightModeEnabled'],
  ({ nightModeEnabled: isEnabled }) => {
    console.log(`nightModeEnabled: ${isEnabled}`);
    if (!isEnabled) {
      body.classList.remove('dark');
    }
  }
);

body.addEventListener('click', () => {
  body.classList.toggle('dark');
  let currentlyEnabled;
  chrome.storage.sync.get(['nightModeEnabled'], storage => {
    currentlyEnabled = storage.nightModeEnabled;
    chrome.storage.sync.set({ nightModeEnabled: !currentlyEnabled });
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, `{"enable": ${!currentlyEnabled}}`);
    });
  });
});
