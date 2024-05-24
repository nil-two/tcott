var URL_PATTERN = /^(?:http|https):\/\/x.com\/[^\/]+\/status\//;
var ICON_PATH   = "icons/icon48.png";
var ICON_TITLE  = "Investigate the context of the tweet";

if (chrome) {
    browser = chrome;
}

function initializePageAction(tab) {
    if (tab.url.match(URL_PATTERN)) {
        browser.action.setIcon({tabId: tab.id, path: ICON_PATH});
        browser.action.setTitle({tabId: tab.id, title: ICON_TITLE});
        browser.action.enable(tab.id);
    }
}

browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    tabs.forEach(function(tab) {
        initializePageAction(tab);
    })
});
browser.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
    initializePageAction(tab);
});
