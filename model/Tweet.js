"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
var moment = require("moment");
var TweetList_1 = require("./TweetList");
var Tweet = function (tweet) {
    this.id = (function () {
        var returnId = exports.Tweet.prototype.length;
        exports.Tweet.prototype.push(returnId);
        return returnId;
    })();
    this.text = tweet.text;
    this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    this.name = tweet.name;
    this.username = tweet.username;
    this.url = tweet.url;
};
exports.Tweet = Tweet;
exports.Tweet.prototype = Object.create([]);
exports.Tweet.prototype.updateTweets = function (tweet) {
    tweet && TweetList_1.default.push(tweet);
};
/*
class TweetId {
    ids = 0;

    setIds = function (){
        const currentId = this.ids;
        this.ids++;
        return currentId;
    }
}


export default class Tweet extends TweetId{
    id: string;  // 트윗 아이디
    text: string;  // 트윗 텍스트
    // createdAt: Date; // 트윗 생성 날짜
    // name: string;  // 사용자 이름
    // username: string;  // 사용자 닉네임 (아이디)
    // url?: string; // 사용자 프로파일 사진 URL

    constructor(tweet) {
        super();
        this.id = this.setIds();
        this.text = tweet.text;
        // this.createdAt = tweet.createdAt;
        // this.name = tweet.name;
        // this.username = tweet.username;
        // this.url = tweet.url;
    }

}

*/
