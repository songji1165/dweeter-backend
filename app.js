"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
var tweetRouter_1 = require("./router/tweetRouter");
var authRouter_1 = require("./router/authRouter");
var app = express();
app.use(express.json()); // REST API json -> Body parsing
app.use(express.urlencoded({ extended: false })); // HTML FORM SUBMIT Request => Body parsing
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use('/tweets', tweetRouter_1.default);
app.use('/auth', authRouter_1.default);
// 공통 에러 핸들러
app.use(function (req, res, next) {
    res.sendStatus(404);
});
app.use(function (error, req, res, next) {
    console.error(error);
    res.sendStatus(500);
});
app.listen(8080);
