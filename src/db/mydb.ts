import { DataSource } from "typeorm";
import getConfig from "@/config/config.default";

const { db } = getConfig;
export const AppDataSource = new DataSource({
  type: db.type,
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.database,
  entities: [__dirname + "/../model/*.ts"],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("数据库初始化加载成功");
  })
  .catch((err) => {
    console.error("数据库初始化失败", err);
  });
