(function() {
  if (chrome) {
    browser = chrome;
  }

  function search(timeDiff) {
    var urlMatches = location.href.match(/([^\/]+)\/status\/([^\/]+)$/);
    if (urlMatches === null) {
      return;
    }

    var userId    = urlMatches[1];
    var tweetId   = urlMatches[2];
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
