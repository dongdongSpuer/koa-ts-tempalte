import Jwt from "jsonwebtoken";
import getConfig from "@/config/config.default";

export const createToken = (user: any) => {
  const token = Jwt.sign(
    {
      id: user.id,
      userName: user.username,
    },
    getConfig.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export const verifyToken = (token: string) => {
  return Jwt.verify(token, getConfig.JWT_SECRET);
};
