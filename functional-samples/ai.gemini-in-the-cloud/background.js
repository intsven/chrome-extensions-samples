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