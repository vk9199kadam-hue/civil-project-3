// Comprehensive Mock Data for Islampur Property Portal
// Supporting Residential, Commercial, Land, Industrial, and Hospitality

export const PROJECT_TYPES = {
  SINGLE: 'single',
  BUILDING: 'building',
  LAND: 'land'
};

export const CATEGORIES = [
  { 
    id: 'res', 
    name: "Residential", 
    icon: "Home",
    subTypes: ["Ready to Move", "Under Construction", "Resale", "New Launch", "Villa", "Bungalow", "PG/Hostel", "Farmhouse"]
  },
  { 
    id: 'com', 
    name: "Commercial", 
    icon: "Briefcase",
    subTypes: ["Office Space", "Shops/Retail", "Showroom", "Warehouse", "Co-working Space"]
  },
  { 
    id: 'land', 
    name: "Land & Plots", 
    icon: "Map",
    subTypes: ["Residential Plot", "Open Plot", "NA Plot", "Agricultural Land", "Industrial Land"]
  },
  { 
    id: 'ind', 
    name: "Industrial", 
    icon: "Factory",
    subTypes: ["Manufacturing Unit", "Assembly Unit", "Industrial Shed"]
  }
];

export const PROJECTS = [
  {
    id: "proj-1",
    name: "Green Valley Residency",
    type: PROJECT_TYPES.BUILDING,
    category: "Residential",
    subType: "Apartments",
    location: "Vishrambag, Sangli",
    landmark: "Near City Hospital",
    distance: "2.3 km from Station",
    coverImage: "/images/residency_cover.png",
    totalUnits: 30,
    soldUnits: 20,
    remainingUnits: 10,
    priceRange: "₹45,00,000 - ₹85,00,000",
    avgPriceSqFt: 4200,
    localityAvg: 4500,
    reraId: "P53100012345",
    reraCertified: true,
    verified: true,
    possessionDate: "Dec 2026",
    amenities: ["Gated Community", "Clubhouse", "24/7 Security", "Power Backup", "Gym", "Garden"],
    inventory: [
      {
        id: "gv-101",
        code: "GV-101",
        number: "101",
        floor: "1",
        type: "2BHK",
        price: 4500000,
        area: 1150,
        status: "available", // available, booked, sold, blocked
        facing: "North",
        balconies: 2,
        parking: "1 Covered",
        image: "/images/interior.png",
        description: "Elegant 2BHK with garden view and spacious balcony.",
        specs: { beds: 2, baths: 2, parking: 1 }
      },
      {
        id: "gv-304",
        code: "GV-304",
        number: "304",
        floor: "3",
        type: "3BHK",
        price: 6200000,
        area: 1450,
        status: "available",
        facing: "East",
        balconies: 3,
        parking: "1 Covered",
        image: "/images/interior.png",
        description: "Corner 3BHK with excellent natural lighting and ventilation.",
        specs: { beds: 3, baths: 3, parking: 1 }
      }
    ]
  },
  {
    id: "proj-2",
    name: "Krishna Hills NA Plots",
    type: PROJECT_TYPES.LAND,
    category: "Land & Plots",
    subType: "NA Plot",
    location: "Islampur-Nagthane Road",
    landmark: "Krishna River Basin",
    distance: "10 mins from Islampur Bus Stand",
    coverImage: "/images/plots.png",
    totalArea: "30 Acres",
    soldArea: "18 Acres",
    remainingArea: "12 Acres",
    totalUnits: 40,
    remainingUnits: 12,
    priceRange: "₹25L - ₹45L",
    reraCertified: true,
    verified: true,
    amenities: ["Internal Roads", "Water Connection", "Electricity", "Drainage", "Security Cabin"],
    inventory: [
      {
        id: "KH-P07",
        code: "KH-P07",
        number: "07",
        sector: "A",
        size: "2000 sq.ft",
        price: 2800000,
        status: "available",
        facing: "South",
        roadWidth: "12m",
        image: "/images/plots.png",
        description: "Corner plot with wide road frontage.",
        specs: { area: "2000 sq.ft", road: "12m", facing: "South" }
      }
    ]
  }
];

export const LEADS = [
  {
    id: "lead-1",
    name: "Rajesh Patil",
    phone: "+91 98765 43210",
    property: "Green Valley Residency",
    unitRef: "GV-304",
    message: "Interested in 3BHK, schedule a visit.",
    status: "new", // new, contacted, follow-up, visit-scheduled, negotiation, closed, lost
    timestamp: "2026-04-21T10:00:00Z"
  }
];
