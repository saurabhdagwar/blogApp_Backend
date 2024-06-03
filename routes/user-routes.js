// import express from "express";
// import { getAllUser, signup, loginUser } from "../controllers/user-controller";
const express = require("express");
const {
  getAllUser,
  signup,
  loginUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", loginUser);
module.exports = router;
