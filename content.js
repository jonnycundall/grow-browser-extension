// content.js



function decorateGUIDs() {
  const textContainingElements = document.querySelectorAll('body :not(script):not(style):not(meta):not(link):not(title):not(head):not(html):not(br):not(img):not(hr)');

  textContainingElements.forEach((element) => {
    const textContent = element.textContent || element.innerText;

    // Regular expression to identify GUID-like patterns
    const guidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    const alreadyDecoratedRegex = /guid">[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

    if (guidRegex.test(textContent)) {
      console.log(element.id)
      // exclude ones we've already decorated
      if(alreadyDecoratedRegex.test(textContent)) return
      console.log(element.id)
      const balloon = document.createElement('div');

      //TODO do for all matches
      const guidMatch = textContent.match(guidRegex)[0];

      // Highlight the GUID text
      element.innerHTML = element.innerHTML.replace(guidMatch, `<span class="highlighted-guid">${guidMatch}</span>`);
      //find the span I just added
      //TODO match guid also
      const mySpan = element.querySelectorAll('.highlighted-guid')[0]
      if(!!mySpan){
      console.log(mySpan)
      balloon.className = 'guid-balloon';
      balloon.innerHTML = `<a href="https://www.example.com/search?q=${guidMatch}" target="_blank">M</a>`;

      // Calculate top and right positions for the balloon
      const rect = mySpan.getBoundingClientRect();
      const topPosition = window.scrollY + rect.top - balloon.offsetHeight - 5;
      const rightPosition = window.scrollX + rect.right + 5;

      balloon.style.top = `${topPosition}px`;
      balloon.style.right = `${rightPosition}px`;

      // Add the balloon decoration to the GUID-containing element
      document.body.appendChild(balloon);
      }
    }
  });
}

// Run the decoration function on page load
decorateGUIDs();

// Listen for changes in the DOM and re-run the decoration function
// const observer = new MutationObserver(decorateGUIDs);
// observer.observe(document.body, { subtree: true, childList: true });

//
