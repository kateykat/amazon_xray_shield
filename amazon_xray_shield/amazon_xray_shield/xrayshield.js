function removeXrayQuickview() {
  // Check if an element with class "xrayQuickView" exists
  var xrayquickviewElement = document.querySelector('.xrayQuickView');
  
  if (xrayquickviewElement) {
    xrayquickviewElement.remove();
    stopInterval();
  }
}

var intervalId = setInterval(removeXrayQuickview, 10000);

function stopInterval() {
  clearInterval(intervalId);
}

/* Work this out later
var attempts = 200;
setTimeout(function() {
    clearInterval(intervalId);
}, attempts * 5000);
*/