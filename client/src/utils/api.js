import axios from "axios";
import { toast } from "react-toastify";

import dayjs from "dayjs";

export const api = axios.create({
  baseURL: "https://new-real-estate-server.vercel.app/api",
});



export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allres", {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong gfhb");
    throw error;
  }
};
export const getAllOwners = async () => {
  try {
    const response = await api.get("/owner/getOwner", {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong Owners");
    throw error;
  }
};

export const getAllAgents = async () => {
  try {
    const response = await api.get("/agent/getAgent", {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong Owners");
    throw error;
  }
};



export const getallAgentsAchieve = async () => {
  const email = localStorage.getItem("email")

  try {
    const response = await api.post("/residency/allAgentsAchieve",{email}, {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
     return response.data;
  } catch (error) {
    toast.error("Something went wrong gfhb");
    throw error;
  }
};





export const genAchieve = async () => {
  const email = localStorage.getItem("email")

  try {
    const response = await api.post("/residency/allGeneralAchieve",{email}, {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong gfhb");
    throw error;
  }
};

export const getAllPropertiesForAdmin = async () => {
  try {
    const response = await api.get("/residency/allresForAdmin", {

      timeout: 10 * 10000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong gfhb");
    throw error;
  }
};


export const getAllDraft = async () => {
   try {
    const response = await api.get("/residency/drafts", {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong ");
    throw error;
  }
};


export const getAllPublished = async () => {
 const role = localStorage.getItem("role");

 if( role === "agent"){
  const email =  localStorage.getItem("email")

  try {
    const response = await api.post("/residency/publishedResidency", {email},{
      timeout: 10 * 10000,

    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
     return response.data;
  } catch (error) {
    toast.error("Something went wrong ");
    throw error;
  }
  
 }
 else {
  const email =  localStorage.getItem("newuser")
  try {
    const response = await api.post("/residency/publishedResidency", {email},{
      timeout: 10 * 10000,

    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
     return response.data;
  } catch (error) {
    toast.error("Something went wrong ");
    throw error;
  }

 }

 
  
  
};






export const getAllAchieve = async () => {
  const role = localStorage.getItem("role");
 
  if( role === "agent"){
   const email =  localStorage.getItem("email")
 
   try {
     const response = await api.post("/residency/allAgentsAchieve", {email},{
       timeout: 10 * 10000,
 
     });
     if (response.status === 400 || response.status === 500) {
       throw response.data;
     }
      return response.data;
   } catch (error) {
     toast.error("Something went wrong ");
     throw error;
   }
   
  }
  else {
   const email =  localStorage.getItem("newuser")
   try {
     const response = await api.post("/residency/allAgentsAchieve", {email},{
       timeout: 10 * 10000,
 
     });
     if (response.status === 400 || response.status === 500) {
       throw response.data;
     }
      return response.data;
   } catch (error) {
     toast.error("Something went wrong ");
     throw error;
   }
 
  }
 
  
   
   
 };











export const agentDraft = async () => {
  const role = localStorage.getItem("role");

  if (role === "agent") {
    const email = localStorage.getItem("email");

    try {
      const response = await api.post("/residency/agentdrafts", { email }, {
        timeout: 10 * 10000,
      });
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
       return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  } else {
    const email = localStorage.getItem("newuser");

    try {
      const response = await api.post("/residency/agentdrafts", { email }, {
        timeout: 10 * 10000,
      });
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
       return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  }
};
export const agentAchieve = async () => {
  const role = localStorage.getItem("role");

  if (role === "agent") {
    const email = localStorage.getItem("email");

    try {
      const response = await api.post("/residency/allAgentsAchieve", { email }, {
        timeout: 10 * 10000,
      });
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
       return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  } else {
    const email = localStorage.getItem("newuser");

    try {
      const response = await api.post("/residency/allAgentsAchieve", { email }, {
        timeout: 10 * 10000,
      });
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
       return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  }
};




export const ownerTrack = async () => {
  const role = localStorage.getItem("role");

  if (role === "owner") {
    const email = localStorage.getItem("email");

    try {
      const response = await api.post("/residency/ownertrack", { email }, {
        timeout: 10 * 10000,
      });
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
       return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  } else {
    const email = localStorage.getItem("newowner");

    try {
      const response = await api.post("/residency/ownertrack", { email }, {
        timeout: 10 * 10000,
      });
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
       return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  }
};


export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong ssh");
    throw error;
  }
};

export const createUser = async (email, token) => {
   try {
     await api.post(
    `/user/register`,
      { email },
      {
        headers: {
          Authorization:` Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    toast.error("Something wrong");
    throw err;
  }
};
const API_BASE_URL = "https://new-real-estate-server.vercel.app";

export const createAdmin = async (email, username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, {
      email,
      username,
      password,
    });
    console.log("Admin created successfully");
    return response.data;
  } catch (err) {
    console.error("Error during admin creation:", err.response?.data || err.message);
    throw err;
  }
};











export const createAgent = async (email, token) => {
  console.log("Agent Registering");
  try {
     await api.post(
     `/agent/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    toast.error("Something wrong");
    throw err;
  }
};


export const createOwner = async (email, token) => {
  console.log("Owner Registering");
  try {
     await api.post(
     `/owner/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    toast.error("Something wrong");
    throw err;
  }
};

// utils/api.js
export const toFav = async (id, email, token) => {
  try {

     await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization:` Bearer ${token}`,
        },
      }
    );
  } catch (e) {
     throw e;
  }
};



 


export const bookVisit = async (date, propertyId, email, token) => {
   try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const likes = async (propertyId,likedUserEmail) => {
  try {
    await api.post(
      `/user/likes/${propertyId}`,
      {
          propertyId,
          likedUserEmail
       },
     
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
     throw error;
  }
};

export const dislikes = async (propertyId, likedUserEmail) => {
  try {
    await api.delete(`/user/dislikes/${propertyId}`, {
      data: { likedUserEmail }, 
    });
    toast.success("Property removed from likes!");
  } catch (error) {
    toast.error("Something went wrong while removing the like. Please try again.");
    throw error;
  }
};


export const getAllLikes = async () => {
  const email = localStorage.getItem("email")

   try {
    const res = await api.post(
      `/user/allLikes`,
      {
        email,
      },
      
    );
     return res.data;

    
  } catch (error) {
    // toast.error("Something went wrong while fetching bookings");
    // throw error

    console.log(error)
  }
}


export const createResidency = async (data, token) => {
  
  const { user, ...others } = data;
  let email = others.email;
  if (!email) {
    email = localStorage.getItem("adminEmail");
    
  }
 
  try {
    const res = await api.post(
      '/residency/create',
      {
        others,
        email,
      },
      
      {
        headers: {
          Authorization:` Bearer ${token}`,
        },
      }
    );
    console.log(res)
  } catch (error) {
    throw error;
  }
};


export const getAllBookings = async () => {
  const email = localStorage.getItem("email")

   try {
    const res = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      
    );
     return res.data;

    
  } catch (error) {
    // toast.error("Something went wrong while fetching bookings");
    // throw error

    console.log(error)
  }
}




 