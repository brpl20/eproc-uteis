document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
  
    // Check if token is stored
    browser.storage.local.get('token').then((result) => {
      if (result.token) {
        statusElement.style.display = 'block'; // Show success message
      }
    });
  
    document.getElementById('openLink').addEventListener('click', () => {
      if (statusElement.style.display === 'block') {
        browser.storage.local.get('token').then((result) => {
          if (result.token) {
            const url = `https://eproc.jfpr.jus.br/eprocV2&hash=${result.token}`;
            browser.tabs.create({ url });
          } else {
            alert("No token stored.");
          }
        });
      } else {
        alert("Token not stored yet.");
      }
    });
  });