import {Tweet, TweetContent, TweetModel} from "../model/Tweet";
import {Auth, AuthModel} from "../model/Auth";
import jwt from "../middleware/jwt";

let AuthRepository: AuthModel[] = [];


const getByUserInfo = async function (username: string) {
    const userInfo = AuthRepository.filter((auth: AuthModel) => (auth["username"] == username));
    if(userInfo.length > 0){
        return userInfo[0];
    }
    return null;
}


const getByToken = async function (token: string) {
    const verify = jwt.verify(token);

    if(verify){
        return getByUserInfo(verify.username);
    }
    return null;
}

const save = async function (auth: AuthModel) {
    AuthRepository = [auth, ...AuthRepository];
}


const authRepository = {
    getByUserInfo,
    getByToken,
    save
}

export default authRepository;
