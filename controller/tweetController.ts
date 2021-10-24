import {NextFunction, Request, Response} from "express";
import tweetRepository from "../data/TweetRepository";
import {Tweet, TweetContent} from "../model/Tweet";

interface TweetsRequest<T> extends Request {
    body: T
}

const getTweets = async (req:Request, res:Response) => {
    let resultSend: any;

    const {query} = req;

    if (query && query.username) {
        const _username = String(query.username);
        const userTweets = await tweetRepository.getByUserName(_username);
        resultSend = userTweets;
    } else {
        resultSend = await tweetRepository.getAll();
    }

    res.status(200).send(resultSend);
}

const getTweet = async (req: Request, res: Response) => {
    const idTweet = req.params.id && await tweetRepository.getById(Number(req.params.id));

    if (idTweet) {
        res.status(200).json(idTweet);
    } else {
        res.status(404).json({message: `Tweet id(${req.params.id}) not found`});
    }
}

const createTweet = async (req: TweetsRequest<TweetContent>, res: Response, next: NextFunction) => {
    const {body} = req;

    if (body) {
        const tweet = new Tweet(body);

        const isTweetModel = await tweetRepository.hasContent(tweet);

        if (!isTweetModel) {
            res.status(400).json({
                status: 'error',
                error: '해당 트위터을 추가할 수 없습니다. 추가할 트위터의 내용을 확인해주세요.',
            });
        }

        await tweetRepository.save(tweet);
        res.status(201).json(tweet);
    }
}

const updateTweet = async (req: TweetsRequest<Partial<TweetContent>>, res: Response, next: NextFunction) => {
    const {params, body} = req;

    let send: any;
    let code = 200;
    if (params && params.id) {

        send = await tweetRepository.update(params.id, body);

        res.status(code).send(send);
    }
}

const deleteTweet = async (req: Request, res: Response, next: NextFunction) => {
    const {params} = req;

    params.id && await tweetRepository.deleteById(Number(params.id));

    res.sendStatus(204);
}

const tweetController = {
    getTweets,
    getTweet,
    createTweet,
    updateTweet,
    deleteTweet
}
export default tweetController;