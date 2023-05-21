import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { error } from 'console';
import { runInNewContext } from 'vm';

/* DO NOT REMOVE */
/* Configure Environment Variables */
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}

// const authRouter = require('./routes/auth');
// const mainRouter = require('./routes/main');
import authRouter from './routes/auth.js';
import mainRouter from './routes/main.js';
import joinRouter from './routes/join.js';

const app = express();
const port = process.env.EXPRESS_PORT;
const clientPort = process.env.REACT_PORT;

const whitelist = [`http://localhost:${clientPort}`];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('[REQUEST-CORS] Request from origin: ', origin);
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not Allowed by CORS'));
  },
  credentials: true,
};

if (process.env.ENVIRONMENT === 'development'){
	app.use(morgan('dev'));
} else {
	app.use(morgan('[:remote-addr - :remote-user] [:date[web]] :method :url HTTP/:http-version :status :response-time ms'));
}
app.use(express.json());
app.use(express.urlencoded({extended: false})); // 중첩된 객체 받지 않음
app.use(cors(corsOptions));



app.use('/auth', authRouter);
app.use('/join', joinRouter)
app.use('/', mainRouter);

app.use((req, res, next) => { // 404
	const error = new Error('[Server] 존재하지 않는 주소입니다.');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => { // 에러 처리
	res.status(err.status || 500);
	const error = process.env.ENVIRONMENT === 'development' ? err : {};
	res.json(error);
})

app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});

