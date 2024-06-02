import { Next, Context } from "koa";
import z from "zod";
import { verifyToken } from "@/utils/token";
import { ErrorList } from "@/config/errorType";
import logger from "@/utils/logger";

const loginSchema = z.object({
  username: z.string().min(4).max(16).trim(),
  password: z.string().min(6).max(16).trim(),
});

export const validLoginInfo = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body;
  console.log(username, password);
  try {
    await loginSchema.parseAsync({ username, password });
    await next();
  } catch (error: any) {
    ctx.app.emit(
      "error",
      ErrorList.userParamsError.getErrorMsg(error.issues || error.message),
      ctx
    );
  }
};

/**
 * @description token 校验
 * @param ctx
 * @param next
 */
export const verifyAuth = async (ctx: Context, next: Next) => {
  // 获取token
  try {
    const token = ctx.request.headers.authorization?.split(" ")[1];
    if (!token) {
      return ctx.app.emit(
        "error",
        ErrorList.tokenIsNotExit.getErrorMsg("token为空"),
        ctx
      );
    }
    const info = verifyToken(token);
    ctx.state.user = info;
    await next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return ctx.app.emit(
        "error",
        ErrorList.authExpired.getErrorMsg("token过期"),
        ctx
      );
    } else if (error.name === "JsonWebTokenError") {
      return ctx.app.emit(
        "error",
        ErrorList.authError.getErrorMsg("token认证失败"),
        ctx
      );
    } else {
      logger.error("auth middleware", error);
      // return ctx.app.emit(
      //   "error",
      //   ErrorList.authError.getErrorMsg("权限部分未知错误"),
      //   ctx
      // );
    }
  }
};
