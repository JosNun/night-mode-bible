function loadCSS(file) {
  if (document.getElementById(file)) {
    // the css has already been added
    return;
  }
  const link = document.createElement('link');
  link.href = chrome.extension.getURL(`${file}`);
  link.id = file;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  const head = document.getElementsByTagName('head')[0];
  if (head) {
    // in case this runs before head exists. hmmm.
    head.appendChild(link);
  }
}

function unloadCSS(file) {
  const cssNode = document.getElementById(file);
  if (cssNode) {
    // this could be called when the thing's already unloaded
    cssNode.parentNode.removeChild(cssNode);
  }
}

chrome.runtime.onMessage.addListener((message, sender, res) => {
  const messageObj = JSON.parse(message);
  if (messageObj.enable) {
    loadCSS('styles.css');
  } else {
    unloadCSS('styles.css');
  }
});

chrome.storage.sync.get(['nightModeEnabled'], ({ nightModeEnabled }) => {
  if (nightModeEnabled) {
    loadCSS('styles.css');
  }
});
