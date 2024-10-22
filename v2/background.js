// Monitor tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('eproc.jfpr.jus.br/eprocV2')) {
      browser.tabs.executeScript(tabId, { file: 'eproc_content.js' });
    }
  });

  // Listen for messages from content script
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "storeToken") {
      browser.storage.local.set({ token: request.token }).then(() => {
        console.log("Token stored successfully:", request.token);
        // Change the icon to green
        browser.browserAction.setIcon({ path: "icon-green.png" });
      });
    }
  });