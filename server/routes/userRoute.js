import express from "express";
import { allBookings, likes, bookVisit, cancelBooking, createUser, allLikes, dislikes } from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";
 
const router = express.Router();
router.post("/bookVisit/:id", bookVisit);
router.post("/likes/:propertyId", likes);
 router.delete("/dislikes/:propertyId",dislikes)

router.post("/register",createUser );
router.post("/allBookings", allBookings);
router.post("/allLikes", allLikes);
router.post("/cancelBooking/:id", cancelBooking);




export {router as userRoute}