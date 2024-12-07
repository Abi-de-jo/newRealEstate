import express from "express";
import { login, logout, createOwner ,userToOwner, checkOwner, getowner, getowners, createOwnerByAgent, deleteowner } from "../controllers/ownerCntrl.js";
// import jwtCheck from "../config/auth0Config.js";


const router = express.Router();

router.post("/register", createOwner);
router.post("/deleteOwner/:id", deleteowner);
router.post("/registerbyAgent", createOwnerByAgent);

router.post("/userToOwner", userToOwner);
router.post("/checkOwner", checkOwner);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allOwners", getowners);

router.post("/get", getowner);


export {router as ownerRoute}
