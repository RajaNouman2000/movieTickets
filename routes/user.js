import express from "express";
import {
  getUser,
  createUser,
  getDetail,
  login,
  verifyEmail,
} from "../controller/user.js";

const userRouter = express.Router();
userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/verify/:token", verifyEmail);
userRouter.get("/getusers", getUser);
userRouter.post("/login", login);
userRouter.post("/getdetail", getDetail);
userRouter.post("/signup", createUser);

export default userRouter;
