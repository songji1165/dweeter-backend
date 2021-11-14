import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import tweetRouter from "./router/tweetRouter";
import router from "./router/tweetRouter";
import authRouter from "./router/authRouter";

const app = express();

app.use(express.json());  // REST API json -> Body parsing
app.use(express.urlencoded({extended: false})); // HTML FORM SUBMIT Request => Body parsing
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.use('/tweets', tweetRouter);
app.use('/auth', authRouter);

// 공통 에러 핸들러
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(8080);
