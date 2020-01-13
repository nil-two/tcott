(function() {
    if (chrome) {
        browser = chrome;
    }

    function search(tab, timeDiff) {
        browser.tabs.executeScript(tab.id, {file: "/content_script.js"}, function() {
            browser.tabs.sendMessage(tab.id, {timeDiff: timeDiff});
        });
    }

    function searchOnActiveTab(timeDiff) {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
