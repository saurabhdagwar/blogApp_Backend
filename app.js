import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(process.env.MONGO_URL)
  //   .connect(
  //     "mongodb+srv://saurabhdagwar2020:DC5yPk2MIDjan8k3@cluster0.ucnsvve.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
  //   )
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`connected to the database and Listning to port ${PORT}`)
  )
  .catch((err) => console.log(err));
