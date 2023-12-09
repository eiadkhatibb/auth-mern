import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("server is ready");
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
