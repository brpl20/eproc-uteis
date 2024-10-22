// Function to replace the regex pattern with a link
function replacePatternWithLink(element, token) {
    // Regex pattern
    const pattern = /(\d{7}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4})/g;

    // Get all text nodes within the element
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    // Process each text node
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent.nodeName !== 'A' && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            while (match = pattern.exec(textNode.textContent)) {
                const matchedText = match[0];
                const cleanedText = matchedText.replace(/[-\.]/g, '');
                const url = `https://eproc.jfpr.jus.br/eprocV2/controlador.php?acao=processo_selecionar&acao_origem=processo_consultar&acao_retorno=processo_consultar&num_processo=${cleanedText}&hash=${token}`;
                fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex, match.index)));

                const link = document.createElement('a');
                link.href = url;
                link.textContent = matchedText;
                fragment.appendChild(link);

                lastIndex = pattern.lastIndex;
            }

            if (lastIndex < textNode.textContent.length) {
                fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex)));
            }

            parent.replaceChild(fragment, textNode);
        }
    });
}

// Function to observe DOM changes
function observeDOM(token) {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {// Function to replace the regex pattern with a link
function replacePatternWithLink(element, token) {
    // Regex pattern
    const pattern = /(\d{7}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4})/g;

    // Get all text nodes within the element
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    // Process each text node
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent.nodeName !== 'A' && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            while (match = pattern.exec(textNode.textContent)) {
                const matchedText = match[0];
                // Remove dots and hyphens from the matched text
                const cleanMatchedText = matchedText.replace(/[.-]/g, '');
                const url = `https://eproc.jfpr.jus.br/eprocV2/controlador.php?acao=processo_selecionar&acao_origem=processo_consultar&acao_retorno=processo_consultar&num_processo=${cleanMatchedText}&hash=${token}`;

                fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex, match.index)));

                const link = document.createElement('a');
                link.href = url;
                link.textContent = matchedText; // Keep the original text for display
                fragment.appendChild(link);

                lastIndex = pattern.lastIndex;
            }

            if (lastIndex < textNode.textContent.length) {
                fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex)));
            }

            parent.replaceChild(fragment, textNode);
        }
    });
}

// Function to observe DOM changes
function observeDOM(token) {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        replacePatternWithLink(node, token);
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        replacePatternWithLink(node, token);
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

// Retrieve the token from storage and start observing
browser.storage.local.get('token').then((data) => {
    if (data.token) {
        console.log(`Token found: ${data.token}`);
        observeDOM(data.token);
    } else {
        console.log("Token not found in storage.");
    }
});