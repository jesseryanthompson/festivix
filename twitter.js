var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '3NSkvvVP6iQAjoTfWHLH2Wo9Z',
    consumer_secret: '7tyQjkGoE5crEBylrq01SlsApMA5t7nCCWDShg5W3lqqHv88Pc',
    access_token_key: '4306468393-9JEXyOECvYMdWbvOBnLyeajHbJtCoBUQSqUrIfF',
    access_token_secret: '0EEGzJz16QmNdyDMm6GpEVv4MNSyeE3pWJnLvQqJruVNg'
});

var tweets = [];
var params = {};
var currentTweet;

client.stream('statuses/filter', {track: '#browerix'}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet.text);
        // put it in a queue
        tweets.push(tweet);
    });

    stream.on('error', function(error) {
        throw error;
    });
});

setInterval(function() {

    if (tweets[0]) {
        currentTweet = tweets[0];

        tweets.splice(0, 1);

        console.log('found a tweet');
        console.log(currentTweet);
    }

}, 2000);

function laserWasInterrupted() {

}