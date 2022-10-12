import mongoose from "mongoose";

//This is Main User Schema
const userSchema = new mongoose.Schema({
  usertype: {
    type: String,
    default: "user", //This assigns default value user
  },
  plantype: {
    type: String,
    default: "free",
  },
  firstname: {
    type: String,
    maxlength: 25,
    minlength: 2,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 25,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: 500,
  },
  userverified: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
  },
  userverifytoken: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  passwordresettoken: {
    type: String,
    default: null,
  },
  wallet: {
    type: Number,
    required: true,
    default: 200,
  },
  totalCredits: {
    type: Number,
    required: true,
  },
  credits: {
    email: {
      type: Number,
      required: true,
      default: 150,
    },
    sms: {
      type: Number,
      required: true,
      default: 50,
    },
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  count: {
    email: {
      type: Number,
      required: true,
    },
    sms: {
      type: Number,
      required: true,
    },
  },
  otpVerify: {
    otp: {
      type: Number,
      default: null,
    },
    createdAt: {
      type: Date,
      default: null,
    },
  },
  lastLogin: {
    type: Date,
  },
});

export default mongoose.model("Users", userSchema, "users");
