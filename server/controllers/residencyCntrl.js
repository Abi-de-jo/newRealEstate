import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    address,
    metro,
    district,
    price,
    discount,
    commission,
    propertyType,
    residencyType,
    rooms,
    area,
    type,
    parking,
    bathrooms,
    balcony,
    amenities,
    description,
    ownerEmail,
    video,
    images, // Make sure this is an array
  } = req.body.others;

  const email = req.body.email;

  // Log the incoming request to verify structure
  console.log("Request body:", req.body);
  console.log(" email:", email);

  // Ensure email is defined
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // Ensure images is an array
  const imageArray = Array.isArray(images) ? images : [];


  const adminacc = await prisma.admin.findUnique({
    where: { email: email },
  });

  if (adminacc) {
    try {
      const residency = await prisma.residency.create({
        data: {
          title,
          address,
          metro,
          district,
          price,
          discount,
          commission,
          rooms,
          bathrooms,
          area,
          type,
          parking,
          propertyType,
          residencyType,
          balcony,
          amenities,
          description,
          video,

          status: "published",
          images: imageArray, // Set images directly to the array
          agentEmail: email,
          adminEmail: email,
          ownerEmail: ownerEmail

        },
      });
      return res.json({ message: "Residency created successfully", residency });
    } catch (err) {
      console.error(err);
      if (err.code === "P2002") {
        return res.status(400).json({ message: "A Residency with this address already exists" });
      }
      return res.status(500).json({ message: err.message });
    }
  }



  const agentacc = await prisma.agent.findUnique({
    where: { email: email },
  });

  if (agentacc) {
    try {
      const residency = await prisma.residency.create({
        data: {
          title,
          address,
          metro,
          district,
          price,
          discount,
          commission,
          rooms,
          bathrooms,
          area,
          type,
          parking,
          video,

          propertyType,
          residencyType,
          balcony,
          amenities,
          description,
          status: "published",
          images: imageArray, // Set images directly to the array
          agentEmail: email,
          ownerEmail: ownerEmail

        },
      });
      return res.json({ message: "Residency created successfully", residency });
    } catch (err) {
      console.error(err);
      if (err.code === "P2002") {
        return res.status(400).json({ message: "A Residency with this address already exists" });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  const owneracc = await prisma.owner.findUnique({
    where: { email: email },
  });

  if (owneracc) {
    try {
      const residency = await prisma.residency.create({
        data: {
          title,
          address,
          metro,
          district,
          price,
          discount,
          commission,
          bathrooms,
          propertyType,
          residencyType,
          rooms,
          area,
          type,
          video,

          parking,
          balcony,
          amenities,
          description,
          ownerEmail: email,
          status: "draft",
          images: imageArray, // Set images directly to the array
        },
      });
      return res.json({ message: "Residency created successfully", residency });
    } catch (err) {
      console.error(err);
      if (err.code === "P2002") {
        return res.status(400).json({ message: "A Residency with this address already exists" });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(404).json({ message: "No matching agent or owner found." });
});








export const ownerTrack = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const tracks = await prisma.residency.findMany({
      where: { ownerEmail: email },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(tracks);
  } catch (err) {
    throw new Error(err.message);
  }

})

export const getAllResidency = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({

      where: { status: "published" },

      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(residencies);
  } catch (err) {
    throw new Error(err.message);
  }
});
export const getAllResidencyForAdmin = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      where: {
        status:

        {
          in:
            ["published", "agentsAchieve", "draft", "ownersAchieve", "agentDraft"],
        }


      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(residencies);
  } catch (err) {
    throw new Error(err.message);
  }
});



export const getAllDraftResidencies = asyncHandler(async (req, res) => {
  try {
    const draft = await prisma.residency.findMany({
      where: { status: "draft" },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(draft);
  } catch (err) {
    throw new Error(err.message);
  }
});









export const getResidency = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const residency = await prisma.residency.findUnique({
      where: {
        id: id,
      },
    });
    res.json(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const acceptResidency = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params; // Residency ID
  console.log(req.body);

  try {
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        agent: { connect: { email: email } }, // Assign the agent
        status: "agentDraft", // Move to agent's draft status
      },
    });
    res.status(200).json({ message: "Residency assigned to agent", residency });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getAllagentDrafts = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body, "Podaaa")
  try {
    const draft = await prisma.residency.findMany({
      where: { status: "agentDraft", agentEmail: email },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(draft);
  } catch (err) {
    throw new Error(err.message);
  }
})



export const publishResidency = asyncHandler(async (req, res) => {
  const { id } = req.params; // Residency ID

  try {
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        status: "published", // Change status to published
      },
    });
    res
      .status(200)
      .json({ message: "Residency published successfully", residency });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export const updateResidency = asyncHandler(async (req, res) => {
  const { id } = req.params; // Residency ID
  const data = req.body; // Property data from frontend
  console.log(req.body);

  try {
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        title: data.title,
        price: parseFloat(data.price),
         description: data.description,
        address: data.address,
        district: data.district,
        type: data.type,
        metro: data.metro,
        images: data.images,  
      },
    });
    res.status(200).json({ message: "Residency updated successfully", residency });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 






export const updateResidencyDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params; // Residency ID
  const data = req.body; 
   
  try {
   
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        
        discount: parseFloat(data.discount),
        
      },
    });

    res.status(200).json({ message: "Residency Discount successfully", residency });
  } catch (err) {
    console.error("Error updating residency:", err);
    res.status(500).json({ message: err.message });
  }
});
export const updateResidencyDiscountAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params; // Residency ID
  const data = req.body; 
   
  try {
   
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        
        discount: parseFloat(data.discount),
        
      },
    });

    res.status(200).json({ message: "Residency Discount successfully", residency });
  } catch (err) {
    console.error("Error updating residency:", err);
    res.status(500).json({ message: err.message });
  }
});







export const getAllPublishedResidency = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const publishedResidency = await prisma.residency.findMany({
      where: { status: "published", agentEmail: email },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(publishResidency, "ppppp")
    res.json(publishedResidency);
  } catch (err) {
    throw new Error(err.message);
  }
});


export const agentsAchieve = asyncHandler(async (req, res) => {
  const { id } = req.params; // Residency ID

  try {
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        status: "agentsAchieve", // Change status to agentsAchieve
      },
    });
    res
      .status(200)
      .json({ message: "Residency agentsAchieved successfully", residency });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export const Achieve = asyncHandler(async (req, res) => {
  const { id } = req.params; // Residency ID

  try {
    const residency = await prisma.residency.update({
      where: { id: id },
      data: {
        status: "achieve", // Change status to agentsAchieve
      },
    });
    res
      .status(200)
      .json({ message: "Residency Achieved successfully", residency });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export const agentsAchievedResidency = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const agentsAchievedResidency = await prisma.residency.findMany({
      where: { status: "agentsAchieve", agentEmail: email },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(agentsAchievedResidency)
    res.json(agentsAchievedResidency);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const AchievedResidency = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const AchievedResidency = await prisma.residency.findMany({
      where: { status: "achieve", agentEmail: email },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(AchievedResidency)
    res.json(AchievedResidency);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const deleteResidency = async (req, res) => {

  const { id } = req.params;

  try {
    await prisma.residency.delete({
      where: { id: id }
    })
    res.status(200).json({ message: "residency deleted successfully" })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get residency" })
  }
}

export const rentByAgent = async (req, res) => {
  const { } = req.body;
  const { id } = req.params;
  try {
    const customer = await prisma.customer.create({
      data: {

      }
    });
    return res.json({ message: "Residency created successfully", customer });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}