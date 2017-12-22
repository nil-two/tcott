(function() {
  function search(timeDiff) {
    var elTweet          = document.querySelector(".permalink-tweet");
    var elTweetTimestamp = document.querySelector(".permalink-tweet ._timestamp");

    var userId    = elTweet.dataset.screenName;
    var timestamp = parseInt(elTweetTimestamp.dataset.timeMs);

    var tweetDate = new Date(parseInt(timestamp));
    var sinceDate = new Date(tweetDate.getTime() - timeDiff);
    var untilDate = new Date(tweetDate.getTime() + timeDiff);

    var query = toSearchQuery(userId, sinceDate, untilDate);
    var url   = toSearchUrl(query);
    location.href = url;
  }

  function toSearchQuery(userId, sinceDate, untilDate) {
    return "from:"+userId+" include:nativeretweets since:"+toTwitterDatetime(sinceDate)+" until:"+toTwitterDatetime(untilDate);
  }

  function toSearchUrl(query) {
    return "https://twitter.com/search?f=tweets&q="+encodeURIComponent(query);
  }

  function toTwitterDatetime(d) {
    var year    = d.getFullYear();
    var month   = d.getMonth()+1;
    var date    = d.getDate();
    var hours   = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    if (month   < 10) month   = "0"+month;
    if (date    < 10) date    = "0"+date;
    if (hours   < 10) hours   = "0"+hours;
    if (minutes < 10) minutes = "0"+minutes;
    if (seconds < 10) seconds = "0"+seconds;

    return year+"-"+month+"-"+date+"_"+hours+":"+minutes+":"+seconds+"_JST";
  }

  browser.runtime.onMessage.addListener(function(message) {
    search(message.timeDiff);
  });
})();
