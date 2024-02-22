import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import postsRouter from "./router/posts";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/posts", postsRouter);

// 지원하지 않는 API요청
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

// error은 타입이 없기때문에 any로 타입 정의
app.use((error: any, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080, () => {
  console.log("Started!");
});
