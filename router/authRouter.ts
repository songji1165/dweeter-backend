import * as express from "express";
import authController from "../controller/authController";
import {body,} from "express-validator";
import validate from "../middleware/validator";

const router = express.Router();

router.post('/signup', [
    body('username').trim().isString().isLength({min:2}).withMessage('닉네임을 확인해주세요.'),
    body('password').trim().isString().isLength({min:8}).withMessage('비밀번호를 확인해주세요.'),
    body('name').trim().isString().isLength({min:2}).withMessage('이름을 확인해주세요.'),
    body('email').isEmail().withMessage('이메일을 확인해주세요.'),
    body('url').isURL().withMessage('이미지 주소를 확인해주세요.').optional({nullable: true, checkFalsy: true}),
    validate
], authController.createAuth);
router.post('/login', [
    body('username').optional().isString().withMessage('닉네임을 확인해주세요.'),
    body('password').trim().isString().isLength({min:8}).withMessage('비밀번호를 확인해주세요.'),
    validate
], authController.login);

router.get('/me', authController.me);

export default router;