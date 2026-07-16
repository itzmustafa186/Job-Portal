import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import { uploadFiles } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(uploadFiles, register);
router.route("/login").post(login);
router.route("/profile/update").post(userAuthentication, uploadFiles, updateProfile);
router.route("/logout").post(logout);


export default router;