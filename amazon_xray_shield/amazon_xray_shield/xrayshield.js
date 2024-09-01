(function() {
  let observer;

  function removeXrayQuickview() {
    const xrayquickviewElement = document.querySelector('.xrayQuickView');
    
    if (xrayquickviewElement) {
      try {
        xrayquickviewElement.remove();
        console.log('Element removed successfully.');
      } catch (e) {
        console.error('Error removing element:', e);
      }
    }
  }

  function startObserving() {
    // Stop any existing observer to prevent multiple observers
    stopObserving();

    // Create a new MutationObserver instance
    observer = new MutationObserver(function(mutationsList) {
      // Debounce or throttle the callback to avoid excessive processing
      debounce(() => {
        mutationsList.forEach(mutation => {
          if (mutation.addedNodes.length) {
            removeXrayQuickview();
          }
        });
      }, 100)(); // Debounce delay in milliseconds
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('MutationObserver started.');
  }

  function stopObserving() {
    if (observer) {
      observer.disconnect();
      observer = null;
      console.log('MutationObserver stopped.');
    }
  }

  function debounce(callback, delay) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }

  // Initial observer setup
  startObserving();

  // Reinitialize observer on navigation within a SPA
  window.addEventListener('popstate', startObserving);
  window.addEventListener('pushstate', startObserving);
  window.addEventListener('replacestate', startObserving);

  // Override pushState and replaceState to dispatch custom events
  (function(history) {
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function(state, title, url) {
      const result = pushState.apply(history, arguments);
      window.dispatchEvent(new Event('pushstate'));
      return result;
    };

    history.replaceState = function(state, title, url) {
      const result = replaceState.apply(history, arguments);
      window.dispatchEvent(new Event('replacestate'));
      return result;
    };
  })(window.history);

})();
