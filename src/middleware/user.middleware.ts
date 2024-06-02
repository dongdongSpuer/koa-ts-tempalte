// 密码加密,并验证格式
import { ErrorList } from "@/config/errorType";
import bcrypt from "bcryptjs";
import { Context, Next } from "koa";
import { z } from "zod";

const createUserSchema = z.object({
  username: z
    .string()
    .min(4, "用户名不能少于4个字符")
    .max(16, "用户名不能超过16个字符")
    .trim(),
  password: z
    .string()
    .min(5, "密码不能少于4个字符")
    .max(16, "密码不能超过16个字符")
    .trim(),
});

export const verifyCreateUser = async (ctx: Context, next: Next) => {
  let { username, password } = ctx.request.body;
  // 规则验证
  try {
    await createUserSchema.parseAsync({ username, password });
    // 加密
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body = {
      username,
      password: hash,
    };
    await next();
  } catch (error: any) {
    ctx.app.emit(
      "error",
      ErrorList.userParamsError.getErrorMsg(error.issues || error.message),
      ctx
    );
  }
};
