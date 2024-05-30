import express from "express";
import { getAllUser, signup, loginUser } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", loginUser);
export default router;
