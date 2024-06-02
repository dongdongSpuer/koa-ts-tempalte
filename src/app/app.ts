import path from "node:path";

import Koa from "koa";
import body from "koa-body";
import koaStatic from "koa-static";
import koaCors from "koa2-cors";
import "reflect-metadata";

import "../db/mydb";
import registerRouters from "../router/index";
// import handleError, { handleErrorMiddleware } from "../utils/handleError";
import handleError from "../utils/handleError";

// 创建koaAPP实例
const app: Koa = new Koa();

// app.use(handleErrorMiddleware);
// 部署静态资源
app.use(koaStatic(path.resolve(__dirname, "../../public")));

const white = [
  "http://localhost:8080",
  "http://localhost:9000",
  "http://127.0.0.1:5500",
  "http://localhost:5173",
];

// 配置跨域
app.use(
  koaCors({
    // origin: (ctx) => {
    //   if (white.includes(ctx.request.header.origin!)) {
    //     return ctx.request.header.origin!;
    //   } else {
    //     return false;
    //   }
    // },
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 配置bodyParser
app.use(
  body({
    multipart: true,
  })
);
// 注册路由
registerRouters(app);

// 统一错误处理

app.on("error", async (err: ErrorType, ctx) => {
  await handleError(err, ctx);
});

export default app;
