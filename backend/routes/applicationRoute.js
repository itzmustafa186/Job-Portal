import express from "express";

import userAuthentication from "../middleware/userAuthentication.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";

const router = express.Router();

router.route("/apply/:id").get(userAuthentication, applyJob);
router.route("/get").get(userAuthentication, getAppliedJobs);
router.route("/:id/applicants").get(userAuthentication, getApplicants);
router.route("/status/:id/update").post(userAuthentication, updateStatus);

export default router;