"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TweetRepository_1 = require("../data/TweetRepository");
var Tweet_1 = require("../model/Tweet");
var getTweets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resultSend, query, _username, userTweets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                if (!(query && query.username)) return [3 /*break*/, 2];
                _username = String(query.username);
                return [4 /*yield*/, TweetRepository_1.default.getByUserName(_username)];
            case 1:
                userTweets = _a.sent();
                resultSend = userTweets;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, TweetRepository_1.default.getAll()];
            case 3:
                resultSend = _a.sent();
                _a.label = 4;
            case 4:
                res.status(200).send(resultSend);
                return [2 /*return*/];
        }
    });
}); };
var getTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idTweet, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params.id;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, TweetRepository_1.default.getById(Number(req.params.id))];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                idTweet = _a;
                if (idTweet) {
                    res.status(200).json(idTweet);
                }
                else {
                    res.status(404).json({ message: "Tweet id(" + req.params.id + ") not found" });
                }
                return [2 /*return*/];
        }
    });
}); };
var createTweet = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, tweet, isTweetModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                if (!body) return [3 /*break*/, 3];
                tweet = new Tweet_1.Tweet(body);
                return [4 /*yield*/, TweetRepository_1.default.hasContent(tweet)];
            case 1:
                isTweetModel = _a.sent();
                if (!isTweetModel) {
                    res.status(400).json({
                        status: 'error',
                        error: '해당 트위터을 추가할 수 없습니다. 추가할 트위터의 내용을 확인해주세요.',
                    });
                }
                return [4 /*yield*/, TweetRepository_1.default.save(tweet)];
            case 2:
                _a.sent();
                res.status(201).json(tweet);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateTweet = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var params, body, send, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.params, body = req.body;
                code = 200;
                if (!(params && params.id)) return [3 /*break*/, 2];
                return [4 /*yield*/, TweetRepository_1.default.update(params.id, body)];
            case 1:
                send = _a.sent();
                res.status(code).send(send);
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var deleteTweet = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var params, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                params = req.params;
                _a = params.id;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, TweetRepository_1.default.deleteById(Number(params.id))];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                _a;
                res.sendStatus(204);
                return [2 /*return*/];
        }
    });
}); };
var tweetController = {
    getTweets: getTweets,
    getTweet: getTweet,
    createTweet: createTweet,
    updateTweet: updateTweet,
    deleteTweet: deleteTweet
};
exports.default = tweetController;
