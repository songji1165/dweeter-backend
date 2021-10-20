"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var TweetList_1 = require("../model/TweetList");
var Tweet_1 = require("../model/Tweet");
var tweetService_1 = require("../service/tweetService");
var router = express.Router();
router.get('/', function (req, res) {
    var tweetList = TweetList_1.default;
    var resultSend = tweetList;
    var query = req.query;
    if (query && query.username) {
        var _username = String(query.username);
        var userTweets = tweetService_1.default.getTweetsByUserName(_username);
        resultSend = userTweets ? userTweets : [];
    }
    res.status(200).send(resultSend);
});
router.get('/:id', function (req, res) {
    var idTweet = req.params.id && tweetService_1.default.getTweetsById(Number(req.params.id));
    res.status(200).send(idTweet || []);
});
router.post('/', function (req, res, next) {
    var body = req.body;
    if (body) {
        var tweet = new Tweet_1.Tweet(body);
        var isTweetModel = tweetService_1.default.isTweetContents(tweet);
        if (!isTweetModel) {
            res.status(400).json({
                status: 'error',
                error: '해당 트위터을 추가할 수 없습니다. 추가할 트위터의 내용을 확인해주세요.',
            });
        }
        tweet.updateTweets(tweet);
        res.status(201).send(tweet);
    }
});
router.put('/:id', function (req, res, next) {
    var params = req.params, body = req.body;
    var send;
    var code = 200;
    if (params && params.id) {
        var userTweet = tweetService_1.default.getTweetsById(Number(params.id));
        if (!userTweet || !body) {
            code = 400;
            send = '수정할 트위터를 확인해주세요.';
        }
        else {
            send = userTweet;
            for (var key in body) {
                if (key in userTweet) {
                    userTweet[key] = body[key];
                }
                else {
                    code = 400;
                    send = '수정할 내용을 확인해주세요.';
                }
            }
        }
        res.status(code).send(send);
    }
});
router.delete('/:id', function (req, res, next) {
    var params = req.params, body = req.body;
    var send = '해당 트위터를 삭제하였습니다.';
    var code = 204;
    if (params && params.id) {
        var userTweetIdx = tweetService_1.default.getTweetsIndexById(Number(params.id));
        if (!userTweetIdx) {
            code = 400;
            send = '삭제할 트위터를 확인해주세요.';
        }
        else {
            for (var i = 0; i < TweetList_1.default.length; i++) {
                if (TweetList_1.default[i].id == userTweetIdx) {
                    TweetList_1.default.splice(i, 1);
                    i--;
                }
            }
        }
    }
    res.status(code).send(send);
});
router.use(function (err, req, res, next) {
    console.error(err);
    res.status(400).send(err);
});
exports.default = router;
