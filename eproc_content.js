// Function to validate the hash format
function isValidHash(hash) {
  // Regular expression for a 32-character hexadecimal string
  const hashRegex = /^[a-f0-9]{32}$/i;
  return hashRegex.test(hash);
}

// Select all links in the page
let links = document.querySelectorAll('a[href*="hash="]');

// Search for the first link containing a valid "hash="
let tokenFound = false;
links.forEach(link => {
  let url = new URL(link.href);
  let hash = url.searchParams.get('hash');
  if (hash && isValidHash(hash)) {
    // Send the token to the background script
    browser.runtime.sendMessage({ action: "storeToken", token: hash });
    tokenFound = true;
    return; // Exit the loop
  }
});

if (!tokenFound) {
  alert("Token válido não encontrado na página.");
}