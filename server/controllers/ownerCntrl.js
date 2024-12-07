import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 
export const createOwner = asyncHandler(async (req, res) => {
  console.log("creating a Owner");

  let { email } = req.body;
  let username = email.split("@");

  const ownerExists = await prisma.owner.findUnique({
    where: { email: email },
  });
  if (!ownerExists) {
    const owner = await prisma.owner.create({
      data: { email: email, username: username[0] },
    });
    res.send({
      message: "Owner registered successfully",
      owner: owner,
    });
  } else res.status(201).send({ message: "Owner already registered" });
});


export const createOwnerByAgent = asyncHandler(async (req, res) => {
  console.log("creating a Owner");

  let { ownerEmail,ownerName,ownerNumber } = req.body;

  const ownerExists = await prisma.owner.findUnique({
    where: { email: ownerEmail  },
  });
  if (!ownerExists) {
    const owner = await prisma.owner.create({
      data: { email: ownerEmail,username: ownerName,teleNumber: ownerNumber.toString() },
    });
    res.send({
      message: "Owner registered successfully",
      owner: owner,
    });
  } else res.status(201).send({ message: "Owner already registered" });
});


export const userToOwner = asyncHandler(async (req, res) => {
  const { username, email, governmentId, teleNumber } = req.body;
  console.log(username, email, governmentId, teleNumber);
  // delete user
  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    await prisma.user.delete({
      where: { email: email },
    });
  }
  // create owner
  const ownerExists = await prisma.owner.findUnique({
    where: { email: email },
  });
  if (!ownerExists) {
    const owner = await prisma.owner.create({
      data: {
        email: email,
        username: username,
        governmentId: governmentId,
        teleNumber: teleNumber,
      },
    });
    res.json({
      message: "Owner registered successfully",
      owner: owner,
    });
  } else res.status(404).json({ message: "Owner already registered" });
});

export const login = async (req, res) => {
  const { email, password, Gov } = req.body;
  try {
    //  CHECK USER EXISTS
    const owner = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });
    if (!owner) return res.status(401).json({ message: "owner not found" });
    // CHECK PASSWORD CORRECT
    const isValidPassword = await bcrypt.compare(password, owner.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ message: "Failed to Login Invalid Password" });
    // GENERATE COOKIE
    // res.setHeader("Set-Cookie", "test=" + "myValue").json({message: "Success"});
    const age = 1000 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: owner.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userpassword, ...ownerInfo } = owner;

    res
      .cookie("token", token, {
        httpOnly: true,
        // sercure: true
        maxAge: age,
      })
      .status(200)
      .json(ownerInfo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to Login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const getowners = async (req, res) => {
  try {
    const owners = await prisma.owner.findMany();
    res.status(200).json(owners);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const getowner = async (req, res) => {
  const { id } = req.params;
  try {
    const owner = await prisma.owner.findUnique({
      where: { id: id },
    });
    res.status(200).json(owner);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const updateowner = async (req, res) => {
  const { id } = req.params;
  const tokenownerId = req.ownerId;
  const { password, avatar, ...inputs } = req.body;
  if (id !== tokenownerId) {
    return res
      .status(403)
      .json({ message: "You do not have permission to update this" });
  }
  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedowner = await prisma.owner.update({
      where: { id: id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: ownerPassword, ...rest } = updatedowner;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const deleteowner = async (req, res) => {
  const { id } = req.params;
  const tokenownerId = req.ownerId;
  if (id !== tokenownerId) {
    return res
      .status(403)
      .json({ message: "You do not have permission to update this" });
  }

  try {
    await prisma.owner.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "owner deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const checkOwner = async (req, res) => {
  const { email } = req.body;
  try {
    const owner = await prisma.owner.findUnique({
      where: { email },
    });

    if (owner) {
      res.status(200).json(owner); // Owner found, send a 200 status
    } else {
      res.status(404).json({ message: "" }); // Owner not found, send a 404 status
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" }); // Handle server error
  }
};

export const profilePosts = async (req, res) => {
  const tokenownerId = req.params.ownerId;
  try {
    const ownerPosts = await prisma.hotel.findMany({
      where: { ownerId: tokenownerId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { ownerId: tokenownerId },
      include: {
        hotel: true,
      },
    });
    const savedPosts = saved.map((item) => item.hotel);
    console.log(savedPosts);
    res.status(200).json({ ownerPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Profile Post" });
  }
};
