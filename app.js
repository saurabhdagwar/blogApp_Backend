import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
const app = express();
app.use(express.json());
app.use("/api/user", router);
mongoose
  .connect(
    "mongodb+srv://saurabhdagwar2020:DC5yPk2MIDjan8k3@cluster0.ucnsvve.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("connected to the database and Listning to port 5000")
  )
  .catch((err) => console.log(err));
