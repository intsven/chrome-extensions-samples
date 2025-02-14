//chrome.sidePanel
//  .setPanelBehavior({ openPanelOnActionClick: true })
//  .catch((error) => console.error(error));


// open not in side panel but new panel when clicking extension icon
/*chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: 'sidepanel/index.html',
    type: 'panel',
    width: 400,
    height: 600
  });
});*/

// wait for page reload to clear chat history
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ chatHistory: [] });
});

async function getCurrentTab() {
  try {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  } catch (error) {
    console.error('Error getting current tab:', error);
  }
  return null;
}

// Create screenshot request handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'screenshot') {
    let tab = getCurrentTab();
    chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, (dataUrl) => {
      //console.log('Captured screenshot:', dataUrl);
      sendResponse({ dataUrl });
    });
    return true;
  }
});