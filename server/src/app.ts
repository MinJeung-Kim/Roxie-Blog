import express from "express";
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
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
