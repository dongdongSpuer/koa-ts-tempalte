import { DefaultContext } from "koa";
import Router from "koa-router";
import logger from "@/utils/logger";
import userController from "@/controller/user.controller";
import { verifyCreateUser } from "@/middleware/user.middleware";
import { verifyAuth } from "@/middleware/auth.middleware";
const userRouter = new Router({
  prefix: "/user",
});

userRouter.post("/", verifyCreateUser, userController.create);

userRouter.get("/", async (ctx) => {
  ctx.body = "user";
});

// 返回角色路由
userRouter.get("/role", async (ctx: DefaultContext) => {
  logger.info("userRoleRouter");
  ctx.body = {
    code: 0,
    data: {
      info: ctx.user,
      role: "admin",
      route: ["/user"],
    },
    msg: "获取角色成功",
  };
});
userRouter.get("/route", async (ctx: DefaultContext) => {
  logger.info("userRoleRouter");
  ctx.body = {
    code: 0,
    data: [
      {
        path: "/user",
        name: "User",
        redirect: "user/index",
        meta: {
          name: "用户管理",
          rank: 5,
        },
        children: [
          {
            path: "/user/index",
            name: "userIndex",
            meta: {
              name: "用户列表",
            },
          },
        ],
      },
    ],
    msg: "获取角色成功",
  };
});
// 错误路由demo
userRouter.post("/del", (ctx, next) => {
  ctx.throw(400, "错误");
});
export default userRouter;
