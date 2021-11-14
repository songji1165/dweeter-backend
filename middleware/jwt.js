"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var SECRETKEY = 'zxcvasdfqwer1234';
var token = function (authInfo) {
    var username = authInfo.username, password = authInfo.password, isAdmin = authInfo.isAdmin;
    return jwt.sign({
        username: username,
        password: password,
        isAdmin: isAdmin
    }, SECRETKEY, { expiresIn: 2 });
};
var verify = function (token) {
    return jwt.verify(token, SECRETKEY, function (err, decoded) {
        console.log(err, decoded);
        return decoded;
    });
};
var JWT = {
    token: token,
    verify: verify
};
exports.default = JWT;
