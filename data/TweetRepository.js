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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var TweetRepository = [];
var getAll = function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, TweetRepository];
        });
    });
};
var getByUserName = function (param) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, TweetRepository.filter(function (tweet) { return (tweet["username"] == param); })];
        });
    });
};
var getById = function (param) {
    return __awaiter(this, void 0, void 0, function () {
        var tweetList;
        return __generator(this, function (_a) {
            tweetList = TweetRepository;
            return [2 /*return*/, (tweetList.length > 0) && tweetList.find(function (tweet) { return (tweet["id"] == param); })];
        });
    });
};
var getTweetsIndexById = function (param) {
    return __awaiter(this, void 0, void 0, function () {
        var tweetList, _index;
        return __generator(this, function (_a) {
            tweetList = TweetRepository;
            if (tweetList.length > 0) {
                tweetList.forEach(function (tweet, index) {
                    if (tweet["id"] == param)
                        _index = index;
                });
            }
            return [2 /*return*/, _index];
        });
    });
};
var hasContent = function (tweet) {
    return __awaiter(this, void 0, void 0, function () {
        var isTweetModel, key;
        return __generator(this, function (_a) {
            isTweetModel = true;
            for (key in tweet) {
                if ((key == 'text' || key == 'username' || key == 'name') && isTweetModel) {
                    isTweetModel = tweet[key] ? true : false;
                }
            }
            return [2 /*return*/, isTweetModel];
        });
    });
};
var update = function (id, body) {
    return __awaiter(this, void 0, void 0, function () {
        var userTweet, key;
        return __generator(this, function (_a) {
            userTweet = getById(Number(id));
            if (userTweet) {
                for (key in body) {
                    if (key in userTweet) {
                        userTweet[key] = body[key];
                    }
                }
                return [2 /*return*/, userTweet];
            }
            return [2 /*return*/];
        });
    });
};
var save = function (tweet) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (hasContent(tweet)) {
                TweetRepository = __spreadArray([tweet], TweetRepository, true);
            }
            return [2 /*return*/];
        });
    });
};
var deleteById = function (tweetId) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            for (i = 0; i < TweetRepository.length; i++) {
                if (TweetRepository[i].id == tweetId) {
                    TweetRepository.splice(i, 1);
                    i--;
                }
            }
            return [2 /*return*/];
        });
    });
};
var tweetRepository = {
    getAll: getAll,
    getByUserName: getByUserName,
    getById: getById,
    getTweetsIndexById: getTweetsIndexById,
    hasContent: hasContent,
    update: update,
    save: save,
    deleteById: deleteById
};
exports.default = tweetRepository;
