// Monitorar atualizações de abas
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('eproc.jfpr.jus.br/eprocV2')) {
      browser.tabs.executeScript(tabId, { file: 'eproc_content.js' });
    }
  });
  
// Ouvir mensagens do content script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "storeToken") {
      browser.storage.local.set({ token: request.token }).then(() => {
        console.log("Token armazenado com sucesso:", request.token);
        let tokenBR = request.token
        return tokenBR;
      });
    }
  });