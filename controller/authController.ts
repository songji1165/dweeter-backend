import {NextFunction, Request, Response} from "express";
import tweetRepository from "../data/TweetRepository";
import {Tweet, TweetContent} from "../model/Tweet";
import {Auth, AuthInfo, AuthModel} from "../model/Auth";
import authRepository from "../data/AuthRepository";
import JWT from "../middleware/jwt";


interface AuthRequest<T> extends Request {
    body: T
}

const jwt = require('jsonwebtoken');
const SECRET = 'zxcvasdfqwer1234';

const createAuth = async (req: AuthRequest<AuthModel>, res: Response, next: NextFunction) => {
    const {body} = req

   console.log("BODY",body);

    if (body) {
        const hasUser = await authRepository.getByUserInfo(body.username);
            console.log('HASUSER? ',hasUser);
        if (!hasUser) {
            const auth = new Auth(body);
            await authRepository.save(auth);
            return res.status(201).json({token: auth.password, username: auth.username});
        }
    }

    return res.status(400).json({
        status: 'error',
        error: '회원가입을 할 수 없습니다. 회원정보를 확인해주세요.',
    });
}

const login = async (req: AuthRequest<AuthInfo>, res: Response, next: NextFunction) => {
    const {body} = req;

    if (body) {
        const userInfo = await authRepository.getByUserInfo(body.username);
        const requestUserInfo = JWT.token({...body, isAdmin: userInfo.isAdmin});

        if (userInfo && (userInfo == requestUserInfo)) {
            const verify = JWT.verify(userInfo.password);

            if (verify) {
                res.status(200).json({token: userInfo.password, username: userInfo.username});
            }
        }
    }

    return res.status(400).json({
        status: 'error',
        error: '로그인 실패했습니다. 회원정보를 확인해주세요.'
    });
}

const me = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
        const me = await authRepository.getByToken(token);
        if (me) {
            return res.sendStatus(200);
        }
    }
    return res.status(404).json({message: `You are not Tweet User`});

}

const authController = {
    createAuth,
    login,
    me
}
export default authController;