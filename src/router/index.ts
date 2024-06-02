import * as fs from "fs";
import path from "path";
import koa from "koa";
function registerRouters(app: koa) {
  const files = fs.readdirSync(path.resolve(__dirname, "./modules"));
  files.forEach((item) => {
    const router = require(`./modules/${item}`);

    app.use(router.default.routes());
    app.use(router.default.allowedMethods());
  });
}

export default registerRouters;
