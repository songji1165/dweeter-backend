import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import tweetRouter from "./router/tweetRouter";

const app = express();

app.use(express.json());  // REST API json -> Body parsing
app.use(express.urlencoded({extended: false})); // HTML FORM SUBMIT Request => Body parsing
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.use('/tweets', tweetRouter);


app.listen(8080);
