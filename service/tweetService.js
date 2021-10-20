"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TweetList_1 = require("../model/TweetList");
var getTweetsByUserName = function (param) {
    var tweetList = TweetList_1.default;
    return (tweetList.length > 0) && tweetList.filter(function (tweet) { return (tweet["username"] == param) ? true : false; });
};
var getTweetsById = function (param) {
    var tweetList = TweetList_1.default;
    return (tweetList.length > 0) && tweetList.find(function (tweet) { return (tweet["id"] == param) ? true : false; });
};
var getTweetsIndexById = function (param) {
    var tweetList = TweetList_1.default;
    var _index;
    if (tweetList.length > 0) {
        tweetList.forEach(function (tweet, index) {
            if (tweet["id"] == param)
                _index = index;
        });
    }
    return _index;
};
var isTweetContents = function (tweet) {
    var isTweetModel = true;
    for (var key in tweet) {
        if ((key == 'text' || key == 'username' || key == 'name') && isTweetModel) {
            isTweetModel = tweet[key] ? true : false;
        }
    }
    return isTweetModel;
};
var tweetService = { getTweetsByUserName: getTweetsByUserName, getTweetsById: getTweetsById, getTweetsIndexById: getTweetsIndexById, isTweetContents: isTweetContents };
exports.default = tweetService;
