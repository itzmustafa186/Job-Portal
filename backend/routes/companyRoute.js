import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import userAuthentication from "../middleware/userAuthentication.js";

const router = express.Router();

router.route("/register").post(userAuthentication, registerCompany);
router.route("/get").get(userAuthentication, getCompany);
router.route("/get/:id").get(userAuthentication, getCompanyById);
router.route("/update/:id").put(userAuthentication, updateCompany);

export default router;