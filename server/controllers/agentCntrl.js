import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createAgent = asyncHandler(async (req, res) => {
  console.log("creating a agent");

  let { email} = req.body;
  let username = email.split('@')
   const agentExists = await prisma.agent.findUnique({ where: { email: email} });
  if (!agentExists) {
    const agent = await prisma.agent.create({ data: {email: email, username: username[0]}});
    res.send({
      message: "agent registered successfully",
      agent: agent,
    });
  } else res.status(201).send({ message: "Agent already registered" });
});
  
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //  CHECK USER EXISTS
    const agent = await prisma.agent.findUnique({
      where: { email: email },
    });
    if (!agent) return res.status(401).json({ message: "owner not found" });
    // CHECK PASSWORD CORRECT
    const isValidPassword = await bcrypt.compare(password, agent.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ message: "Failed to Login Invalid Password" });
    // GENERATE COOKIE
    // res.setHeader("Set-Cookie", "test=" + "myValue").json({message: "Success"});
    const age = 1000 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: agent.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userpassword, ...agentInfo } = agent;

    res
      .cookie("token", token, {
        httpOnly: true,
        // sercure: true
        maxAge: age,
      })
      .status(200)
      .json(agentInfo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to Login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
export const getAgents = async (req, res) => {
    try {
        const agents = await prisma.agent.findMany();
        res.status(200).json(agents)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to get Users"})
    }
}
export const getAgent = async (req, res) => {
    const {email} = req.body; 
  console.log(email)

    try {
        const agent = await prisma.agent.findUnique({
            where: {email: email}
        });
        console.log(agent)
        res.status(200).json(agent);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to get Users"})
    }
}
export const updateAgent = async (req, res) => {
    const { newTeleNumber, email } = req.body;
    console.log(email)
    // const {id} = req.params; 
    // const tokenAgentId = req.agentId;
    // const {password,avatar, ...inputs} = req.body;
    // if (id !== tokenAgentId) {
    //     return res.status(403).json({ message: "You do not have permission to update this"})
    // }
    // let updatedPassword = null
    try {
        // if (password) {
        //     updatedPassword = await bcrypt.hash(password, 10);
        // }
        const updatedAgent = await prisma.agent.update({
            where: {email: email},
            data: {
               teleNumber : newTeleNumber || ""

            }
        });
        res.status(200).json(updateAgent)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to get Agents"})
    }
}
// export const deleteAgent = async (req, res) => {

//     const {id} = req.params; 
//     const tokenAgentId = req.agentId;
//     if (id !== tokenAgentId) {
//         return res.status(403).json({ message: "You do not have permission to update this"})
//     }


//     try {
//         await prisma.agent.delete({
//             where: {id: id}
//         })
//         res.status(200).json({message: "Agent deleted successfully"})
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({message: "Failed to get Users"})
//     }
// }















export const deleteAgent = async (req, res) => {

  const { id } = req.params;

  try {
    await prisma.agent.delete({
      where: { id: id }
    })
    res.status(200).json({ message: "Agent deleted successfully" })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Agent" })
  }
}


export const profilePosts = async (req, res) => {
    const tokenAgentId = req.params.agentId; 
    try {
        const agentPosts = await prisma.hotel.findMany({
            where: {agentId: tokenAgentId},
        });
        const saved = await prisma.savedPost.findMany({
            where: {agentId: tokenAgentId},
            include: {
                hotel: true
            }
        });
        const savedPosts = saved.map(item => item.hotel)
        console.log(savedPosts)
        res.status(200).json({agentPosts, savedPosts})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to get Profile Post"})
    }
}

export const getAllAgents = asyncHandler(async (req, res) => {
  try {
    const { email } = req.query; // Retrieve email from query parameters if provided

    const owners = await prisma.agent.findMany({
      where: email ? { email } : {}, // Filter by email if provided, otherwise return all
    });

    res.json(owners); // Return the retrieved owners
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors properly
  }
});

export const updateagent = async (req, res) => {
  const { email, image, teleNumber } = req.body; // Extract fields from the request body

  if (!email) {
    return res.status(400).json({ message: "Email is required" }); // Validate email presence
  }

  try {
    // Update only the allowed fields
    const updatedAgent = await prisma.agent.update({
      where: { email }, // Update based on email
      data: {
        ...(image && { image }), // Update image if provided
        ...(teleNumber && { teleNumber }), // Update phone number if provided
      },
    });

    res.status(200).json({ message: "Agent updated successfully", updatedAgent });
  } catch (err) {
    console.error("Error updating agent:", err);
    res.status(500).json({ message: "Failed to update agent details" });
  }
};
