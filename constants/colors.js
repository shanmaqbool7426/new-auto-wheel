const colorConfig = {
    "Super White": "#F8F9F9",
    "Attitude Black": "#0D0D0D",
    "Silver Metallic": "#C0C0C0",
    "Phantom Brown": "#6B4F39",
    "Classic Silver Metallic": "#A6A6A6",
    "Barcelona Red Metallic": "#C21807",
    "Blizzard Pearl": "#F1ECE4",
    "Midnight Black": "#1C1C1C",
    "Celestial Silver Metallic": "#B9B9B9",
    "Galactic Aqua Mica": "#1D566E",
    "Magnetic Gray Metallic": "#4D4D4D",
    "Blue Crush Metallic": "#3A539B",
    "Black Sand Pearl": "#151B1E",
    "Sandy Beach Metallic": "#F0E0C0",
    "Ruby Flare Pearl": "#9B111E",
    "Wind Chill Pearl": "#F3F4F6",
    "Electric Blue": "#0071CE",
    "Gun Metallic": "#828282",
    "Bright White": "#FFFFFF",
    "Granite Crystal Metallic": "#3E3E3E",
    "Brilliant Silver": "#D4D4D4",
    "Cayenne Red": "#9E1B32",
    "Titanium Bronze": "#6F4F28",
    "Lunar Blue Metallic": "#2E3B57",
    "Obsidian Black": "#090C08",
    "Polar White": "#E7E7E7",
    "Indigo Blue": "#4B0082",
    "Graphite Grey Metallic": "#606060",
    "Mojave Sand": "#C9B599",
    "Deep Sea Blue Metallic": "#003366",
    "Pearl White": "#E8E8E8",
    "Desert Sand Mica": "#C4B29B",
    "Sapphire Blue": "#0F52BA",
    "Midnight Garnet": "#4E2A2A",
    "Cobalt Blue Metallic": "#0047AB",
    "Sunset Orange": "#FC4C02",
    "Burgundy Velvet": "#800020",
    "Race Red": "#D50000",
    "Oxford White": "#F8F9F9",
    "Shadow Black": "#1A1A1A",
    "Velocity Blue": "#1C39BB",
    "Hot Pepper Red": "#C5001E",
    "Dark Highland Green": "#264028",
    "Iconic Silver": "#D3D3D3",
    "Rapid Red": "#FF3333",
    "Star White Metallic": "#F5F5F5",
    "Orange Fury": "#FF4500",
    "Kona Blue": "#003366",
    "White": "#FFFFFF",  // Adding "White"
    "Black": "#000000",  // Adding "Black"
    "Grey": "	#D3D3D3",  // Adding "Black"
    "Orange": "	#FFA500",  // Adding "Black"
    "Yellow": "#FFD700",  // Adding "Black"
    "Silver": "#C0C0C0", // Adding "Silver"
    "Blue": "#0000FF",    // Adding "Blue"
    "Red": "#FF0000"    // Adding "Red"
  };
  
export const GetColor = (color) => {
    return colorConfig[color] || '#000';

}