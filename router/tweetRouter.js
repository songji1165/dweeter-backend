"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var tweetController_1 = require("../controller/tweetController");
var express_validator_1 = require("express-validator");
var validator_1 = require("../middleware/validator");
var router = express.Router();
router.get('/', tweetController_1.default.getTweets);
router.get('/:id', [
    (0, express_validator_1.param)('id').isInt().withMessage('숫자를 입력해주세요.'),
    validator_1.default
], tweetController_1.default.getTweet);
router.post('/', [
    (0, express_validator_1.body)('text').notEmpty().withMessage('내용을 입력해주세요.'),
    (0, express_validator_1.body)('name').trim().isString().isLength({ min: 2 }).withMessage('이름을 확인해주세요.'),
    (0, express_validator_1.body)('username').trim().isString().isLength({ min: 2 }).withMessage('닉네임을 확인해주세요.'),
    (0, express_validator_1.body)('url').optional().isURL().withMessage('이미지 주소를 확인해주세요.'),
    validator_1.default
], tweetController_1.default.createTweet);
router.put('/:id', [
    (0, express_validator_1.param)('id').isInt().withMessage('숫자를 입력해주세요.'),
    (0, express_validator_1.body)('name').optional().isString().withMessage('이름을 확인해주세요.'),
    (0, express_validator_1.body)('username').optional().isString().withMessage('닉네임을 확인해주세요.'),
    (0, express_validator_1.body)('url').optional().isURL().withMessage('이미지 주소를 확인해주세요.'),
    validator_1.default
], tweetController_1.default.updateTweet);
router.delete('/:id', [
    (0, express_validator_1.param)('id').notEmpty().isInt().withMessage('숫자를 입력해주세요.'),
    validator_1.default
], tweetController_1.default.deleteTweet);
exports.default = router;
