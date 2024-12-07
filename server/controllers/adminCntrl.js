import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const createAdmin = asyncHandler(async (req, res) => {
    console.log("creating a admin");

    let { email, username, password } = req.body;
    try {
        const adminExists = await prisma.admin.findUnique({ where: { email: email } });
        // HASH THE PASSWORD

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);
        if (!adminExists) {
            const admin = await prisma.admin.create({ data: { email: email, username: username, password: hashedPassword } });

            res.send({
                message: "admin registered successfully",
                admin: admin,
            });
        } else res.status(201).send({ message: "admin already registered" });

    } catch (err) {
        console.log(err)
    }

});

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        //  CHECK USER EXISTS
        const admin = await prisma.admin.findUnique({
            where: { email: email },
        });
        if (!admin) return res.status(401).json({ message: "owner not found" });
        // CHECK PASSWORD CORRECT
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword)
            return res
                .status(401)
                .json({ message: "Failed to Login Invalid Password" });
        // GENERATE COOKIE
        // res.setHeader("Set-Cookie", "test=" + "myValue").json({message: "Success"});
        const age = 1000 * 60 * 24 * 7;

        const token = jwt.sign(
            {
                id: admin.id,
                isAdmin: false,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userpassword, ...adminInfo } = admin;

        res
            .cookie("token", token, {
                httpOnly: true,
                // sercure: true
                maxAge: age,
            })
            .status(200)
            .json({adminInfo, message: "Loged in succesfully"});
    } catch (err) {
        console.log(err.message, "hii");
        res.status(500).json({ message: "Failed to Login" });
    }
};
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
export const updateAdmin = async (req, res) => {
    const { newTeleNumber, email } = req.body;
    console.log(email)
    // const {id} = req.params; 
    // const tokenadminId = req.adminId;
    // const {password,avatar, ...inputs} = req.body;
    // if (id !== tokenadminId) {
    //     return res.status(403).json({ message: "You do not have permission to update this"})
    // }
    // let updatedPassword = null
    try {
        // if (password) {
        //     updatedPassword = await bcrypt.hash(password, 10);
        // }
        const updatedadmin = await prisma.admin.update({
            where: { email: email },
            data: {
                teleNumber: newTeleNumber || ""

            }
        });
        res.status(200).json(updateadmin)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get admins" })
    }
}

export const acceptResidencyByAdmin = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params; // Residency ID
    console.log(req.body);
  
    try {
      const residency = await prisma.residency.update({
        where: { id: id },
        data: {
          admin: { connect: { email: email } }, // Assign the agent
          status: "adminDraft", // Move to agent's draft status
        },
      });
      res.status(200).json({ message: "Residency assigned to admin", residency });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

export const changeAgent = asyncHandler(async (req, res) => {
    const { id } = req.params; // Residency ID
    const { email } = req.body; 
    console.log(req.body);
  
    try {
      const residency = await prisma.residency.update({
        where: { id: id },
        data: {
            agentEmail: email,
            status: "agentDraft"
        },
      });
      res.status(200).json({ message: "Residency updated successfully", residency });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  