  /**
   * Feature Selection
   */
  export const getFeaturesByVehicle = (vehicleType) => {
    // Common features shared by both cars and trucks
    const commonCarTruckFeatures = {
      featuredListsOne: [
        { name: "ABS" },
        { name: "Air Conditioning" }, // Shared between car and truck
      ],
      featuredListsTwo: [
        { name: "Power Steering" }, // Shared between car and truck
      ],
      featuredListsThree: [
        { name: "Cruise Control" }, // Shared between car and truck
      ],
    };

    // Car-specific features
    const carFeatures = {
      featuredListsOne: [
        ...commonCarTruckFeatures.featuredListsOne, // Include common features
        { name: "Alloy Rims" },
        { name: "Cassette Player" },
        { name: "Climate Control" },
        { name: "Front Camera" },
        { name: "Keyless Entry" },
        { name: "Power Mirrors" },
        { name: "Rear Seat Entertainment" },
        { name: "Rear Camera" },
        { name: "USB and Auxillary Cable" },
      ],
      featuredListsTwo: [
        ...commonCarTruckFeatures.featuredListsTwo, // Include common features
        { name: "Air Bags" },
        { name: "AM/FM Radio" },
        { name: "Cool Box" },
        { name: "CD/DVD Player" },
        { name: "Navigation System" },
        { name: "Rear AC Vents" },
        { name: "Sun Roof" },
      ],
      featuredListsThree: [
        ...commonCarTruckFeatures.featuredListsThree, // Include common features
        { name: "Front Speakers" },
        { name: "Immobilizer Key" },
        { name: "Power Locks" },
        { name: "Power Windows" },
        { name: "Rear Speakers" },
        { name: "Steering Switches" },
      ],
    };

    // Bike-specific features
    const bikeFeatures = {
      featuredListsOne: [
        { name: "ABS" },
        { name: "LED Headlights" },
        { name: "Disc Brakes" },
        { name: "Alloy Wheels" },
      ],
      featuredListsTwo: [
        { name: "Digital Speedometer" },
        { name: "Fuel Injection" },
        { name: "Handlebar Controls" },
      ],
      featuredListsThree: [
        { name: "Mobile Charging Port" },
        { name: "Side Stand Indicator" },
      ],
    };

    // Truck-specific features
    const truckFeatures = {
      featuredListsOne: [
        ...commonCarTruckFeatures.featuredListsOne, // Include common features
        { name: "Cargo Bed" },
        { name: "Trailer Hitch" },
        { name: "Heavy-duty Suspension" },
      ],
      featuredListsTwo: [
        ...commonCarTruckFeatures.featuredListsTwo, // Include common features
        { name: "Air Brakes" },
        { name: "Reinforced Chassis" },
        { name: "Towing Package" },
      ],
      featuredListsThree: [
        ...commonCarTruckFeatures.featuredListsThree, // Include common features
        { name: "Off-road Tires" },
        { name: "Powerful Engine" },
        { name: "GPS Navigation" },
      ],
    };

    // Return features based on the vehicle type
    switch (vehicleType) {
      case "bike":
        return bikeFeatures;
      case "truck":
        return truckFeatures;
      default:
        return carFeatures; // Default to car features
    }
  };