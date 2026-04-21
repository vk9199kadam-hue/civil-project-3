export const PROJECTS = [
  {
    id: "proj-1",
    name: "Sangli Skyline Residency",
    type: "building",
    location: "Vishrambag, Sangli",
    distance: "2.3 km from Station",
    coverImage: "/images/residency_cover.png",
    totalUnits: 30,
    soldUnits: 20,
    remainingUnits: 10,
    priceRange: "₹45L - ₹85L",
    avgPriceSqFt: 4200,
    localityAvg: 4500,
    reraCertified: true,
    verified: true,
    stats: {
      "2BHK": 10,
      "3BHK": 10,
      "4BHK": 10
    },
    inventory: [
      {
        id: "unit-101",
        number: "101",
        floor: "1st",
        type: "2BHK",
        price: 4500000,
        area: 1150,
        status: "available",
        facing: "North",
        image: "/images/interior.png",
        description: "Elegant 2BHK with garden view and spacious balcony."
      },
      {
        id: "unit-304",
        number: "304",
        floor: "3rd",
        type: "3BHK",
        price: 6200000,
        area: 1450,
        status: "available",
        facing: "East",
        image: "/images/interior.png",
        description: "Corner 3BHK with excellent natural lighting and ventilation."
      },
      {
        id: "unit-502",
        number: "502",
        floor: "5th",
        type: "4BHK",
        price: 8500000,
        area: 1850,
        status: "available",
        facing: "North-West",
        image: "/images/interior.png",
        description: "Premium penthouse suite with private terrace access."
      },
      // ... more units would be here
    ]
  },
  {
    id: "proj-2",
    name: "Krishna Valley NA Plots",
    type: "land",
    location: "Islampur-Nagthane Road, Islampur",
    distance: "Near Krishna River Basin",
    coverImage: "/images/plots.png",
    totalUnits: 30, // plots
    soldUnits: 18,
    remainingUnits: 12,
    totalArea: "30 Acres",
    priceRange: "₹25L - ₹45L",
    reraCertified: true,
    verified: true,
    inventory: [
      {
        id: "plot-07",
        number: "07",
        size: "2000 sq.ft",
        price: 2800000,
        status: "available",
        roadWidth: "12m",
        facing: "South",
        image: "/images/plots.png",
        description: "Corner plot with wide road frontage, ideal for independent villa."
      },
      {
        id: "plot-12",
        number: "12",
        size: "3500 sq.ft",
        price: 4200000,
        status: "available",
        roadWidth: "9m",
        facing: "North",
        image: "/images/plots.png",
        description: "Large rectangular plot with clear title and NA conversion completed."
      }
    ]
  }
];

export const CATEGORIES = [
  { name: "Residential", icon: "Home" },
  { name: "Commercial", icon: "Briefcase" },
  { name: "Land & Plots", icon: "Map" },
  { name: "Industrial", icon: "Factory" },
  { name: "Hospitality", icon: "Hotel" }
];
