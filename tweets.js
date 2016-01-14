'use strict';
var Twitter = require('twitter');
var _ = require('underscore');

class TweetCollector {
  constructor(options) {
    this.tweets = [];
    this.twitterClient = new Twitter({
        consumer_key: '3NSkvvVP6iQAjoTfWHLH2Wo9Z',
        consumer_secret: '7tyQjkGoE5crEBylrq01SlsApMA5t7nCCWDShg5W3lqqHv88Pc',
        access_token_key: '4306468393-9JEXyOECvYMdWbvOBnLyeajHbJtCoBUQSqUrIfF',
        access_token_secret: '0EEGzJz16QmNdyDMm6GpEVv4MNSyeE3pWJnLvQqJruVNg'
    });
  }

  track(str) {
    var self = this;

    this.twitterClient.stream('statuses/filter', {track: 'hello'}, function(stream) {
        stream.on('data', self.onTweetData.bind(self));

        stream.on('error', function(error) {
            throw error;
        });
    });
  }

  onTweetData(data) {
    this.tweets.push(data);
  }

  popTweet() {
    return this.tweets.pop();
  }

  getRandomTweetAndReset() {
    var tweet = this.tweets[Math.floor(Math.random() * this.tweets.length)];

    this.tweets = [];

    return tweet;
  }
}

module.exports = TweetCollector;
