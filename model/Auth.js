"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var jwt_1 = require("../middleware/jwt");
// export type AuthModel = {
// } & AuthContent;
var Auth = function (auth) {
    // this.id = (function () {
    //     const returnId = Auth.prototype.length;
    //     Auth.prototype.push(returnId);
    //     return returnId;
    // })();
    this.username = auth.username;
    // this.password = auth.password;
    this.password = exports.Auth.prototype.setToken({
        username: auth.username,
        password: auth.password,
        isAdmin: auth.isAdmin
    });
    this.name = auth.name;
    this.email = auth.email;
    this.url = auth.url;
    this.isAdmin = auth.isAdmin || false;
};
exports.Auth = Auth;
exports.Auth.prototype.setToken = function (authInfo) {
    return jwt_1.default.token(authInfo);
};
