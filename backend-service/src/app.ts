import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger.json";  
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.listen(process.env.PORT, () => {
  console.log("Application running on port:  " + process.env.PORT);
});
