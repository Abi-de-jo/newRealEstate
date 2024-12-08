import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { agentRoute } from "./routes/agentRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { ownerRoute } from "./routes/ownerRoute.js";
import { testRoute } from "./routes/test.route.js";
import { adminRoute } from "./routes/adminRoute.js";
import axios from "axios";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/test", (req, res) => {
  console.log("Test ok");
  res.status(200).send("Test ok");
});

app.use("/api/admin", adminRoute);
app.use("/api/agent", agentRoute);
app.use("/api/owner", ownerRoute);
app.use("/api/test", testRoute);
app.use("/api/residency", residencyRoute);
app.use("/api/user", userRoute);

app.get("/api/nearby-places", async (req, res) => {
  const { lat, lng, type } = req.query;
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 9000,
          type,
          key: API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data from Google Places API:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Failed to fetch data from Google Places API" });
  }
});

export default app;
