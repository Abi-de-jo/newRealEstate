import express from "express";
import { login, logout, createAdmin, updateAdmin, changeAgent, acceptResidencyByAdmin } from "../controllers/adminCntrl.js";


const router = express.Router();


router.post("/update", updateAdmin);
router.post("/register", createAdmin);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forwardAgent/:id", changeAgent);
router.post("/acceptByAdmin/:id", acceptResidencyByAdmin);


export {router as adminRoute}
