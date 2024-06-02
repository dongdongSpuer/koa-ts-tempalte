import { Context, Next } from "koa";

const handleError = async (err: ErrorType, ctx: Context) => {
  // console.log(err);
  ctx.status = err.statusCode || 500;
  ctx.body = {
    code: err.code,
    msg: err.msg,
    data: err.data,
  };
};

export default handleError;

// /**
//  * 顶层错误处理，并把错误信息格式化
//  * @param ctx
//  * @param next
//  */
// export const handleErrorMiddleware = async (ctx: Context, next: Next) => {
//   try {
//     await next();
//   } catch (err: any) {
//     ctx.app.emit("error", err, ctx);
//   }
// };

class ErrorModel {
  constructor(
    public code = -1,
    public msg = "未知服务器错误",
    public statusCode = 500
  ) {
    this.code = code; //data携带的内部异常状态码
    this.msg = msg; // 消息
    this.statusCode = statusCode; //外层的状态码
  }
  getErrorMsg(data: any = null) {
    return {
      code: this.code,
      msg: this.msg,
      statusCode: this.statusCode,
      data: data,
    };
  }
}

// 400参数错误
class ParameterError extends ErrorModel {
  constructor(code: number | undefined, msg = "请求错误") {
    super(code, msg, 400);
  }
}
// 401错误
class AuthError extends ErrorModel {
  constructor(code: number | undefined, msg = "token认证失败") {
    super(code, msg, 401);
  }
}
// 404
class NotFoundError extends ErrorModel {
  constructor(code: number | undefined, msg = "未找到该api") {
    super(code, msg, 404);
  }
}
// 500
class InternalServerError extends ErrorModel {
  constructor(code: number | undefined, msg = "服务器内部错误") {
    super(code, msg, 500);
  }
}

//
//成功请求
class SuccessModel extends ErrorModel {
  constructor(code = 0, msg = "请求成功") {
    super(0, msg, 200);
  }
  successData(msg: string = "请求成功", data: any) {
    return { code: this.code, msg: msg || this.msg, data: data };
  }
}

export {
  ParameterError,
  AuthError,
  NotFoundError,
  InternalServerError,
  SuccessModel,
};
