import express from "express";

import userAuthentication from "../middleware/userAuthentication.js";
import { getAdminJobs, getALlJobs, getJobById, postJob } from "../controllers/jobController.js";

const router = express.Router();

router.route("/post").post(userAuthentication, postJob);
router.route("/get").get(userAuthentication, getALlJobs);
router.route("/get/:id").get(userAuthentication, getJobById);
router.route("/getadminjob").get(userAuthentication, getAdminJobs);


export default router;