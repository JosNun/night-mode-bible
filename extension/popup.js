const enableCheckbox = document.getElementById('disable-checkbox');

chrome.storage.sync.get(
  ['nightModeEnabled'],
  ({ nightModeEnabled: isEnabled }) => {
    console.log(`nightModeEnabled: ${isEnabled}`);
    enableCheckbox.checked = !isEnabled;
  }
);

enableCheckbox.addEventListener('change', () => {
  let currentlyEnabled;
  chrome.storage.sync.get(['nightModeEnabled'], storage => {
    currentlyEnabled = storage.nightModeEnabled;
    chrome.storage.sync.set({ nightModeEnabled: !currentlyEnabled });
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, `{"enable": ${!currentlyEnabled}}`);
    });
  });
});
