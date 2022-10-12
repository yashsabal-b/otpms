import express from "express";
import config from "config";
import "./dbConnect.js";
import cors from "cors";

import rootRouter from "./controllers/index.js";

const app = express();
app.use(cors());
const port = process.env.PORT || config.get("PORT");

//DB Connection
app.use(express.json());
app.set("view engine", "pug");
app.use("/otpms", rootRouter);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
