"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
var tweetRouter_1 = require("./router/tweetRouter");
var app = express();
app.use(express.json()); // REST API json -> Body parsing
app.use(express.urlencoded({ extended: false })); // HTML FORM SUBMIT Request => Body parsing
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use('/tweets', tweetRouter_1.default);
app.listen(8080);
