import * as express from "express";
import tweetController from "../controller/tweetController";
import {body, param} from "express-validator";
import validate from "../middleware/validator";

const router = express.Router();

router.get('/', tweetController.getTweets);

router.get('/:id',
    [
        param('id').isInt().withMessage('숫자를 입력해주세요.'),
        validate
    ],
    tweetController.getTweet);

router.post('/', [
    body('text').notEmpty().withMessage('내용을 입력해주세요.'),
    body('name').trim().isString().isLength({min:2}).withMessage('이름을 확인해주세요.'),
    body('username').trim().isString().isLength({min:2}).withMessage('닉네임을 확인해주세요.'),
    body('url').optional().isURL().withMessage('이미지 주소를 확인해주세요.'),
    validate
], tweetController.createTweet);

router.put('/:id', [
    param('id').isInt().withMessage('숫자를 입력해주세요.'),
    body('name').optional().isString().withMessage('이름을 확인해주세요.'),
    body('username').optional().isString().withMessage('닉네임을 확인해주세요.'),
    body('url').optional().isURL().withMessage('이미지 주소를 확인해주세요.'),
    validate
], tweetController.updateTweet);

router.delete('/:id', [
    param('id').notEmpty().isInt().withMessage('숫자를 입력해주세요.'),
    validate
],tweetController.deleteTweet);

export default router;