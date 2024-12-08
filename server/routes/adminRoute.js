import express from "express";
import { login, logout, createAdmin, updateAdmin, changeAgent, acceptResidencyByAdmin } from "../controllers/adminCntrl.js";
import { deleteAgent } from "../controllers/agentCntrl.js";
import { deleteOwner } from "../controllers/ownerCntrl.js";


const router = express.Router();


router.post("/update", updateAdmin);
router.post("/register", createAdmin);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forwardAgent/:id", changeAgent);
router.post("/acceptByAdmin/:id", acceptResidencyByAdmin);
router.delete("/delete/:id", deleteAgent);
router.delete("/deleteOwner/:id", deleteOwner);



export {router as adminRoute}
