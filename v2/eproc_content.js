// Function to validate the hash format
function isValidHash(hash) {
    const hashRegex = /^[a-f0-9]{32}$/i;
    return hashRegex.test(hash);
  }
  
  // Select all links in the page
  let links = document.querySelectorAll('a[href*="hash="]');
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
    alert("Valid token not found on the page.");
  }


// Function to handle link clicks and replace {hash} with stored token
function handleLinkClick(event) {
  event.preventDefault(); // Prevent the default link behavior

  const link = event.currentTarget;
  const url = new URL(link.href);
  const hash = url.searchParams.get('hash');

  if (hash === '{hash}') {
    // Retrieve the stored token
    browser.storage.local.get('token').then((result) => {
      if (result.token && isValidHash(result.token)) {
        // Replace {hash} with the stored token
        url.searchParams.set('hash', result.token);
        window.location.href = url.toString(); // Navigate to the new URL
      } else {
        alert("No valid token stored.");
      }
    });
  }
}

// Add click event listeners to links with {hash} placeholder
document.querySelectorAll('a[href*="eproc.jfpf.jus.brr"][href*="{hash}"]').forEach(link => {
  link.addEventListener('click', handleLinkClick);
});