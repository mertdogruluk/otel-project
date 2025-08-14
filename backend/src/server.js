 import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import testRoute from "./tests/user.test.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/reservations", reservationRoutes);
//test 
app.use("/api", testRoute);

app.get("/", (req, res) => {
  res.send("API Çalışıyor ");
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
