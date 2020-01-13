(function() {
  if (chrome) {
    browser = chrome;
  }

  function search(timeDiff) {
    var elLinkToTweetOwner = document.querySelector("article.css-1dbjc4n.r-1loqt21.r-1udh08x:not(.r-o7ynqc):not(.r-1j63xyz) a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-sdzlij.r-1loqt21.r-1adg3ll.r-ahm1il.r-1udh08x.r-o7ynqc.r-6416eg.r-13qz1uu");
    var elTweetTimestamp   = document.querySelector(".permalink-tweet ._timestamp");

    var userId    = elLinkToTweetOwner.getAttribute("href").substr(1);
    var tweetId   = location.href.replace(new RegExp("^.*/"), "");
    var tweetTime = toTweetTime(tweetId);

    var tweetDate = new Date(tweetTime);
    var sinceDate = new Date(tweetDate.getTime() - timeDiff);
    var untilDate = new Date(tweetDate.getTime() + timeDiff);

    var query = toSearchQuery(userId, sinceDate, untilDate);
    var url   = toSearchUrl(query);
    location.href = url;
  }

  function toTweetTime(tweetId) {
    return Number((BigInt(tweetId) >> 22n) + 1288834974657n);
  }

  function toSearchQuery(userId, sinceDate, untilDate) {
    return "from:"+userId+" include:nativeretweets since:"+toTwitterDatetime(sinceDate)+" until:"+toTwitterDatetime(untilDate);
  }

  function toSearchUrl(query) {
    return "https://twitter.com/search?f=tweets&q="+encodeURIComponent(query);
  }

  function toTwitterDatetime(d) {
    var year     = d.getUTCFullYear();
    var month    = d.getUTCMonth()+1;
    var date     = d.getUTCDate();
    var hours    = d.getUTCHours();
    var minutes  = d.getUTCMinutes();
    var seconds  = d.getUTCSeconds();
    var timezone = "UTC";

    if (month   < 10) month   = "0"+month;
    if (date    < 10) date    = "0"+date;
    if (hours   < 10) hours   = "0"+hours;
    if (minutes < 10) minutes = "0"+minutes;
    if (seconds < 10) seconds = "0"+seconds;

    return year+"-"+month+"-"+date+"_"+hours+":"+minutes+":"+seconds+"_"+timezone;
  }

  browser.runtime.onMessage.addListener(function(message) {
    search(message.timeDiff);
  });
})();
