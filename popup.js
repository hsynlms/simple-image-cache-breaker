// handle button click event
document.getElementById('breakCache').addEventListener('click', function() {
  // send a message to content.js to version all existing images to break the cache
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // get the active tab
    var activeTab = tabs[0];

    // send the message to take the action
    chrome.tabs.sendMessage(activeTab.id, {'message': 'image_cache_break'});
  });
});

// handle image cache breaking process is done event
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === 'image_cache_break_done') {
      document.getElementById('container').className += ' succeed';
      document.getElementById('result').innerHTML = '<strong>Done!</strong><p>Cache has been broken for ' + request.data + ' image' + (request.data > 1 ? 's' : '') + ' in total.</p>';
    }
  }
);
