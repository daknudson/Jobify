import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";


import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJobs,
  showStats,
} from "../controllers/jobsController.js";

router.route("/").post(createJob).get(getAllJobs);

router.route("/stats").get(authenticateUser, showStats);

router.route("/:id").delete(deleteJob).patch(updateJobs);

export default router;
