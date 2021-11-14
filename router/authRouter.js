"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authController_1 = require("../controller/authController");
var express_validator_1 = require("express-validator");
var validator_1 = require("../middleware/validator");
var router = express.Router();
router.post('/signup', [
    (0, express_validator_1.body)('username').trim().isString().isLength({ min: 2 }).withMessage('닉네임을 확인해주세요.'),
    (0, express_validator_1.body)('password').trim().isString().isLength({ min: 8 }).withMessage('비밀번호를 확인해주세요.'),
    (0, express_validator_1.body)('name').trim().isString().isLength({ min: 2 }).withMessage('이름을 확인해주세요.'),
    (0, express_validator_1.body)('email').isEmail().withMessage('이메일을 확인해주세요.'),
    (0, express_validator_1.body)('url').optional().isURL().withMessage('이미지 주소를 확인해주세요.'),
    validator_1.default
], authController_1.default.createAuth);
router.post('/login', [
    (0, express_validator_1.body)('username').optional().isString().withMessage('닉네임을 확인해주세요.'),
    (0, express_validator_1.body)('password').trim().isString().isLength({ min: 8 }).withMessage('비밀번호를 확인해주세요.'),
    validator_1.default
], authController_1.default.login);
router.get('/me', authController_1.default.me);
exports.default = router;
