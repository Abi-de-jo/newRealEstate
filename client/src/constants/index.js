import { exploreVideo, frameVideo, heroVideo, smallHeroVideo } from "../utiills";
 
  
  export const navLists = ["Store", "Mac", "iPhone", "Support"];
  
  export const hightlightsSlides = [
    {
      id: 1,
      textLists: [
        "Enter A17 Pro.",
        "Game‑changing chip.",
        "Groundbreaking performance.",
      ],
      video: heroVideo,
      videoDuration: 4,
    },
    {
      id: 2,
      textLists: [
        "iPhone 15 Pro Max has the",
        "longest optical zoom in",
        "iPhone ever. Far out.",
      ],
      video: exploreVideo,
      videoDuration: 2,
    },
    {
      id: 3,
      textLists: ["Titanium.", "So strong. So light. So Pro."],
      video: smallHeroVideo,
      videoDuration: 5,
    },
    {
      id: 4,
      textLists: ["All-new Action button.", "What will yours do?."],
      video: frameVideo,
      videoDuration: 3.63,
    },
  ];
  
  
  
  export const sizes = [
    { label: '6.1"', value: "small" },
    { label: '6.7"', value: "large" },
  ];
  
  export const footerLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales Policy",
    "Legal",
    "Site Map",
  ];