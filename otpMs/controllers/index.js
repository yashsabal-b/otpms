import express from "express";
import NodeCache from "node-cache";
import Users from "../models/Users.js";
import { errorMiddleware } from "../middlewares/validations/index.js";
import { authMiddleware, generateToken } from "../middlewares/auth/index.js";
import sendEmail from "../utils/sendMail.js";

const router = express.Router();
let val;
const myCache = new NodeCache();

router.post("/otp", authMiddleware, errorMiddleware, async (req, res) => {
  try {
    let { otp } = req.body;

    otp = parseInt(otp);
    console.log(otp);
    let userData = await Users.findOne({ email: req.payload.email });
    if (!userData) return res.status(401).json({ error: "Invalid Token" });
    let newPayload;
    if (userData.otpVerify.otp === otp) {
      newPayload = {
        email: userData.email,
        _id: userData._id,
      };
    } else {
      return res.status(401).json({ error: "Invalid Otp" });
    }

    let token = generateToken(newPayload);

    res.status(200).json({ success: "Logged In!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/resendotp",

  authMiddleware,
  errorMiddleware,
  async (req, res) => {
    try {
      //Destructuring Req.Body

      val = Math.floor(100000 + Math.random() * 900000);
      const userData = await Users.findOne({ email: req.payload.email });
      if (!userData)
        return res.status(401).json({ error: "Invalid Credentials" });
      let payload = {
        email: userData.email,
        _id: userData._id,
      };
      sendEmail({
        subject: "OTP verification for Login - Tasky Solutions M10",
        to: userData.email,
        html: val.toString(),
      });
      userData.otpVerify.otp = val;
      userData.otpVerify.createdAt = new Date();
      await userData.save();

      let token = generateToken(payload);
      res.status(200).json({ success: "OTP Sent!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
