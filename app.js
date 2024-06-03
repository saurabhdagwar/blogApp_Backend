import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// If running locally, start the Express server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

// Export the app wrapped in serverless-http for AWS Lambda
export const handler = serverless(app);
