import {AuthInfo} from "../model/Auth";

const jwt = require('jsonwebtoken');

const SECRETKEY = 'zxcvasdfqwer1234';

const token = function (authInfo: AuthInfo) {
    const {username, password, isAdmin} = authInfo;
    return jwt.sign({
            username,
            password,
            isAdmin
        },
        SECRETKEY,
        {expiresIn: 2});
}

const verify = function (token: string){
    return jwt.verify(token, SECRETKEY, (err, decoded) => {
        console.log(err, decoded);
        return decoded;
    });
}

const JWT = {
    token,
    verify
}
export default JWT;