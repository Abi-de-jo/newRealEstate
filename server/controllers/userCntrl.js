import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";





export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;
  let username = email.split('@')
  const userExists = await prisma.user.findUnique({ where: { email: email} });
  const ownerExists = await prisma.owner.findUnique({where: {email: email}});
  if (ownerExists) {
    res.status(200).json({ message: "Email already exists" }).send({message: "hii"});
  }
  if (!userExists) {
    const user = await prisma.user.create({ data: {email: email, username: username[0]} });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});




export const likes = asyncHandler(async (req, res) => {
  const { likedUserEmail } = req.body;
  const { propertyId } = req.params;
  console.log(propertyId, likedUserEmail, " Likeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");   

  try {
    // Find the user based on email
    const alreadyLiked = await prisma.user.findUnique({
      where: { email: likedUserEmail },
      select: { favoriteResidency: true },
      
    });

    console.log(alreadyLiked,"alreadyliked")

    // If user does not exist, return an error message
    if (!alreadyLiked) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("first if")

    // Check if the visit ID is already in the bookedVisits
    if (alreadyLiked.favoriteResidency.some((visit) => visit.propertyId === propertyId)) {
      return res.status(400).json({ message: "This liked is already liked" });
    }
    console.log("second if")


    // If not already booked, proceed with booking
    await prisma.user.update({
      where: { email:likedUserEmail },
      data: {
        favoriteResidency: { push: propertyId  },  // Push the new visit ID into the bookedVisits array
      },
    });
    console.log("prisma if")


    res.json("Your property is like successfully");
  } catch (err) {
    console.error("Like  error:", err.message);
    res.status(500).json({ message: "Failed to book the visit. Please try again later." });
  }
});

export const dislikes = asyncHandler(async (req, res) => {
  const { likedUserEmail } = req.body;
  const { propertyId } = req.params;

  console.log(propertyId, likedUserEmail, "Dislike Request Received");

  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: likedUserEmail },
      select: { favoriteResidency: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if propertyId exists in favoriteResidency
    if (!user.favoriteResidency.includes(propertyId)) {
      return res.status(400).json({ message: "This property is not liked." });
    }

    // Remove propertyId from favoriteResidency
    const updatedFavorites = user.favoriteResidency.filter((id) => id !== propertyId);

    // Update user with the new favorites
    await prisma.user.update({
      where: { email: likedUserEmail },
      data: { favoriteResidency: updatedFavorites },
    });

    console.log("Property removed from likes successfully.");
    res.json({ message: "Property has been removed from likes successfully" });
  } catch (error) {
    console.error("Dislike error:", error.message);
    res.status(500).json({ message: "Failed to remove like. Please try again later." });
  }
});





 


// server-side
export const bookVisit = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  console.log(email, id);  // Logging the email and property ID

  try {
    // Find the user based on email
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    // If user does not exist, return an error message
    if (!alreadyBooked) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the visit ID is already in the bookedVisits
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      return res.status(400).json({ message: "This residency is already booked" });
    }

    // If not already booked, proceed with booking
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: { push: { id } },  // Push the new visit ID into the bookedVisits array
      },
    });

    res.json("Your visit is booked successfully");
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: "Failed to book the visit. Please try again later." });
  }
});



export const allLikes = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const likes = await prisma.user.findUnique({
      where: { email: email },
      select: { favoriteResidency: true },
    });
    console.log(likes.favoriteResidency);
    res.status(200).json(likes.favoriteResidency);
  } catch (err) {
    throw new Error(err.message);
  }
});








export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    console.log(bookings.bookedVisits);
    res.status(200).json(bookings.bookedVisits);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    console.log(index);
    if (index === -1) {
      res.status(400).json({ message: "This residency is not booked by you" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancel successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});








export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedUser;
    if (user.favoriteResidency.includes(rid)) {
      // Remove the residency ID from favorites
      updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favoriteResidency: {
            set: user.favoriteResidency.filter((residencyId) => residencyId !== rid),
          },
        },
      });
      res.json({ message: "Removed from favorites", user: updatedUser });
    } else {
      // Add the residency ID to favorites
      updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favoriteResidency: {
            push: rid,
          },
        },
      });
      res.json({ message: "Added to favorites", user: updatedUser });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


 export const allfav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email, "eeeeeeeeeeeeeeeeeeeeeeeee");

  try {
    const favRes = await prisma.user.findUnique({
      where: { email: email ,favoriteResidency:true},
     });

    if (!favRes || !favRes.favoriteResidency) {
      return res.status(404).json({ message: "No favorite residency found" });
    }

    console.log(favRes, "jfffffffffffffffffffffffffffffffffffffffff");
    res.status(200).json(favRes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

