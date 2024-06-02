import { AppDataSource } from "@/db/mydb";
import { User } from "@/model/User";
interface IUserInfo {
  userName: string;
  password: string;
}

class UserService {
  async createUser(userInfo: IUserInfo) {
    const user = await User.findOneBy({ userName: userInfo.userName });
    if (!user) {
      const user = new User();
      user.userName = userInfo.userName;
      user.password = userInfo.password;
      return await AppDataSource.manager.save(user);
    } else {
      throw new Error("用户已存在");
    }
  }
}

export default new UserService();
