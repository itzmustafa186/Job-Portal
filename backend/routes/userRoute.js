import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import userAuthentication from "../middleware/userAuthentication.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(userAuthentication, singleUpload, updateProfile);
router.route("/logout").post(logout);


export default router;