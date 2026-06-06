import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import userAuthentication from "../middleware/userAuthentication.js";

 const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(userAuthentication,updateProfile);
router.route("/logout").post(logout);


export default router;