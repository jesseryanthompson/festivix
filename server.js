'use strict';
var TweetCollector = require('./tweets.js');
var SocketManager = require('./socket-manager.js');
var Board = new require('./board.js');

class Festivix {
  constructor(options) {
    this.options = options;
    this.board = new Board();
    this.socketServer = new SocketManager();
    this.tweetCollector = new TweetCollector();

    this.tweetCollector.track('#festivix');

    setInterval(this.onTweetInterval.bind(this), options.timer);
  }

  onTweetInterval() {
    this.currentTweet = this.tweetCollector.getRandomTweetAndReset();
    console.log(this.currentTweet);
    
    if (this.currentTweet) {
      console.log("Tweet");
        this.socketServer.broadcast({
            tweet: this.currentTweet
        });

        this.board.toggleSaw();

        //console.log(this.currentTweet);

        this.lastTweet = this.currentTweet;

        // run saw
    }
  }
}

new Festivix({
  timer: 2000
});
