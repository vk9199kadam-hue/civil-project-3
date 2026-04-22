export const PROJECT_CATEGORIES = {
  RESIDENTIAL: {
    name: "Residential Properties",
    icon: "Home",
    subTypes: [
      {
        name: "Apartments / Flats",
        attributes: ["Floor No.", "Total Floors", "Lift", "Power Backup", "Society Name"],
        variants: ["Ready to Move", "Under Construction", "Resale", "New Launch"]
      },
      {
        name: "Independent Houses",
        attributes: ["Plot Area", "Built-up Area", "Facing", "Parking"],
        variants: ["Villa", "Bungalow", "Independent Floor", "Builder Floor"]
      },
      {
        name: "Row Houses",
        attributes: ["Maintenance Charge", "Security", "Clubhouse Access"],
        variants: ["Gated Community Row House", "Standalone Row House"]
      },
      {
        name: "Studio Apartments",
        attributes: ["Kitchenette status", "Balcony"],
        variants: ["Fully Furnished", "Semi-Furnished", "Unfurnished"]
      },
      {
        name: "PG / Hostels",
        attributes: ["Food included", "AC/Non-AC", "Sharing (1/2/3/4)"],
        variants: ["Boys PG", "Girls PG", "Co-living Space"]
      },
      {
        name: "Farmhouses",
        attributes: ["Land size", "Water source", "Distance from city"],
        variants: ["Weekend Home", "Agricultural Farmhouse"]
      }
    ]
  },
  COMMERCIAL: {
    name: "Commercial Properties",
    icon: "Briefcase",
    subTypes: [
      {
        name: "Office Space",
        attributes: ["Carpet Area", "Cabins", "Workstations", "Internet readiness"],
        variants: ["Fully Furnished Office", "Bare Shell Office", "Co-working Space"]
      },
      {
        name: "Shops / Retail",
        attributes: ["Frontage width", "Footfall area", "Lock-in period"],
        variants: ["High Street Shop", "Mall Shop", "Market Stall"]
      },
      {
        name: "Showrooms",
        attributes: ["Display window space", "Parking availability"],
        variants: ["Ground Floor Showroom", "Multi-story Showroom"]
      },
      {
        name: "Warehouses",
        attributes: ["Ceiling height", "Loading dock", "Power load (kW)"],
        variants: ["Cold Storage", "General Warehouse", "Industrial Shed"]
      },
      {
        name: "Co-working Spaces",
        attributes: ["Meeting room access", "Printing facilities"],
        variants: ["Private Cabin", "Dedicated Desk", "Hot Desk"]
      },
      {
        name: "Business Centers",
        attributes: ["Mail handling", "Reception services"],
        variants: ["Virtual Office", "Registered Office Address"]
      }
    ]
  },
  LAND: {
    name: "Land & Plots",
    icon: "Map",
    subTypes: [
      {
        name: "Residential Plots",
        attributes: ["Road width", "Boundary wall", "Electricity/Water connection"],
        variants: ["Gated Community Plot", "Open Plot", "NA Plot"]
      },
      {
        name: "Agricultural Land",
        attributes: ["Soil type", "Irrigation source", "Crop history"],
        variants: ["Farm Land", "Orchard", "Crop Land"]
      },
      {
        name: "Industrial Land",
        attributes: ["Zone clearance", "Environmental clearance status"],
        variants: ["MIDC Plot", "Factory Land"]
      },
      {
        name: "Commercial Land",
        attributes: ["FSI (Floor Space Index)", "Zoning permission"],
        variants: ["Corner Plot", "Highway Frontage Land"]
      }
    ]
  },
  INDUSTRIAL: {
    name: "Industrial Properties",
    icon: "Factory",
    subTypes: [
      {
        name: "Factories",
        attributes: ["Power capacity", "Labor shed", "Waste disposal"],
        variants: ["Manufacturing Unit", "Assembly Unit"]
      },
      {
        name: "Industrial Sheds",
        attributes: ["Span length", "Height", "Crane availability"],
        variants: ["Pre-engineered Building (PEB)", "RCC Shed"]
      }
    ]
  },
  HOSPITALITY: {
    name: "Hospitality & Investment",
    icon: "Hotel",
    subTypes: [
      {
        name: "Hotels / Resorts",
        attributes: ["Room count", "Star rating", "Occupancy rate"],
        variants: ["Boutique Hotel", "Resort", "Guest House"]
      },
      {
        name: "Retail Complexes",
        attributes: ["Anchor tenants", "Footfall data"],
        variants: ["Shopping Mall", "Strip Mall"]
      }
    ]
  }
};
