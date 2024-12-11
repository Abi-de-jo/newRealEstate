// const { Telegraf, Markup } = require("telegraf");
// const mongoose = require("mongoose");

// // Telegram Bot Token
// const TOKEN = "7712916176:AAF15UqOplv1hTdJVxILWoUOEefEKjGJOso";
// const bot = new Telegraf(TOKEN);

// // MongoDB Connection URL
// const DATABASE_URL = "mongodb+srv://abisheikabisheik102:abi@realestate.obn2d.mongodb.net/estate?retryWrites=true&w=majority&appName=RealEstate";

// // Connect to MongoDB
// mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.error("Error connecting to MongoDB:", error.message));

// // Define districts
// const DISTRICTS = [
//   "Vera", "Mtatsminda", "Vake", "Sololaki", "Chugureti", "Saburtalo",
//   "Didube", "Gldani", "Avlabari", "Isani", "Samgori", "Dighomi",
//   "Varketili", "Ortachala", "Abanotubani", "Didi Dighomi",
//   "Dighomi Massive", "Lisi Lake", "Vashlijvari", "Afrika",
//   "Vasizubani", "Kukia", "Elia", "Okrokana", "Avchala",
//   "Temqa", "Tskhneti", "Bagebi", "Nutsubidze Plato",
//   "Vake-Saburtalo", "Vezisi", "Tkhinvali", "Kus Tba (Turtle Lake)",
//   "Lisi", "Mukhatgverdi", "Mukhattskaro", "Nutsubidze Plateau",
//   "Lisi Adjacent Area", "Digomi 1-9", "Sof. Digomi (Village Digomi)",
//   "Dighmis Chala", "Koshigora", "Didgori", "Old Tbilisi",
//   "Krtsanisi", "Tsavkisi Valley", "Didube-Chughureti",
//   "Dighmis Massive (Dighmis Masivi)", "Iveri Settlement (Ivertubani)",
//   "Svaneti Quarter (Svanetis Ubani)", "Gldani-Nadzaladevi"
// ];

// // Define the Property Schema
// const propertySchema = new mongoose.Schema({
//   title: String,
//   address: String,
//   price: Number,
//   bathrooms: Number,
//   rooms: Number,
//   area: Number,
//   type: String,
//   images: [String],
//   residencyType: String,
//   description: String,
//   status: String,
//   propertyType: String,
//   district: [String],
//   parking: Boolean,
// });

// // Create the Property Model
// const Property = mongoose.model("Residency", propertySchema);

// // Helper Function: Fetch Properties by Filters
// const fetchPropertiesByFilters = async (filters) => {
//   try {
//     const query = {};
//     if (filters.minPrice && filters.maxPrice) {
//       query.price = { $gte: filters.minPrice, $lte: filters.maxPrice };
//     }
//     if (filters.district) {
//       // ISSUE: The 'district' field is an array, so we should use $in operator
//       query.district = { $in: [filters.district] };
//     }
//     if (filters.rooms) {
//       query.rooms = filters.rooms;
//     }
//     if (filters.bathrooms) {
//       query.bathrooms = filters.bathrooms;
//     }
//     if (filters.parking !== undefined) {
//       query.parking = filters.parking;
//     }
//     console.log("Query:", JSON.stringify(query));
//     const properties = await Property.find(query);
//     console.log("Found properties:", properties.length);
//     return properties;
//   } catch (error) {
//     console.error("Error fetching properties by filters:", error.message);
//     return [];
//   }
// };


// // Helper Function: Format Property Data
// const formatProperty = (property) => {
//   return (
//     `🏠 *${property.title || "Untitled"}*\n` +
//     `📍 Location: ${property.address || "Not provided"}\n` +
//     `🏙️ District: ${property.district || "Not provided"}\n` +
//     `💰 Price: $${property.price || "N/A"}\n` +
//     `🛏️ Rooms: ${property.rooms || "N/A"}\n` +
//     `🛁 Bathrooms: ${property.bathrooms || "N/A"}\n` +
//     `📏 Area: ${property.area || "N/A"} sqft\n` +
//     `🚗 Parking: ${property.parking ? "Yes" : "No"}\n` +
//     `[View Details](https://new-real-estate-client.vercel.app/properties/${property._id})`
//   );
// };

// // Helper Function: Send Filtered Properties
// const sendFilteredProperties = async (ctx, properties) => {
//   if (properties.length === 0) {
//     await ctx.reply("No properties found matching your criteria.");
//     return;
//   }

//   for (let property of properties) {
//     if (property.images && property.images.length > 0) {
//       await ctx.replyWithPhoto(
//         { url: property.images[0] },
//         {
//           caption: formatProperty(property),
//           parse_mode: "Markdown",
//           ...Markup.inlineKeyboard([
//             Markup.button.url(
//               "View Details",
//               `https://new-real-estate-client.vercel.app/properties/${property._id}`
//             ),
//           ])
//         }
//       );
//     } else {
//       await ctx.replyWithMarkdown(
//         formatProperty(property),
//         Markup.inlineKeyboard([
//           Markup.button.url(
//             "View Details",
//             `https://new-real-estate-client.vercel.app/properties/${property._id}`
//           ),
//         ])
//       );
//     }
//   }
// };

// // Helper function to create district keyboard
// const createDistrictKeyboard = (page = 0, itemsPerPage = 8) => {
//   const start = page * itemsPerPage;
//   const end = start + itemsPerPage;
//   const currentDistricts = DISTRICTS.slice(start, end);
  
//   const keyboard = currentDistricts.map(district => [
//     Markup.button.callback(district, `district_${district.toLowerCase().replace(/[^a-z0-9]/g, '_')}`)
//   ]);
  
//   // Add navigation buttons if needed
//   const navigationRow = [];
//   if (page > 0) {
//     navigationRow.push(Markup.button.callback('⬅️ Previous', `district_page_${page - 1}`));
//   }
//   if (end < DISTRICTS.length) {
//     navigationRow.push(Markup.button.callback('➡️ Next', `district_page_${page + 1}`));
//   }
  
//   if (navigationRow.length > 0) {
//     keyboard.push(navigationRow);
//   }
  
//   return keyboard;
// };

// // Start Command
// bot.start((ctx) => {
//   const welcomeMessage = `
//   🏠 *GEOMAP — a full-featured application available directly within Telegram, with maps and filters.*
  
//   No registration or email is required to interact with the app or contact the author of a listing. Simply click "Open Application," specify your search parameters, and choose a suitable option on the map or in the list.
//   `;
  
  
//   return ctx.replyWithMarkdown(welcomeMessage, {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: "👉 Open Application", web_app: { url: "https://new-real-estate-client.vercel.app" } }],
//         [{ text: "📝 Post an Ad", callback_data: "post_ad" }],
//         [{ text: "📨 Enable Notifications", callback_data: "enable_notifications" }],
//         [{ text: "🏠 All Properties", callback_data: "all_properties" }],
//         [{ text: "🔍 Filter Properties", callback_data: "filter_properties" }]
//       ]
      
//     }
//   });
// });

// // Handle All Properties Command
// bot.action("all_properties", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Loading all properties... Please wait.");
//   const properties = await Property.find();
//   await sendFilteredProperties(ctx, properties);
// });

// // Handle "Filter Properties"
// bot.action("filter_properties", (ctx) => {
//   ctx.answerCbQuery();
//   ctx.reply("Choose a filter:", 
//     Markup.inlineKeyboard([
//       [Markup.button.callback("💰 Price", "filter_price")],
//       [Markup.button.callback("🏘️ District", "filter_district")],
//       [Markup.button.callback("🛏️ Rooms", "filter_rooms")],
//       [Markup.button.callback("🚿 Bathrooms", "filter_bathrooms")],
//       [Markup.button.callback("🚗 Parking", "filter_parking")],
//     ])
//   );
// });

// // Handle Price Filter
// bot.action("filter_price", (ctx) => {
//   ctx.answerCbQuery();
//   ctx.reply("Select a price range:", 
//     Markup.inlineKeyboard([
//       [Markup.button.callback("$100 - $500", "price_100_500")],
//       [Markup.button.callback("$500 - $1000", "price_500_1000")],
//       [Markup.button.callback("$1000 - $2000", "price_1000_2000")],
//       [Markup.button.callback("Above $2000", "price_above_2000")],
//     ])
//   );
// });

// // Handle District Filter
// bot.action("filter_district", async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.reply("Select a district:", {
//     reply_markup: {
//       inline_keyboard: createDistrictKeyboard()
//     }
//   });
// });

// // Handle district pagination
// bot.action(/district_page_(\d+)/, async (ctx) => {
//   const page = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery();
//   await ctx.editMessageReplyMarkup({
//     inline_keyboard: createDistrictKeyboard(page)
//   });
// });

// // Handle Rooms Filter
// bot.action("filter_rooms", (ctx) => {
//   ctx.answerCbQuery();
//   ctx.reply("Select number of rooms:", 
//     Markup.inlineKeyboard([
//       [Markup.button.callback("1 Room", "rooms_1")],
//       [Markup.button.callback("2 Rooms", "rooms_2")],
//       [Markup.button.callback("3+ Rooms", "rooms_3plus")],
//     ])
//   );
// });

// // Handle Bathrooms Filter
// bot.action("filter_bathrooms", (ctx) => {
//   ctx.answerCbQuery();
//   ctx.reply("Select number of bathrooms:", 
//     Markup.inlineKeyboard([
//       [Markup.button.callback("1 Bathroom", "bathrooms_1")],
//       [Markup.button.callback("2 Bathrooms", "bathrooms_2")],
//       [Markup.button.callback("3+ Bathrooms", "bathrooms_3plus")],
//     ])
//   );
// });

// // Handle Parking Filter
// bot.action("filter_parking", (ctx) => {
//   ctx.answerCbQuery();
//   ctx.reply("Select parking availability:", 
//     Markup.inlineKeyboard([
//       [Markup.button.callback("With Parking", "parking_yes")],
//       [Markup.button.callback("Without Parking", "parking_no")],
//     ])
//   );
// });

// // Handle Price Range Buttons
// bot.action("price_100_500", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties between $100 and $500...");
//   const properties = await fetchPropertiesByFilters({ minPrice: 100, maxPrice: 500 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("price_500_1000", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties between $500 and $1000...");
//   const properties = await fetchPropertiesByFilters({ minPrice: 500, maxPrice: 1000 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("price_1000_2000", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties between $1000 and $2000...");
//   const properties = await fetchPropertiesByFilters({ minPrice: 1000, maxPrice: 2000 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("price_above_2000", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties above $2000...");
//   const properties = await fetchPropertiesByFilters({ minPrice: 2000 });
//   await sendFilteredProperties(ctx, properties);
// });

// // Generate district action handlers dynamically
// DISTRICTS.forEach(district => {
//   const callbackData = `district_${district.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
//   bot.action(callbackData, async (ctx) => {
//     await ctx.answerCbQuery();
//     ctx.reply(`Fetching properties in ${district}...`);
//     const properties = await fetchPropertiesByFilters({ district: district });
//     await sendFilteredProperties(ctx, properties);
//   });
// });

// // Handle Rooms Buttons
// bot.action("rooms_1", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with 1 room...");
//   const properties = await fetchPropertiesByFilters({ rooms: 1 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("rooms_2", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with 2 rooms...");
//   const properties = await fetchPropertiesByFilters({ rooms: 2 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("rooms_3plus", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with 3 or more rooms...");
//   const properties = await fetchPropertiesByFilters({ rooms: { $gte: 3 } });
//   await sendFilteredProperties(ctx, properties);
// });

// // Handle Bathrooms Buttons
// bot.action("bathrooms_1", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with 1 bathroom...");
//   const properties = await fetchPropertiesByFilters({ bathrooms: 1 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("bathrooms_2", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with 2 bathrooms...");
//   const properties = await fetchPropertiesByFilters({ bathrooms: 2 });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("bathrooms_3plus", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with 3 or more bathrooms...");
//   const properties = await fetchPropertiesByFilters({ bathrooms: { $gte: 3 } });
//   await sendFilteredProperties(ctx, properties);
// });

// // Handle Parking Buttons
// bot.action("parking_yes", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties with parking...");
//   const properties = await fetchPropertiesByFilters({ parking: true });
//   await sendFilteredProperties(ctx, properties);
// });

// bot.action("parking_no", async (ctx) => {
//   await ctx.answerCbQuery();
//   ctx.reply("Fetching properties without parking...");
//   const properties = await fetchPropertiesByFilters({ parking: false });
//   await sendFilteredProperties(ctx, properties);
// });

// // Handle post ad callback
// bot.action('post_ad', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.reply("To post your advertisement, please visit our website: https://new-real-estate-client.vercel.app");
// });

// // Handle enable notifications callback
// bot.action('enable_notifications', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.reply("Notifications have been enabled! You'll receive updates about new properties.");
// });

// // Launch the bot
// bot.launch().then(() => console.log("Telegram Bot is running"));

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// console.log("Bot script is running...");





const { Telegraf, Markup } = require("telegraf");
const mongoose = require("mongoose");

// Telegram Bot Token
const TOKEN = "7712916176:AAF15UqOplv1hTdJVxILWoUOEefEKjGJOso";
const bot = new Telegraf(TOKEN);

// MongoDB Connection URL
// const DATABASE_URL = "mongodb+srv://abisheikabisheik102:abi@realestate.obn2d.mongodb.net/estate?retryWrites=true&w=majority&appName=RealEstate";

DATABASE_URL="mongodb+srv://abi:abi@cluster0.dzzos.mongodb.net/Residency?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));

// Define districts
const DISTRICTS = [
  "Vera", "Mtatsminda", "Vake", "Sololaki", "Chugureti", "Saburtalo",
  "Didube", "Gldani", "Avlabari", "Isani", "Samgori", "Dighomi",
  "Varketili", "Ortachala", "Abanotubani", "Didi Dighomi",
  "Dighomi Massive", "Lisi Lake", "Vashlijvari", "Afrika",
  "Vasizubani", "Kukia", "Elia", "Okrokana", "Avchala",
  "Temqa", "Tskhneti", "Bagebi", "Nutsubidze Plato",
  "Vake-Saburtalo", "Vezisi", "Tkhinvali", "Kus Tba (Turtle Lake)",
  "Lisi", "Mukhatgverdi", "Mukhattskaro", "Nutsubidze Plateau",
  "Lisi Adjacent Area", "Digomi 1-9", "Sof. Digomi (Village Digomi)",
  "Dighmis Chala", "Koshigora", "Didgori", "Old Tbilisi",
  "Krtsanisi", "Tsavkisi Valley", "Didube-Chughureti",
  "Dighmis Massive (Dighmis Masivi)", "Iveri Settlement (Ivertubani)",
  "Svaneti Quarter (Svanetis Ubani)", "Gldani-Nadzaladevi"
];

// Define the Property Schema
const propertySchema = new mongoose.Schema({
  title: String,
  address: String,
  price: Number,
  bathrooms: Number,
  rooms: Number,
  area: Number,
  type: String,
  images: [String],
  residencyType: String,
  description: String,
  status: String,
  propertyType: String,
  district: [String],
  parking: Boolean,
});

// Create the Property Model
const Property = mongoose.model("Residency", propertySchema);

// Helper Function: Fetch Properties by Filters
const fetchPropertiesByFilters = async (filters) => {
  try {
    const query = {};
    if (filters.minPrice && filters.maxPrice) {
      query.price = { $gte: filters.minPrice, $lte: filters.maxPrice };
    }
    if (filters.district) {
      query.district = filters.district;
    }
    if (filters.rooms) {
      query.rooms = filters.rooms;
    }
    if (filters.bathrooms) {
      query.bathrooms = filters.bathrooms;
    }
    if (filters.parking !== undefined) {
      query.parking = filters.parking;
    }
    console.log("Query:", JSON.stringify(query));
    const properties = await Property.find(query);
    console.log("Found properties:", properties.length);
    return properties;
  } catch (error) {
    console.error("Error fetching properties by filters:", error.message);
    return [];
  }
};

// Helper Function: Format Property Data
const formatProperty = (property) => {
  return (
    `🏠 *${property.title || "Untitled"}*\n` +
    `📍 Location: ${property.address || "Not provided"}\n` +
    `🏙️ District: ${property.district || "Not provided"}\n` +
    `💰 Price: $${property.price || "N/A"}\n` +
    `🛏️ Rooms: ${property.rooms || "N/A"}\n` +
    `🛁 Bathrooms: ${property.bathrooms || "N/A"}\n` +
    `📏 Area: ${property.area || "N/A"} sqft\n` +
    `🚗 Parking: ${property.parking ? "Yes" : "No"}\n` +
    `[View Details](https://add-bot.vercel.app/card//${card._id})`
  );
};

// Helper Function: Send Filtered Properties
const sendFilteredProperties = async (ctx, properties) => {
  if (properties.length === 0) {
    await ctx.reply("No properties found matching your criteria.");
    return;
  }

  for (let property of properties) {
    if (property.images && property.images.length > 0) {
      await ctx.replyWithPhoto(
        { url: property.images[0] },
        {
          caption: formatProperty(property),
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            Markup.button.url(
              "View Details",
              `https://add-bot.vercel.app/card/${card._id}`
            ),
          ])
        }
      );
    } else {
      await ctx.replyWithMarkdown(
        formatProperty(property),
        Markup.inlineKeyboard([
          Markup.button.url(
            "View Details",
            `https://add-bot.vercel.app/card/${card._id}`
          ),
        ])
      );
    }
  }
};

// Helper function to create district keyboard
const createDistrictKeyboard = (page = 0, itemsPerPage = 8) => {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const currentDistricts = DISTRICTS.slice(start, end);
  
  const keyboard = currentDistricts.map(district => [
    Markup.button.callback(district, `district_${district.toLowerCase().replace(/[^a-z0-9]/g, '_')}`)
  ]);
  
  // Add navigation buttons if needed
  const navigationRow = [];
  if (page > 0) {
    navigationRow.push(Markup.button.callback('⬅️ Previous', `district_page_${page - 1}`));
  }
  if (end < DISTRICTS.length) {
    navigationRow.push(Markup.button.callback('➡️ Next', `district_page_${page + 1}`));
  }
  
  if (navigationRow.length > 0) {
    keyboard.push(navigationRow);
  }
  
  return keyboard;
};

// Start Command
bot.start((ctx) => {
  const welcomeMessage = `
  🏠 *GEOMAP — a full-featured application available directly within Telegram, with maps and filters.*
  
  No registration or email is required to interact with the app or contact the author of a listing. Simply click "Open Application," specify your search parameters, and choose a suitable option on the map or in the list.
  `;
  
  
  return ctx.replyWithMarkdown(welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "👉 Open Application", web_app: { url: "https://t.me/rent_tbilisi_ge" } }],
        [{ text: "📝 Post an Ad", web_app: { url: "https://add-bot.vercel.app" } }],
         [{ text: "🏠 All Properties", callback_data: "all_properties" }],
        [{ text: "🔍 Filter Properties", callback_data: "filter_properties" }]
      ]
      
    }
  });
});

// Handle All Properties Command
bot.action("all_properties", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Loading all properties... Please wait.");
  const properties = await Property.find();
  await sendFilteredProperties(ctx, properties);
});

// Handle "Filter Properties"
bot.action("filter_properties", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Choose a filter:", 
    Markup.inlineKeyboard([
      [Markup.button.callback("💰 Price", "filter_price")],
      [Markup.button.callback("🏘️ District", "filter_district")],
      [Markup.button.callback("🛏️ Rooms", "filter_rooms")],
      [Markup.button.callback("🚿 Bathrooms", "filter_bathrooms")],
      [Markup.button.callback("🚗 Parking", "filter_parking")],
    ])
  );
});

// Handle Price Filter
bot.action("filter_price", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Select a price range:", 
    Markup.inlineKeyboard([
      [Markup.button.callback("$100 - $500", "price_100_500")],
      [Markup.button.callback("$500 - $1000", "price_500_1000")],
      [Markup.button.callback("$1000 - $2000", "price_1000_2000")],
      [Markup.button.callback("Above $2000", "price_above_2000")],
    ])
  );
});

// Handle District Filter
bot.action("filter_district", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("Select a district:", {
    reply_markup: {
      inline_keyboard: createDistrictKeyboard()
    }
  });
});

// Handle district pagination
bot.action(/district_page_(\d+)/, async (ctx) => {
  const page = parseInt(ctx.match[1]);
  await ctx.answerCbQuery();
  await ctx.editMessageReplyMarkup({
    inline_keyboard: createDistrictKeyboard(page)
  });
});

// Handle Rooms Filter
bot.action("filter_rooms", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Select number of rooms:", 
    Markup.inlineKeyboard([
      [Markup.button.callback("1 Room", "rooms_1")],
      [Markup.button.callback("2 Rooms", "rooms_2")],
      [Markup.button.callback("3+ Rooms", "rooms_3plus")],
    ])
  );
});

// Handle Bathrooms Filter
bot.action("filter_bathrooms", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Select number of bathrooms:", 
    Markup.inlineKeyboard([
      [Markup.button.callback("1 Bathroom", "bathrooms_1")],
      [Markup.button.callback("2 Bathrooms", "bathrooms_2")],
      [Markup.button.callback("3+ Bathrooms", "bathrooms_3plus")],
    ])
  );
});

// Handle Parking Filter
bot.action("filter_parking", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Select parking availability:", 
    Markup.inlineKeyboard([
      [Markup.button.callback("With Parking", "parking_yes")],
      [Markup.button.callback("Without Parking", "parking_no")],
    ])
  );
});

// Handle Price Range Buttons
bot.action("price_100_500", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties between $100 and $500...");
  const properties = await fetchPropertiesByFilters({ minPrice: 100, maxPrice: 500 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("price_500_1000", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties between $500 and $1000...");
  const properties = await fetchPropertiesByFilters({ minPrice: 500, maxPrice: 1000 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("price_1000_2000", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties between $1000 and $2000...");
  const properties = await fetchPropertiesByFilters({ minPrice: 1000, maxPrice: 2000 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("price_above_2000", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties above $2000...");
  const properties = await fetchPropertiesByFilters({ minPrice: 2000 });
  await sendFilteredProperties(ctx, properties);
});

// Generate district action handlers dynamically
DISTRICTS.forEach(district => {
  const callbackData = `district_${district.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  bot.action(callbackData, async (ctx) => {
    await ctx.answerCbQuery();
    ctx.reply(`Fetching properties in ${district}...`);
    const properties = await fetchPropertiesByFilters({ district: district });
    await sendFilteredProperties(ctx, properties);
  });
});

// Handle Rooms Buttons
bot.action("rooms_1", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with 1 room...");
  const properties = await fetchPropertiesByFilters({ rooms: 1 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("rooms_2", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with 2 rooms...");
  const properties = await fetchPropertiesByFilters({ rooms: 2 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("rooms_3plus", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with 3 or more rooms...");
  const properties = await fetchPropertiesByFilters({ rooms: { $gte: 3 } });
  await sendFilteredProperties(ctx, properties);
});

// Handle Bathrooms Buttons
bot.action("bathrooms_1", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with 1 bathroom...");
  const properties = await fetchPropertiesByFilters({ bathrooms: 1 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("bathrooms_2", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with 2 bathrooms...");
  const properties = await fetchPropertiesByFilters({ bathrooms: 2 });
  await sendFilteredProperties(ctx, properties);
});

bot.action("bathrooms_3plus", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with 3 or more bathrooms...");
  const properties = await fetchPropertiesByFilters({ bathrooms: { $gte: 3 } });
  await sendFilteredProperties(ctx, properties);
});

// Handle Parking Buttons
bot.action("parking_yes", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties with parking...");
  const properties = await fetchPropertiesByFilters({ parking: true });
  await sendFilteredProperties(ctx, properties);
});

bot.action("parking_no", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("Fetching properties without parking...");
  const properties = await fetchPropertiesByFilters({ parking: false });
  await sendFilteredProperties(ctx, properties);
});

// Handle post ad callback
bot.action('post_ad', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("To post your advertisement, please visit our website: https://add-bot.vercel.app");
});

// Handle enable notifications callback
// bot.action('enable_notifications', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.reply("Notifications have been enabled! You'll receive updates about new properties.");
// });

// Launch the bot
bot.launch().then(() => console.log("Telegram Bot is running"));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log("Bot script is running...");
