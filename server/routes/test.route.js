import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/should-be-logged-in",verifyToken, shouldBeLoggedIn);
router.post("/should-be-admin", shouldBeAdmin);



export {router as testRoute}
