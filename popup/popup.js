(function() {
  function search(tab, timeDiff) {
    var gettingScript = browser.tabs.executeScript(tab.id, {file: "/content_script.js"});
    gettingScript.then(function() {
      browser.tabs.sendMessage(tab.id, {timeDiff: timeDiff});
    });
  }

  function searchOnActiveTab(timeDiff) {
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then(function(tabs) {
      var tab = tabs[0];
      search(tab, timeDiff);
    });
  }

  document.querySelectorAll('.search-button').forEach(function(searchButton) {
    var timeDiff = parseInt(searchButton.dataset.timeDiff);
    searchButton.addEventListener('click', function() {
      searchOnActiveTab(timeDiff);
    });
  });
})();
