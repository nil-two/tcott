var URL_PATTERN = /^(?:http|https):\/\/twitter.com\/[^\/]+\/status\//;
var ICON_PATH   = "icons/icon48.png";
var ICON_TITLE  = "Investigate the context of the tweet";

function initializePageAction(tab) {
  if (tab.url.match(URL_PATTERN)) {
    browser.pageAction.setIcon({tabId: tab.id, path: ICON_PATH});
    browser.pageAction.setTitle({tabId: tab.id, title: ICON_TITLE});
    browser.pageAction.show(tab.id);
  }
}

var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then(function(tabs) {
  tabs.forEach(function(tab) {
    initializePageAction(tab);
  })
});
browser.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
  initializePageAction(tab);
});
