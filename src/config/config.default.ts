// import dotenv from "dotenv";
// dotenv.config();

import devConfig from "./config.devlopment";
import portConfig from "./config.production";

const { NODE_ENV } = process.env;
console.log(NODE_ENV);

const logConfig = {
  LOG_LEVEL: "debug",
  logDeployment: {
    appenders: {
      console: { type: "console" },
      file: {
        type: "file",
        filename: "logs/app.log",
        //日志最大大小
        maxLogSize: 10485760,
        //   备份数量
        backups: 3,
        compress: true,
      },
    },
    categories: {
      default: { appenders: ["console", "file"], level: "info" },
    },
  },
};

const common = {
  db: {
    type: "mysql" as "mysql",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "dongzi_shop",
  },
  server: {
    host: "localhost",
    port: 9000,
    baseUrl: "http://localhost:9000",
  },
  secret: {
    JWT_SECRET: "dongzi",
  },
  logConfig,
};

function getConfig(NODE_ENV: "Production" | "Development" | "Testing") {
  if (true) {
    return { ...common, ...devConfig };
  }
}

export default getConfig(NODE_ENV as "Production" | "Development" | "Testing");
