import {Tweet, TweetContent, TweetModel} from "../model/Tweet";
import TweetList from "../model/TweetList";

type getTweetType = "id" | "username";

const getTweetsByUserName = function (param: string): TweetModel[] {
    const tweetList = TweetList;
    return (tweetList.length > 0) && tweetList.filter((tweet: TweetModel) => (tweet["username"] == param));
}

const getTweetsById = function (param: number): TweetModel {
    const tweetList = TweetList;
    return (tweetList.length > 0) && tweetList.find((tweet: TweetModel) => (tweet["id"] == param));
}

const getTweetsIndexById = function (param: number): number | undefined {
    const tweetList = TweetList;
    let _index;
    if (tweetList.length > 0) {
        tweetList.forEach((tweet: TweetModel, index: number) => {
            if (tweet["id"] == param) _index = index;
        })
    }

    return _index
}

const isTweetContents = function (tweet: TweetModel): boolean {
    let isTweetModel = true;

    for (let key in tweet) {

        if ((key == 'text' || key == 'username' || key == 'name') && isTweetModel) {
            isTweetModel = tweet[key] ? true : false;
        }
    }

    return isTweetModel;
}

const tweetService = {getTweetsByUserName, getTweetsById, getTweetsIndexById, isTweetContents}

export default tweetService;