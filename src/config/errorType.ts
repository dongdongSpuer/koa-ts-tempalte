import {
  ParameterError,
  AuthError,
  NotFoundError,
  InternalServerError,
  SuccessModel,
} from "@/utils/handleError";

const ErrorList = {
  unknownError: new InternalServerError(10000, "未知错误"),
  userParamsError: new ParameterError(10001, "请求参数错误"),
  tokenIsNotExit: new AuthError(10002, "token不存在"),
  userAlreadyExit: new SuccessModel(10003, "用户已存在"),

  // 权限部分
  authNoPermission: new AuthError(20001, "没有权限"),
  authError: new AuthError(20002, "token认证失败"),
  authExpired: new AuthError(20003, "token过期"),

  // 文件上传部分
  uploadError: new ParameterError(30004, "上传失败"),
};

const SuccessList = new SuccessModel(0, "请求成功");

export { ErrorList, SuccessList };
