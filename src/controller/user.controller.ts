import logger from "src/utils/logger";
import { Context } from "koa";
import userService from "@/service/user.service";
import { ErrorList } from "@/config/errorType";

class UserController {
  async create(ctx: Context) {
    logger.info("create user");
    const { username, password } = ctx.request.body;
    try {
      const res = await userService.createUser({
        userName: username,
        password,
      });
      ctx.status = 200; // Set HTTP status code
      ctx.body = {
        code: 0,
        data: {
          id: res.id,
          userName: res.userName,
        },
        msg: "创建成功",
      };
    } catch (error: any) {
      logger.error(error);
      ctx.app.emit("error", ErrorList.userAlreadyExit.getErrorMsg(""), ctx);
    }
  }
}

export default new UserController();
