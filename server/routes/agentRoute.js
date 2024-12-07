import express from "express";
import { login, logout, createAgent, updateAgent, getAgent, getAgents, deleteAgent } from "../controllers/agentCntrl.js";
// import jwtCheck from "../config/auth0Config.js";

const router = express.Router();


router.post("/update", updateAgent);
router.post("/register", createAgent);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allAgents", getAgents);
router.post("/deleteAgent/:id", deleteAgent);

router.post("/get", getAgent);





export {router as agentRoute}