import {Tweet, TweetContent, TweetModel} from "../model/Tweet";

type getTweetType = "id" | "username";


let TweetRepository: TweetModel[] = [];

const getAll = async function () {
    return TweetRepository;
}

const getByUserName = async function (param: string) {
    return TweetRepository.filter((tweet: TweetModel) => (tweet["username"] == param));
}

const getById = async function (param: number) {
    const tweetList = TweetRepository;
    return (tweetList.length > 0) && tweetList.find((tweet: TweetModel) => (tweet["id"] == param));
}

const getTweetsIndexById = async function (param: number) {
    const tweetList = TweetRepository;
    let _index;
    if (tweetList.length > 0) {
        tweetList.forEach((tweet: TweetModel, index: number) => {
            if (tweet["id"] == param) _index = index;
        })
    }

    return _index
}

const hasContent = async function (tweet: TweetModel) {
    let isTweetModel = true;

    for (let key in tweet) {

        if ((key == 'text' || key == 'username' || key == 'name') && isTweetModel) {
            isTweetModel = tweet[key] ? true : false;
        }
    }

    return isTweetModel;
}

const update = async function (id, body: Partial<TweetContent>) {
    const userTweet = getById(Number(id));

    if (userTweet) {
        for (let key in body) {
            if (key in userTweet) {
                userTweet[key] = body[key];
            }
        }

        return userTweet;
    }

    return;
}

const save = async function (tweet: TweetModel) {
    if (hasContent(tweet)) {
        TweetRepository = [tweet, ...TweetRepository];
    }
}

const deleteById = async function (tweetId: number) {
    for (let i: number = 0; i < TweetRepository.length; i++) {
        if (TweetRepository[i].id == tweetId) {
            TweetRepository.splice(i, 1);
            i--;
        }
    }
}

const tweetRepository = {
    getAll,
    getByUserName,
    getById,
    getTweetsIndexById,
    hasContent,
    update,
    save,
    deleteById
}

export default tweetRepository;
