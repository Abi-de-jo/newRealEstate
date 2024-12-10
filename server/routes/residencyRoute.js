import express from "express";
import { acceptResidency, createResidency, getAllagentDrafts, getAllPublishedResidency, getAllDraftResidencies, getAllResidency, getResidency, ownerTrack, updateResidency,publishResidency, agentsAchieve, agentsAchievedResidency, Achieve, AchievedResidency, deleteResidency, rentByAgent, updateResidency, getAllResidencyForAdmin, updateResidencyDiscount } from "../controllers/residencyCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/generalAchieve/:id", Achieve);
router.post("/create", createResidency);
router.post("/agentdrafts", getAllagentDrafts);
router.post("/agentsAchieve/:id", agentsAchieve);
router.post("/allAgentsAchieve", agentsAchievedResidency);
router.post("/allGeneralAchieve", AchievedResidency);
router.post("/ownertrack", ownerTrack);

router.post("/publishedResidency", getAllPublishedResidency);
router.get("/drafts", getAllDraftResidencies);
router.put("/accept/:id", acceptResidency);
router.put("/update/:id", updateResidency);
router.put("/updateDiscount/:id", updateResidencyDiscount);

router.get("/allres", getAllResidency);
router.get("/allresForAdmin", getAllResidencyForAdmin);
router.get("/:id", getResidency);
router.put("/publish/:id", publishResidency);


router.delete("/delete/:id", deleteResidency);
router.post("/rentByAgent", rentByAgent);
router.post("/update/:id", updateDate);



export {router as residencyRoute}
