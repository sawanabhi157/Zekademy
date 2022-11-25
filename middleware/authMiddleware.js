import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();

var CheckUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Getting Token from header
      token = authorization.split(" ")[1];
      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Get User from Token
      req.user = await UserModel.findById(userID).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthrized User" });
    }
  }
  if (!token) {
    res.status(401).send({
      status: "Failed",
      message: "Unauthoorized User , No Token Found",
    });
  }
};

export default CheckUserAuth;
