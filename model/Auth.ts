import token from "../middleware/jwt";
import JWT from "../middleware/jwt";

export type AuthInfo = {
    username: string;
    password: string;
    isAdmin?: boolean;
}
export type AuthModel = AuthInfo & {
    name: string;
    email: string; // jwt
    url?: string;
}

// export type AuthModel = {
// } & AuthContent;

export const Auth = function (auth: AuthModel) {

    // this.id = (function () {
    //     const returnId = Auth.prototype.length;
    //     Auth.prototype.push(returnId);
    //     return returnId;
    // })();

    this.username = auth.username;
    // this.password = auth.password;
    this.password = Auth.prototype.setToken({
        username: auth.username,
        password: auth.password,
        isAdmin: auth.isAdmin
    });
    this.name = auth.name;
    this.email = auth.email;
    this.url = auth.url;

    this.isAdmin = auth.isAdmin || false;
}

Auth.prototype.setToken = function (authInfo: AuthInfo) {
    return JWT.token(authInfo);
};

