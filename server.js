'use strict';
var TweetCollector = require('./tweets.js');
var SocketManager = require('./socket-manager.js');

class Festivix {
  constructor(options) {
    this.options = options;
    this.socketServer = new SocketManager();
    this.tweetCollector = new TweetCollector();

    this.tweetCollector.track('hello');

    setInterval(this.onTweetInterval.bind(this), options.timer);
  }

  onTweetInterval() {
    this.currentTweet = this.tweetCollector.getRandomTweetAndReset();

    if (this.currentTweet) {
        this.socketServer.broadcast({
            tweet: this.currentTweet
        });

        //console.log(this.currentTweet);

        this.lastTweet = this.currentTweet;

        // run saw
    }
  }
}

new Festivix({
  timer: 2000
});
