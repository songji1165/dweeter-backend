import * as express from "express";
import TweetList from "../model/TweetList";
import {Tweet, TweetContent, TweetModel} from "../model/Tweet";
import tweetService from "../service/tweetService";
import {NextFunction, Request, Response} from "express";


interface TweetsRequest<T> extends Request {
    body: T
}

const router = express.Router();

router.get('/', (req, res) => {
    const tweetList: TweetModel[] = TweetList;
    let resultSend: any = tweetList;

    const {query} = req;
    if (query && query.username) {
        const _username = String(query.username);
        const userTweets = tweetService.getTweetsByUserName(_username);

        resultSend = userTweets ? userTweets : [];
    }

    res.status(200).send(resultSend);
});

router.get('/:id', (req: Request, res: Response) => {
    const idTweet = req.params.id && tweetService.getTweetsById(Number(req.params.id));

    if(idTweet){
        res.status(200).json(idTweet);
    }else{
        res.status(404).json({message: `Tweet id(${req.params.id}) not found`});
    }
});

router.post('/', (req: TweetsRequest<TweetContent>, res: Response, next: NextFunction) => {
    const {body} = req;

    if (body) {
        const tweet = new Tweet(body);

        const isTweetModel = tweetService.isTweetContents(tweet);

        if (!isTweetModel) {
            res.status(400).json({
                status: 'error',
                error: '해당 트위터을 추가할 수 없습니다. 추가할 트위터의 내용을 확인해주세요.',
            });
        }

        tweet.updateTweets(tweet);
        res.status(201).json(tweet);
    }
});

router.put('/:id', (req: TweetsRequest<Partial<TweetContent>>, res: Response, next: NextFunction) => {
    const {params, body} = req;

    let send: any;
    let code = 200;
    if (params && params.id) {
        const userTweet = tweetService.getTweetsById(Number(params.id));

        if (!userTweet || !body) {
            code = 404;
            send = '수정할 트위터를 확인해주세요.';
        } else {
            send = userTweet;

            for (let key in body) {
                if (key in userTweet) {
                    userTweet[key] = body[key];
                } else {
                    code = 400;
                    send = '수정할 내용을 확인해주세요.';
                }
            }
        }

        res.status(code).send(send);
    }
});

router.delete('/:id', (req: TweetsRequest<Partial<TweetContent>>, res: Response, next: NextFunction) => {
    const {params, body} = req;

    let send: any = '해당 트위터를 삭제하였습니다.';
    let code = 204;

    if (params && params.id) {
        const userTweetIdx = tweetService.getTweetsIndexById(Number(params.id));

        if (!userTweetIdx) {
            code = 400;
            send = '삭제할 트위터를 확인해주세요.';
        } else {
            for (let i: number = 0; i < TweetList.length; i++) {
                if (TweetList[i].id == userTweetIdx) {
                    TweetList.splice(i, 1);
                    i--;
                }
            }
        }
    }

    res.status(code).send(send);
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send(err);
});


export default router;