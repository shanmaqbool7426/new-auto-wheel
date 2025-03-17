// import { Button, Flex, Rating, Text } from "@mantine/core";
// import { GetColor } from '@/constants/colors'

// export const mapVehicleData = (vehicles) => {
//     if (!vehicles?.length) {
//         return {comparisonData:[]}
//     }
//     const greenTick = <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M5.55097 10.9466L0.586967 6.20057C0.516364 6.13444 0.460084 6.05453 0.421609 5.96577C0.383133 5.87702 0.363281 5.78131 0.363281 5.68458C0.363281 5.58784 0.383133 5.49213 0.421609 5.40338C0.460084 5.31462 0.516364 5.23471 0.586967 5.16858L1.66297 4.13958C1.80924 4.00226 2.00234 3.92583 2.20297 3.92583C2.4036 3.92583 2.59669 4.00226 2.74297 4.13958L6.08697 7.33457L13.25 0.491575C13.3962 0.354262 13.5893 0.277832 13.79 0.277832C13.9906 0.277832 14.1837 0.354262 14.33 0.491575L15.41 1.52357C15.4806 1.5897 15.5368 1.66962 15.5753 1.75838C15.6138 1.84713 15.6337 1.94284 15.6337 2.03958C15.6337 2.13631 15.6138 2.23202 15.5753 2.32077C15.5368 2.40953 15.4806 2.48944 15.41 2.55557L6.63097 10.9466C6.48469 11.0839 6.2916 11.1603 6.09097 11.1603C5.89034 11.1603 5.69724 11.0839 5.55097 10.9466Z" fill="#1BC744" />
//     </svg>;
//     return {
//         comparisonData: [
//             // Overview Section
//             {
//                 title: "Overview",
//                 isSwitchable: true,
//                 overviewTableData: [
//                     {
//                         type: "Size",
//                         first: vehicles[0] ? `${vehicles[0].dimensions.overallLength} L x ${vehicles[0].dimensions.overallWidth} W x ${vehicles[0].dimensions.overallHeight} H` : "",
//                         second: vehicles[1] ? `${vehicles[1].dimensions.overallLength} L x ${vehicles[1].dimensions.overallWidth} W x ${vehicles[1].dimensions.overallHeight} H` : "",
//                         third: vehicles[2] ? `${vehicles[2].dimensions.overallLength} L x ${vehicles[2].dimensions.overallWidth} W x ${vehicles[2].dimensions.overallHeight} H` : "",
//                     },
//                     {
//                         type: "Mileage",
//                         first: vehicles[0]?.mileage?.city ? `${vehicles[0].mileage.city} - ${vehicles[0].mileage.highway} Km/l` : "",
//                         second: vehicles[1]?.mileage?.city ? `${vehicles[1].mileage.city} - ${vehicles[1].mileage.highway} Km/l` : "",
//                         third: vehicles[2]?.mileage?.city ? `${vehicles[2].mileage.city} - ${vehicles[2].mileage.highway} Km/l` : "",
//                     },
//                     {
//                         type: "Engine",
//                         first: vehicles[0]?.engine?.displacement ? `${vehicles[0].engine.displacement} cc` : "",
//                         second: vehicles[1]?.engine?.displacement ? `${vehicles[1].engine.displacement} cc` : "",
//                         third: vehicles[2]?.engine?.displacement ? `${vehicles[2].engine.displacement} cc` : "",
//                     },
//                     {
//                         type: "No. of Airbags",
//                         first: vehicles[0]?.safety?.airbags || "",
//                         second: vehicles[1]?.safety?.airbags || "",
//                         third: vehicles[2]?.safety?.airbags || "",
//                     },
//                     {
//                         type: "User Rating",
//                         first: (
//                             <Flex align="center" justify="center" gap="xs">
//                                 <Rating defaultValue={3.5} count={5} />
//                                 <Text fw={600}>{vehicles[0]?.userRating || "3.5"}</Text>
//                             </Flex>
//                         ),
//                         second: (
//                             <Flex align="center" justify="center" gap="xs">
//                                 <Rating defaultValue={3.5} count={5} />
//                                 <Text fw={600}>{vehicles[1]?.userRating || "3.5"}</Text>
//                             </Flex>
//                         ),
//                         third: (
//                             <Flex align="center" justify="center" gap="xs">
//                                 <Rating defaultValue={3.5} count={5} />
//                                 <Text fw={600}>{vehicles[2]?.userRating || "3.5"}</Text>
//                             </Flex>
//                         ),
//                     },
//                     {
//                         type: "Transmission",
//                         first: vehicles[0]?.transmission?.type || "",
//                         second: vehicles[1]?.transmission?.type || "",
//                         third: vehicles[2]?.transmission?.type || "",
//                     },
//                     {
//                         type: "Anti-lock Braking System",
//                         first: vehicles[0]?.safety?.abs ? "Yes" : "No",
//                         second: vehicles[1]?.safety?.abs ? "Yes" : "No",
//                         third: vehicles[2]?.safety?.abs ? "Yes" : "No",
//                     },
//                     {
//                         type: "Trunk Space",
//                         first: vehicles[0]?.dimensions?.bootSpace ? `${vehicles[0].dimensions.bootSpace} L` : "",
//                         second: vehicles[1]?.dimensions?.bootSpace ? `${vehicles[1].dimensions.bootSpace} L` : "",
//                         third: vehicles[2]?.dimensions?.bootSpace ? `${vehicles[2].dimensions.bootSpace} L` : "",
//                     },
//                     {
//                         type: "Brochure",
//                         first: vehicles[0]?.brochureLink ? (
//                             <Button variant="outline" fw={500} color="#E90808" component="a" href={vehicles[0].brochureLink}>
//                                 Download Brochure
//                             </Button>
//                         ) : "",
//                         second: vehicles[1]?.brochureLink ? (
//                             <Button variant="outline" fw={500} color="#E90808" component="a" href={vehicles[1].brochureLink}>
//                                 Download Brochure
//                             </Button>
//                         ) : "",
//                         third: vehicles[2]?.brochureLink ? (
//                             <Button variant="outline" fw={500} color="#E90808" component="a" href={vehicles[2].brochureLink}>
//                                 Download Brochure
//                             </Button>
//                         ) : "",
//                     },
//                 ],
//             },

//             // Key Features & Specs Section
//             {
//                 title: "Key Features & Specs",
//                 isSwitchable: false,
//                 overviewTableData: [
//                     {
//                         featureName: "Dimensions",
//                         type: "icon",
//                         iconURL: "/compare/dimension.svg",
//                     },
//                     {
//                         type: "Overall Length",
//                         first: vehicles[0]?.dimensions?.overallLength || "",
//                         second: vehicles[1]?.dimensions?.overallLength || "",
//                         third: vehicles[2]?.dimensions?.overallLength || "",
//                     },
//                     {
//                         type: "Overall Width",
//                         first: vehicles[0]?.dimensions?.overallWidth || "",
//                         second: vehicles[1]?.dimensions?.overallWidth || "",
//                         third: vehicles[2]?.dimensions?.overallWidth || "",
//                     },
//                     {
//                         type: "Overall Height",
//                         first: vehicles[0]?.dimensions?.overallHeight || "",
//                         second: vehicles[1]?.dimensions?.overallHeight || "",
//                         third: vehicles[2]?.dimensions?.overallHeight || "",
//                     },
//                     {
//                         type: "Wheel Base",
//                         first: vehicles[0]?.dimensions?.wheelBase || "",
//                         second: vehicles[1]?.dimensions?.wheelBase || "",
//                         third: vehicles[2]?.dimensions?.wheelBase || "",
//                     },
//                     {
//                         type: "Ground Clearance",
//                         first: vehicles[0]?.dimensions?.groundClearance || "",
//                         second: vehicles[1]?.dimensions?.groundClearance || "",
//                         third: vehicles[2]?.dimensions?.groundClearance || "",
//                     },
//                     {
//                         type: "Kerb Weight",
//                         first: vehicles[0]?.dimensions?.kerbWeight || "",
//                         second: vehicles[1]?.dimensions?.kerbWeight || "",
//                         third: vehicles[2]?.dimensions?.kerbWeight || "",
//                     },
//                     {
//                         type: "Boot Space",
//                         first: vehicles[0]?.dimensions?.bootSpace || "",
//                         second: vehicles[1]?.dimensions?.bootSpace || "",
//                         third: vehicles[2]?.dimensions?.bootSpace || "",
//                     },
//                     {
//                         type: "Seating Capacity",
//                         first: vehicles[0]?.dimensions?.seatingCapacity || "",
//                         second: vehicles[1]?.dimensions?.seatingCapacity || "",
//                         third: vehicles[2]?.dimensions?.seatingCapacity || "",
//                     },
//                     {
//                         type: "No. of Doors",
//                         first: vehicles[0]?.dimensions?.doors || "",
//                         second: vehicles[1]?.dimensions?.doors || "",
//                         third: vehicles[2]?.dimensions?.doors || "",
//                     },
//                 ],
//             },

//             // Engine & Performance Section
//             {
//                 title: "Engine & Performance",
//                 overviewTableData: [
//                     {
//                         featureName: "Engine & Performance",
//                         type: "icon",
//                         iconURL: "/compare/engine-performace.svg",
//                     },
//                     {
//                         type: "Engine Type",
//                         first: vehicles[0]?.engine?.type || "",
//                         second: vehicles[1]?.engine?.type || "",
//                         third: vehicles[2]?.engine?.type || "",
//                     },
//                     {
//                         type: "Displacement",
//                         first: vehicles[0]?.engine?.displacement ? `${vehicles[0].engine.displacement} cc` : "",
//                         second: vehicles[1]?.engine?.displacement ? `${vehicles[1].engine.displacement} cc` : "",
//                         third: vehicles[2]?.engine?.displacement ? `${vehicles[2].engine.displacement} cc` : "",
//                     },
//                     {
//                         type: "Horse Power",
//                         first: vehicles[0]?.engine?.horsepower || "",
//                         second: vehicles[1]?.engine?.horsepower || "",
//                         third: vehicles[2]?.engine?.horsepower || "",
//                     },
//                     {
//                         type: "Torque",
//                         first: vehicles[0]?.engine?.torque || "",
//                         second: vehicles[1]?.engine?.torque || "",
//                         third: vehicles[2]?.engine?.torque || "",
//                     },
//                     {
//                         type: "Fuel System",
//                         first: vehicles[0]?.engine?.fuelSystem || "",
//                         second: vehicles[1]?.engine?.fuelSystem || "",
//                         third: vehicles[2]?.engine?.fuelSystem || "",
//                     },
//                     {
//                         type: "Max Speed",
//                         first: vehicles[0]?.engine?.maxSpeed || "",
//                         second: vehicles[1]?.engine?.maxSpeed || "",
//                         third: vehicles[2]?.engine?.maxSpeed || "",
//                     },
//                     {
//                         type: "No. of Cylinders",
//                         first: vehicles[0]?.engine?.cylinders || "",
//                         second: vehicles[1]?.engine?.cylinders || "",
//                         third: vehicles[2]?.engine?.cylinders || "",
//                     },
//                     {
//                         type: "Cylinder Configuration",
//                         first: vehicles[0]?.engine?.cylinderConfiguration || "",
//                         second: vehicles[1]?.engine?.cylinderConfiguration || "",
//                         third: vehicles[2]?.engine?.cylinderConfiguration || "",
//                     },
//                     {
//                         type: "Compression Ratio",
//                         first: vehicles[0]?.engine?.compressionRatio || "",
//                         second: vehicles[1]?.engine?.compressionRatio || "",
//                         third: vehicles[2]?.engine?.compressionRatio || "",
//                     },
//                     {
//                         type: "Valves per Cylinder",
//                         first: vehicles[0]?.engine?.valvesPerCylinder || "",
//                         second: vehicles[1]?.engine?.valvesPerCylinder || "",
//                         third: vehicles[2]?.engine?.valvesPerCylinder || "",
//                     },
//                     {
//                         type: "Battery Type (Electrical)",
//                         first: vehicles[0]?.engine?.batteryType || "",
//                         second: vehicles[1]?.engine?.batteryType || "",
//                         third: vehicles[2]?.engine?.batteryType || "",
//                     },
//                     {
//                         type: "Battery Capacity (Electrical)",
//                         first: vehicles[0]?.engine?.batteryCapacity || "",
//                         second: vehicles[1]?.engine?.batteryCapacity || "",
//                         third: vehicles[2]?.engine?.batteryCapacity || "",
//                     },
//                     {
//                         type: "Charging time (Electrical)",
//                         first: vehicles[0]?.engine?.chargingTime || "",
//                         second: vehicles[1]?.engine?.chargingTime || "",
//                         third: vehicles[2]?.engine?.chargingTime || "",
//                     },
//                     {
//                         type: "Range (Electrical)",
//                         first: vehicles[0]?.engine?.range || "",
//                         second: vehicles[1]?.engine?.range || "",
//                         third: vehicles[2]?.engine?.range || "",
//                     },
//                     {
//                         type: "Valve Mechanism",
//                         first: vehicles[0]?.engine?.valveMechanism || "",
//                         second: vehicles[1]?.engine?.valveMechanism || "",
//                         third: vehicles[2]?.engine?.valveMechanism || "",
//                     },
//                     // Transmission Section
//                     {
//                         title: "Transmission",
//                         overviewTableData: [
//                             {
//                                 featureName: "Transmission",
//                                 type: "icon",
//                                 iconURL: "/compare/transmission.svg",
//                             },
//                             {
//                                 type: "Transmission Type",
//                                 first: vehicles[0]?.transmission?.type || "-",
//                                 second: vehicles[1]?.transmission?.type || "-",
//                                 third: vehicles[2]?.transmission?.type || "-",
//                             },
//                             {
//                                 type: "CVT",
//                                 first: vehicles[0]?.transmission?.cvt ? greenTick : "-",
//                                 second: vehicles[1]?.transmission?.cvt ? greenTick : "-",
//                                 third: vehicles[2]?.transmission?.cvt ? greenTick : "-",
//                             },
//                             {
//                                 type: "Gearbox",
//                                 first: vehicles[0]?.transmission?.gearbox || "-",
//                                 second: vehicles[1]?.transmission?.gearbox || "-",
//                                 third: vehicles[2]?.transmission?.gearbox || "-",
//                             },
//                         ],
//                     },
//                 ],
//             },
//             // Transmission Section
//             {
//                 title: "Transmission",
//                 overviewTableData: [
//                     {
//                         featureName: "Transmission",
//                         type: "icon",
//                         iconURL: "/compare/transmission.svg",
//                     },
//                     {
//                         type: "Transmission Type",
//                         first: vehicles[0]?.transmission?.type || "-",
//                         second: vehicles[1]?.transmission?.type || "-",
//                         third: vehicles[2]?.transmission?.type || "-",
//                     },
//                     {
//                         type: "CVT",
//                         first: vehicles[0]?.transmission?.cvt ? greenTick : "-",
//                         second: vehicles[1]?.transmission?.cvt ? greenTick : "-",
//                         third: vehicles[2]?.transmission?.cvt ? greenTick : "-",
//                     },
//                     {
//                         type: "Gearbox",
//                         first: vehicles[0]?.transmission?.gearbox || "-",
//                         second: vehicles[1]?.transmission?.gearbox || "-",
//                         third: vehicles[2]?.transmission?.gearbox || "-",
//                     },
//                 ],
//             },
//             // Suspension, Steering & Brakes Section
//             {
//                 title: "Suspension, Steering & Brakes",
//                 overviewTableData: [
//                     {
//                         featureName: "Suspension, Steering & Brakes",
//                         type: "icon",
//                         iconURL: "/compare/suspension.svg",
//                     },
//                     {
//                         type: "Steering Type",
//                         first: vehicles[0]?.suspensionSteeringBrakes?.steeringType || "",
//                         second: vehicles[1]?.suspensionSteeringBrakes?.steeringType || "",
//                         third: vehicles[2]?.suspensionSteeringBrakes?.steeringType || "",
//                     },
//                     {
//                         type: "Power Assisted",
//                         first: vehicles[0]?.suspensionSteeringBrakes?.powerAssisted || "",
//                         second: vehicles[1]?.suspensionSteeringBrakes?.powerAssisted || "",
//                         third: vehicles[2]?.suspensionSteeringBrakes?.powerAssisted || "",
//                     },
//                     {
//                         type: "Minimum Turning Radius",
//                         first: vehicles[0]?.suspensionSteeringBrakes?.minimumTurningRadius || "",
//                         second: vehicles[1]?.suspensionSteeringBrakes?.minimumTurningRadius || "",
//                         third: vehicles[2]?.suspensionSteeringBrakes?.minimumTurningRadius || "",
//                     },
//                     {
//                         type: "Front Brakes",
//                         first: vehicles[0]?.suspensionSteeringBrakes?.frontBrakes || "",
//                         second: vehicles[1]?.suspensionSteeringBrakes?.frontBrakes || "",
//                         third: vehicles[2]?.suspensionSteeringBrakes?.frontBrakes || "",
//                     },
//                     {
//                         type: "Rear Brakes",
//                         first: vehicles[0]?.suspensionSteeringBrakes?.rearBrakes || "",
//                         second: vehicles[1]?.suspensionSteeringBrakes?.rearBrakes || "",
//                         third: vehicles[2]?.suspensionSteeringBrakes?.rearBrakes || "",
//                     },
//                 ],
//             },
//             // Wheels & Tyres Section
//             {
//                 title: "Wheels & Tyres",
//                 overviewTableData: [
//                     {
//                         featureName: "Wheels & Tyres",
//                         type: "icon",
//                         iconURL: "/compare/wheels.svg",
//                     },
//                     {
//                         type: "Wheel Type",
//                         first: vehicles[0]?.wheelsAndTyres?.wheelType || "",
//                         second: vehicles[1]?.wheelsAndTyres?.wheelType || "",
//                         third: vehicles[2]?.wheelsAndTyres?.wheelType || "",
//                     },
//                     {
//                         type: "Wheel Size",
//                         first: vehicles[0]?.wheelsAndTyres?.wheelSize || "",
//                         second: vehicles[1]?.wheelsAndTyres?.wheelSize || "",
//                         third: vehicles[2]?.wheelsAndTyres?.wheelSize || "",
//                     },
//                     {
//                         type: "PCD",
//                         first: vehicles[0]?.wheelsAndTyres?.pcd || "-",
//                         second: vehicles[1]?.wheelsAndTyres?.pcd || "-",
//                         third: vehicles[2]?.wheelsAndTyres?.pcd || "-",
//                     },
//                     {
//                         type: "Tyre Size",
//                         first: vehicles[0]?.wheelsAndTyres?.tyreSize || "",
//                         second: vehicles[1]?.wheelsAndTyres?.tyreSize || "",
//                         third: vehicles[2]?.wheelsAndTyres?.tyreSize || "",
//                     },
//                     {
//                         type: "Spare Tyre",
//                         first: vehicles[0]?.wheelsAndTyres?.spareTyre ? greenTick : "-",
//                         second: vehicles[1]?.wheelsAndTyres?.spareTyre ? greenTick : "-",
//                         third: vehicles[2]?.wheelsAndTyres?.spareTyre ? greenTick : "-",
//                     },
//                     {
//                         type: "Spare Tyre Size",
//                         first: vehicles[0]?.wheelsAndTyres?.spareTyreSize || "-",
//                         second: vehicles[1]?.wheelsAndTyres?.spareTyreSize || "-",
//                         third: vehicles[2]?.wheelsAndTyres?.spareTyreSize || "-",
//                     },
//                 ],
//             },
//             // Fuel Consumptions Section
//             {
//                 title: "Fuel Consumptions",
//                 overviewTableData: [
//                     {
//                         featureName: "Fuel Consumptions",
//                         type: "icon",
//                         iconURL: "/compare/fuel.svg",
//                     },
//                     {
//                         type: "Mileage City",
//                         first: vehicles[0]?.fuelConsumption?.mileageCity || "",
//                         second: vehicles[1]?.fuelConsumption?.mileageCity || "",
//                         third: vehicles[2]?.fuelConsumption?.mileageCity || "",
//                     },
//                     {
//                         type: "Mileage Highway",
//                         first: vehicles[0]?.fuelConsumption?.mileageHighway || "",
//                         second: vehicles[1]?.fuelConsumption?.mileageHighway || "",
//                         third: vehicles[2]?.fuelConsumption?.mileageHighway || "",
//                     },
//                     {
//                         type: "Fuel Tank Capacity",
//                         first: vehicles[0]?.fuelConsumption?.tankCapacity ? `${vehicles[0].fuelConsumption.tankCapacity} L` : "",
//                         second: vehicles[1]?.fuelConsumption?.tankCapacity ? `${vehicles[1].fuelConsumption.tankCapacity} L` : "",
//                         third: vehicles[2]?.fuelConsumption?.tankCapacity ? `${vehicles[2].fuelConsumption.tankCapacity} L` : "",
//                     },
//                 ],
//             },
//             // Safety Section
//             {
//                 title: "Safety",
//                 overviewTableData: [
//                     {
//                         featureName: "Safety",
//                         type: "icon",
//                         iconURL: "/compare/safety.svg",
//                     },
//                     {
//                         type: "No. of Airbags",
//                         first: vehicles[0]?.safety?.airbags || "",
//                         second: vehicles[1]?.safety?.airbags || "",
//                         third: vehicles[2]?.safety?.airbags || "",
//                     },
//                     {
//                         type: "No. of Seat Belts",
//                         first: vehicles[0]?.safety?.seatBelts || "",
//                         second: vehicles[1]?.safety?.seatBelts || "",
//                         third: vehicles[2]?.safety?.seatBelts || "",
//                     },
//                     {
//                         type: "Immobilizer",
//                         first: vehicles[0]?.safety?.immobilizer ? greenTick : "-",
//                         second: vehicles[1]?.safety?.immobilizer ? greenTick : "-",
//                         third: vehicles[2]?.safety?.immobilizer ? greenTick : "-",
//                     },
//                     {
//                         type: "Child Lock",
//                         first: vehicles[0]?.safety?.childLock ? greenTick : "-",
//                         second: vehicles[1]?.safety?.childLock ? greenTick : "-",
//                         third: vehicles[2]?.safety?.childLock ? greenTick : "-",
//                     },
//                     {
//                         type: "ISOFIX Child Seat Anchors",
//                         first: vehicles[0]?.safety?.isofixAnchors ? greenTick : "-",
//                         second: vehicles[1]?.safety?.isofixAnchors ? greenTick : "-",
//                         third: vehicles[2]?.safety?.isofixAnchors ? greenTick : "-",
//                     },
//                     {
//                         type: "Anti-Lock Braking System (ABS)",
//                         first: vehicles[0]?.safety?.abs ? greenTick : "-",
//                         second: vehicles[1]?.safety?.abs ? greenTick : "-",
//                         third: vehicles[2]?.safety?.abs ? greenTick : "-",
//                     },
//                     {
//                         type: "Down Hill Assist Control",
//                         first: vehicles[0]?.safety?.downHillAssist ? greenTick : "-",
//                         second: vehicles[1]?.safety?.downHillAssist ? greenTick : "-",
//                         third: vehicles[2]?.safety?.downHillAssist ? greenTick : "-",
//                     },
//                     {
//                         type: "Start Hill Start Assist Control",
//                         first: vehicles[0]?.safety?.hillAssist ? greenTick : "-",
//                         second: vehicles[1]?.safety?.hillAssist ? greenTick : "-",
//                         third: vehicles[2]?.safety?.hillAssist ? greenTick : "-",
//                     },
//                     {
//                         type: "Traction Control",
//                         first: vehicles[0]?.safety?.tractionControl ? greenTick : "-",
//                         second: vehicles[1]?.safety?.tractionControl ? greenTick : "-",
//                         third: vehicles[2]?.safety?.tractionControl ? greenTick : "-",
//                     },
//                     {
//                         type: "Vehicle Stability Control",
//                         first: vehicles[0]?.safety?.vehicleStabilityControl ? greenTick : "-",
//                         second: vehicles[1]?.safety?.vehicleStabilityControl ? greenTick : "-",
//                         third: vehicles[2]?.safety?.vehicleStabilityControl ? greenTick : "-",
//                     },
//                 ],
//             },
//             // Exterior Section
//             {
//                 title: "Exterior",
//                 overviewTableData: [
//                     {
//                         featureName: "Exterior",
//                         type: "icon",
//                         iconURL: "/compare/exterior.svg",
//                     },
//                     {
//                         type: "Alloy Wheels",
//                         first: vehicles[0]?.exterior?.alloyWheels ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.alloyWheels ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.alloyWheels ? greenTick : "-",
//                     },
//                     {
//                         type: "Colored Outside Door Handles",
//                         first: vehicles[0]?.exterior?.coloredOutsideDoorHandles ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.coloredOutsideDoorHandles ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.coloredOutsideDoorHandles ? greenTick : "-",
//                     },
//                     {
//                         type: "Side Mirrors with Indicators",
//                         first: vehicles[0]?.exterior?.sideMirrorsWithIndicators ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.sideMirrorsWithIndicators ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.sideMirrorsWithIndicators ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Spoiler",
//                         first: vehicles[0]?.exterior?.rearSpoiler ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.rearSpoiler ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.rearSpoiler ? greenTick : "-",
//                     },
//                     {
//                         type: "Adjustable Headlights",
//                         first: vehicles[0]?.exterior?.adjustableHeadlights ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.adjustableHeadlights ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.adjustableHeadlights ? greenTick : "-",
//                     },
//                     {
//                         type: "Fog Lights",
//                         first: vehicles[0]?.exterior?.fogLights ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.fogLights ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.fogLights ? greenTick : "-",
//                     },
//                     {
//                         type: "Sun Roof",
//                         first: vehicles[0]?.exterior?.sunRoof ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.sunRoof ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.sunRoof ? greenTick : "-",
//                     },
//                     {
//                         type: "Moon Roof",
//                         first: vehicles[0]?.exterior?.moonRoof ? greenTick : "-",
//                         second: vehicles[1]?.exterior?.moonRoof ? greenTick : "-",
//                         third: vehicles[2]?.exterior?.moonRoof ? greenTick : "-",
//                     },
//                     {
//                         type: "Available Colors",
//                         first: vehicles[0]?.exterior?.colorsAvailable?.length
//                             ? vehicles[0].exterior.colorsAvailable.map((color, index) => (
//                                 <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
//                             ))
//                             : "-",
//                         second: vehicles[1]?.exterior?.colorsAvailable?.length
//                             ? vehicles[1].exterior.colorsAvailable.map((color, index) => (
//                                 <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
//                             ))
//                             : "-",
//                         third: vehicles[2]?.exterior?.colorsAvailable?.length
//                             ? vehicles[2].exterior.colorsAvailable.map((color, index) => (
//                                 <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
//                             ))
//                             : "-",
//                     },
//                 ],
//             },
//             // Entertainment & Communications Section
//             {
//                 title: "Entertainment & Communications",
//                 overviewTableData: [
//                     {
//                         featureName: "Entertainment & Communications",
//                         type: "icon",
//                         iconURL: "/compare/communication.svg",
//                     },
//                     {
//                         type: "Tachometer",
//                         first: vehicles[0]?.entertainment?.tachometer ? greenTick : "-",
//                         second: vehicles[1]?.entertainment?.tachometer ? greenTick : "-",
//                         third: vehicles[2]?.entertainment?.tachometer ? greenTick : "-",
//                     },
//                     {
//                         type: "Multi Info",
//                         first: vehicles[0]?.entertainment?.multiInfo ? greenTick : "-",
//                         second: vehicles[1]?.entertainment?.multiInfo ? greenTick : "-",
//                         third: vehicles[2]?.entertainment?.multiInfo ? greenTick : "-",
//                     },
//                     {
//                         type: "CD DVD Player",
//                         first: vehicles[0]?.entertainment?.cdDvdPlayer ? greenTick : "-",
//                         second: vehicles[1]?.entertainment?.cdDvdPlayer ? greenTick : "-",
//                         third: vehicles[2]?.entertainment?.cdDvdPlayer ? greenTick : "-",
//                     },
//                     {
//                         type: "USB & Auxiliary Cable",
//                         first: vehicles[0]?.entertainment?.usbAndAux ? greenTick : "-",
//                         second: vehicles[1]?.entertainment?.usbAndAux ? greenTick : "-",
//                         third: vehicles[2]?.entertainment?.usbAndAux ? greenTick : "-",
//                     },
//                     {
//                         type: "Display Size",
//                         first: vehicles[0]?.entertainment?.displaySize ? `${vehicles[0].entertainment.displaySize}` : "-",
//                         second: vehicles[1]?.entertainment?.displaySize ? `${vehicles[1].entertainment.displaySize}` : "-",
//                         third: vehicles[2]?.entertainment?.displaySize ? `${vehicles[2].entertainment.displaySize}` : "-",
//                     },
//                     {
//                         type: "Front Speakers",
//                         first: vehicles[0]?.entertainment?.frontSpeakers ? greenTick : "-",
//                         second: vehicles[1]?.entertainment?.frontSpeakers ? greenTick : "-",
//                         third: vehicles[2]?.entertainment?.frontSpeakers ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Seat Entertainment",
//                         first: vehicles[0]?.entertainment?.rearSeatEntertainment ? greenTick : "-",
//                         second: vehicles[1]?.entertainment?.rearSeatEntertainment ? greenTick : "-",
//                         third: vehicles[2]?.entertainment?.rearSeatEntertainment ? greenTick : "-",
//                     },
//                 ],
//             },
//             //   "Comfort & Convenience",
//             {
//                 title: "Comfort & Convenience",
//                 overviewTableData: [
//                     {
//                         featureName: "Comfort & Convenience",
//                         type: "icon",
//                         iconURL: "/compare/comfort.svg",
//                     },
//                     {
//                         type: "AC",
//                         first: vehicles[0]?.comfort?.ac ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.ac ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.ac ? greenTick : "-",
//                     },
//                     {
//                         type: "Climate Control",
//                         first: vehicles[0]?.comfort?.climateControl ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.climateControl ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.climateControl ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear AC Vents",
//                         first: vehicles[0]?.comfort?.rearAcVents ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.rearAcVents ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.rearAcVents ? greenTick : "-",
//                     },
//                     {
//                         type: "Heater",
//                         first: vehicles[0]?.comfort?.heater ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.heater ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.heater ? greenTick : "-",
//                     },
//                     {
//                         type: "Heated Seats",
//                         first: vehicles[0]?.comfort?.heatedSeats ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.heatedSeats ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.heatedSeats ? greenTick : "-",
//                     },
//                     {
//                         type: "Defogger",
//                         first: vehicles[0]?.comfort?.defogger ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.defogger ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.defogger ? greenTick : "-",
//                     },
//                     {
//                         type: "Cool Box",
//                         first: vehicles[0]?.comfort?.coolBox ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.coolBox ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.coolBox ? greenTick : "-",
//                     },
//                     {
//                         type: "Navigation",
//                         first: vehicles[0]?.comfort?.navigation ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.navigation ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.navigation ? greenTick : "-",
//                     },
//                     {
//                         type: "Optional Navigation",
//                         first: vehicles[0]?.comfort?.optionalNavigation ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.optionalNavigation ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.optionalNavigation ? greenTick : "-",
//                     },
//                     {
//                         type: "Front Camera",
//                         first: vehicles[0]?.comfort?.frontCamera ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.frontCamera ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.frontCamera ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Camera",
//                         first: vehicles[0]?.comfort?.rearCamera ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.rearCamera ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.rearCamera ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Central Control",
//                         first: vehicles[0]?.comfort?.rearCentralControl ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.rearCentralControl ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.rearCentralControl ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Folding Seat",
//                         first: vehicles[0]?.comfort?.rearFoldingSeat ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.rearFoldingSeat ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.rearFoldingSeat ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Headrest",
//                         first: vehicles[0]?.comfort?.rearHeadrest ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.rearHeadrest ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.rearHeadrest ? greenTick : "-",
//                     },
//                     {
//                         type: "Rear Wiper",
//                         first: vehicles[0]?.comfort?.rearWiper ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.rearWiper ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.rearWiper ? greenTick : "-",
//                     },
//                     {
//                         type: "Seat Material Type",
//                         first: vehicles[0]?.comfort?.seatMaterialType || "-",
//                         second: vehicles[1]?.comfort?.seatMaterialType || "-",
//                         third: vehicles[2]?.comfort?.seatMaterialType || "-",
//                     },
//                     {
//                         type: "Steering Adjustment",
//                         first: vehicles[0]?.comfort?.steeringAdjustment ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.steeringAdjustment ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.steeringAdjustment ? greenTick : "-",
//                     },
//                     {
//                         type: "Steering Switches",
//                         first: vehicles[0]?.comfort?.steeringSwitches ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.steeringSwitches ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.steeringSwitches ? greenTick : "-",
//                     },
//                     {
//                         type: "Cruise Control",
//                         first: vehicles[0]?.comfort?.cruiseControl ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.cruiseControl ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.cruiseControl ? greenTick : "-",
//                     },
//                     {
//                         type: "Driving Modes",
//                         first: vehicles[0]?.comfort?.drivingModes ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.drivingModes ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.drivingModes ? greenTick : "-",
//                     },
//                     {
//                         type: "Key Type",
//                         first: vehicles[0]?.comfort?.keyType || "-",
//                         second: vehicles[1]?.comfort?.keyType || "-",
//                         third: vehicles[2]?.comfort?.keyType || "-",
//                     },
//                     {
//                         type: "Keyless Entry",
//                         first: vehicles[0]?.comfort?.keylessEntry ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.keylessEntry ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.keylessEntry ? greenTick : "-",
//                     },
//                     {
//                         type: "Push Start",
//                         first: vehicles[0]?.comfort?.pushStart ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.pushStart ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.pushStart ? greenTick : "-",
//                     },
//                     {
//                         type: "Central Locking",
//                         first: vehicles[0]?.comfort?.centralLocking ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.centralLocking ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.centralLocking ? greenTick : "-",
//                     },
//                     {
//                         type: "Power Door Locks",
//                         first: vehicles[0]?.comfort?.powerDoorLocks ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.powerDoorLocks ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.powerDoorLocks ? greenTick : "-",
//                     },
//                     {
//                         type: "Power Steering",
//                         first: vehicles[0]?.comfort?.powerSteering ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.powerSteering ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.powerSteering ? greenTick : "-",
//                     },
//                     {
//                         type: "Power Windows",
//                         first: vehicles[0]?.comfort?.powerWindows ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.powerWindows ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.powerWindows ? greenTick : "-",
//                     },
//                     {
//                         type: "Power Mirrors",
//                         first: vehicles[0]?.comfort?.powerMirrors ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.powerMirrors ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.powerMirrors ? greenTick : "-",
//                     },
//                     {
//                         type: "Cup Holders",
//                         first: vehicles[0]?.comfort?.cupHolders ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.cupHolders ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.cupHolders ? greenTick : "-",
//                     },
//                     {
//                         type: "Arm Rest",
//                         first: vehicles[0]?.comfort?.armRest ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.armRest ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.armRest ? greenTick : "-",
//                     },
//                     {
//                         type: "Handbrake",
//                         first: vehicles[0]?.comfort?.handbrake || "-",
//                         second: vehicles[1]?.comfort?.handbrake || "-",
//                         third: vehicles[2]?.comfort?.handbrake || "-",
//                     },
//                     {
//                         type: "Interior Lighting",
//                         first: vehicles[0]?.comfort?.interiorLighting ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.interiorLighting ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.interiorLighting ? greenTick : "-",
//                     },
//                     {
//                         type: "Front Power Outlet",
//                         first: vehicles[0]?.comfort?.frontPowerOutlet ? greenTick : "-",
//                         second: vehicles[1]?.comfort?.frontPowerOutlet ? greenTick : "-",
//                         third: vehicles[2]?.comfort?.frontPowerOutlet ? greenTick : "-",
//                     },
//                 ],
//             },
//         ],
//     };
// };


// <---------Without hide feature------>

// import { Button, Flex, Rating, Text } from "@mantine/core";
// import { GetColor } from '@/constants/colors';

// // SVG Component for Green Tick
// const GreenTick = () => (
//     <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M5.55097 10.9466L0.586967 6.20057C0.516364 6.13444 0.460084 6.05453 0.421609 5.96577C0.383133 5.87702 0.363281 5.78131 0.363281 5.68458C0.363281 5.58784 0.383133 5.49213 0.421609 5.40338C0.460084 5.31462 0.516364 5.23471 0.586967 5.16858L1.66297 4.13958C1.80924 4.00226 2.00234 3.92583 2.20297 3.92583C2.4036 3.92583 2.59669 4.00226 2.74297 4.13958L6.08697 7.33457L13.25 0.491575C13.3962 0.354262 13.5893 0.277832 13.79 0.277832C13.9906 0.277832 14.1837 0.354262 14.33 0.491575L15.41 1.52357C15.4806 1.5897 15.5368 1.66962 15.5753 1.75838C15.6138 1.84713 15.6337 1.94284 15.6337 2.03958C15.6337 2.13631 15.6138 2.23202 15.5753 2.32077C15.5368 2.40953 15.4806 2.48944 15.41 2.55557L6.63097 10.9466C6.48469 11.0839 6.2916 11.1603 6.09097 11.1603C5.89034 11.1603 5.69724 11.0839 5.55097 10.9466Z" fill="#1BC744" />
//     </svg>
// );

// // Helper function to safely access nested properties
// const getNested = (obj, path, defaultValue = "") => {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
// };

// // Helper function to render green tick or fallback
// const renderTick = (condition) => condition ? <GreenTick /> : "-";

// // Helper function to render buttons for brochure
// const renderButton = (condition, href, label, color) => condition ? (
//     <Button variant="outline" fw={500} color={color} component="a" href={href}>
//         {label}
//     </Button>
// ) : "-";

// // Helper function to render color buttons
// const renderColors = (colors) => colors?.length
//     ? colors.map((color, index) => (
//         <Button key={index} size="xs" radius="xl" style={{ backgroundColor: GetColor(color) }} />
//     ))
//     : "-";

// // Helper function to render user rating
// const renderUserRating = (vehicle, averageRating, reviewCount) => {
//     // Check if the vehicle object is empty (i.e., vehicle does not exist)
//     const isVehicleEmpty = !vehicle || Object.keys(vehicle).length === 0;

//     if (isVehicleEmpty) {
//         // Vehicle does not exist; return an empty string
//         return "";
//     }
//     return (
//         <Flex align="center" justify="center" gap="xs">
//             <Rating
//                 value={averageRating ? parseFloat(averageRating) : 0}
//                 fractions={2}
//                 size="sm"
//                 readOnly
//             />
//             <Text fw={600}>
//                 ({averageRating ? parseFloat(averageRating) : 0})

//             </Text>
//         </Flex>
//     );

//     // Vehicle exists but has no average rating; display a hyphen
//     return "-";
// };


// // Define sections and their respective fields
// const sections = [
//     // Overview Section
//     {
//         title: "Overview",
//         isSwitchable: true,
//         fields: [
//             {
//                 type: "Size",
//                 paths: ["dimensions.overallLength", "dimensions.overallWidth", "dimensions.overallHeight"],
//                 formatter: (vals) => (vals.every(val => val)) ? `${vals[0]} L x ${vals[1]} W x ${vals[2]} H` : "",
//             },
//             {
//                 type: "Mileage",
//                 paths: ["mileage.city", "mileage.highway"],
//                 formatter: (vals) => (vals.every(val => val)) ? `${vals[0]} - ${vals[1]} Km/l` : "",
//             },
//             {
//                 type: "Engine",
//                 paths: ["engine.displacement"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]} cc` : "",
//             },
//             {
//                 type: "No. of Airbags",
//                 paths: ["safety.airbags"],
//                 formatter: (vals) => (vals[0] !== "") ? vals[0] : "",
//             },
//             {
//                 type: "User Rating",
//                 render: (vehicle) =>
//                     renderUserRating(
//                         vehicle,
//                         getNested(vehicle, "averageRating"),
//                         getNested(vehicle, "reviewCount")
//                     ),
//             },
//             {
//                 type: "Transmission",
//                 paths: ["transmission.type"],
//             },
//             {
//                 type: "Anti-lock Braking System",
//                 paths: ["safety.abs"],
//                 formatter: (vals) => (vals[0] !== "") ? (vals[0] ? "Yes" : "No") : "",
//             },
//             {
//                 type: "Trunk Space",
//                 paths: ["dimensions.bootSpace"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]} L` : "",
//             },
//             {
//                 type: "Brochure",
//                 render: (vehicle) => renderButton(
//                     getNested(vehicle, "brochureLink"),
//                     vehicle.brochureLink,
//                     "Download Brochure",
//                     "#E90808"
//                 ),
//             },
//         ],
//     },

//     // Key Features & Specs Section
//     {
//         title: "Key Features & Specs",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Dimensions",
//                 type: "icon",
//                 iconURL: "/compare/dimension.svg",
//             },
//             {
//                 type: "Overall Length",
//                 paths: ["dimensions.overallLength"],
//             },
//             {
//                 type: "Overall Width",
//                 paths: ["dimensions.overallWidth"],
//             },
//             {
//                 type: "Overall Height",
//                 paths: ["dimensions.overallHeight"],
//             },
//             {
//                 type: "Wheel Base",
//                 paths: ["dimensions.wheelBase"],
//             },
//             {
//                 type: "Ground Clearance",
//                 paths: ["dimensions.groundClearance"],
//             },
//             {
//                 type: "Kerb Weight",
//                 paths: ["dimensions.kerbWeight"],
//             },
//             {
//                 type: "Boot Space",
//                 paths: ["dimensions.bootSpace"],
//             },
//             {
//                 type: "Seating Capacity",
//                 paths: ["dimensions.seatingCapacity"],
//             },
//             {
//                 type: "No. of Doors",
//                 paths: ["dimensions.doors"],
//             },
//         ],
//     },

//     // Engine & Performance Section
//     {
//         // title: "Engine & Performance",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Engine & Performance",
//                 type: "icon",
//                 iconURL: "/compare/engine-performace.svg",
//             },
//             {
//                 type: "Engine Type",
//                 paths: ["engine.type"],
//             },
//             {
//                 type: "Displacement",
//                 paths: ["engine.displacement"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]} cc` : "",
//             },
//             {
//                 type: "Horse Power",
//                 paths: ["engine.horsepower"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
//             },
//             {
//                 type: "Torque",
//                 paths: ["engine.torque"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]}` : "-",
//             },
//             {
//                 type: "Fuel System",
//                 paths: ["engine.fuelSystem"],
//             },
//             {
//                 type: "Max Speed",
//                 paths: ["engine.maxSpeed"],
//             },
//             {
//                 type: "No. of Cylinders",
//                 paths: ["engine.cylinders"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]}` : "-",
//             },
//             {
//                 type: "Cylinder Configuration",
//                 paths: ["engine.cylinderConfiguration"],
//             },
//             {
//                 type: "Compression Ratio",
//                 paths: ["engine.compressionRatio"],
//             },
//             {
//                 type: "Valves per Cylinder",
//                 paths: ["engine.valvesPerCylinder"],
//             },
//             {
//                 type: "Battery Type (Electrical)",
//                 paths: ["engine.batteryType"],
//             },
//             {
//                 type: "Battery Capacity (Electrical)",
//                 paths: ["engine.batteryCapacity"],
//             },
//             {
//                 type: "Charging time (Electrical)",
//                 paths: ["engine.chargingTime"],
//             },
//             {
//                 type: "Range (Electrical)",
//                 paths: ["engine.range"],
//             },
//             {
//                 type: "Valve Mechanism",
//                 paths: ["engine.valveMechanism"],
//             },
//         ],
//     },
//     // Transmission
//     {
//         // title: "Transmission",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Transmission",
//                 type: "icon",
//                 iconURL: "/compare/transmission.svg",
//             },
//             {
//                 type: "Transmission Type",
//                 paths: ["transmission.type"],
//             },
//             {
//                 type: "CVT",
//                 paths: ["transmission.cvt"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "transmission.cvt")),
//             },
//             {
//                 type: "Gearbox",
//                 paths: ["transmission.gearbox"],
//             },
//         ]
//     },
//     // Suspension, Steering & Brakes Section
//     {
//         // title: "Suspension, Steering & Brakes",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Suspension, Steering & Brakes",
//                 type: "icon",
//                 iconURL: "/compare/suspension.svg",
//             },
//             {
//                 type: "Steering Type",
//                 paths: ["suspensionSteeringBrakes.steeringType"],
//             },
//             {
//                 type: "Power Assisted",
//                 paths: ["suspensionSteeringBrakes.powerAssisted"],
//             },
//             {
//                 type: "Minimum Turning Radius",
//                 paths: ["suspensionSteeringBrakes.minimumTurningRadius"],
//             },
//             {
//                 type: "Front Brakes",
//                 paths: ["suspensionSteeringBrakes.frontBrakes"],
//             },
//             {
//                 type: "Rear Brakes",
//                 paths: ["suspensionSteeringBrakes.rearBrakes"],
//             },
//         ],
//     },

//     // Wheels & Tyres Section
//     {
//         // title: "Wheels & Tyres",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Wheels & Tyres",
//                 type: "icon",
//                 iconURL: "/compare/wheels.svg",
//             },
//             {
//                 type: "Wheel Type",
//                 paths: ["wheelsAndTyres.wheelType"],
//             },
//             {
//                 type: "Wheel Size",
//                 paths: ["wheelsAndTyres.wheelSize"],
//             },
//             {
//                 type: "PCD",
//                 paths: ["wheelsAndTyres.pcd"],
//                 formatter: (vals) => (vals[0]) ? vals[0] : "-",
//             },
//             {
//                 type: "Tyre Size",
//                 paths: ["wheelsAndTyres.tyreSize"],
//             },
//             {
//                 type: "Spare Tyre",
//                 paths: ["wheelsAndTyres.spareTyre"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "wheelsAndTyres.spareTyre")),
//             },
//             {
//                 type: "Spare Tyre Size",
//                 paths: ["wheelsAndTyres.spareTyreSize"],
//                 formatter: (vals) => (vals[0]) ? vals[0] : "-",
//             },
//         ],
//     },

//     // Fuel Consumptions Section
//     {
//         // title: "Fuel Consumptions",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Fuel Consumptions",
//                 type: "icon",
//                 iconURL: "/compare/fuel.svg",
//             },
//             {
//                 type: "Mileage City",
//                 paths: ["fuelConsumption.mileageCity"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
//             },
//             {
//                 type: "Mileage Highway",
//                 paths: ["fuelConsumption.mileageHighway"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
//             },
//             {
//                 type: "Fuel Tank Capacity",
//                 paths: ["fuelConsumption.tankCapacity"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]} L` : "",
//             },
//         ],
//     },

//     // Safety Section
//     {
//         // title: "Safety",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Safety",
//                 type: "icon",
//                 iconURL: "/compare/safety.svg",
//             },
//             {
//                 type: "No. of Airbags",
//                 paths: ["safety.airbags"],
//                 formatter: (vals) => (vals[0] !== "") ? vals[0] : "",
//             },
//             {
//                 type: "No. of Seat Belts",
//                 paths: ["safety.seatBelts"],
//                 formatter: (vals) => (vals[0] !== "") ? vals[0] : "",
//             },
//             {
//                 type: "Immobilizer",
//                 paths: ["safety.immobilizer"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.immobilizer")),
//             },
//             {
//                 type: "Child Lock",
//                 paths: ["safety.childLock"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.childLock")),
//             },
//             {
//                 type: "ISOFIX Child Seat Anchors",
//                 paths: ["safety.isofixAnchors"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.isofixAnchors")),
//             },
//             {
//                 type: "Anti-Lock Braking System (ABS)",
//                 paths: ["safety.abs"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.abs")),
//             },
//             {
//                 type: "Down Hill Assist Control",
//                 paths: ["safety.downHillAssist"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.downHillAssist")),
//             },
//             {
//                 type: "Start Hill Start Assist Control",
//                 paths: ["safety.hillAssist"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.hillAssist")),
//             },
//             {
//                 type: "Traction Control",
//                 paths: ["safety.tractionControl"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.tractionControl")),
//             },
//             {
//                 type: "Vehicle Stability Control",
//                 paths: ["safety.vehicleStabilityControl"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "safety.vehicleStabilityControl")),
//             },
//         ],
//     },

//     // Exterior Section
//     {
//         // title: "Exterior",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Exterior",
//                 type: "icon",
//                 iconURL: "/compare/exterior.svg",
//             },
//             {
//                 type: "Alloy Wheels",
//                 paths: ["exterior.alloyWheels"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.alloyWheels")),
//             },
//             {
//                 type: "Colored Outside Door Handles",
//                 paths: ["exterior.coloredOutsideDoorHandles"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.coloredOutsideDoorHandles")),
//             },
//             {
//                 type: "Side Mirrors with Indicators",
//                 paths: ["exterior.sideMirrorsWithIndicators"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.sideMirrorsWithIndicators")),
//             },
//             {
//                 type: "Rear Spoiler",
//                 paths: ["exterior.rearSpoiler"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.rearSpoiler")),
//             },
//             {
//                 type: "Adjustable Headlights",
//                 paths: ["exterior.adjustableHeadlights"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.adjustableHeadlights")),
//             },
//             {
//                 type: "Fog Lights",
//                 paths: ["exterior.fogLights"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.fogLights")),
//             },
//             {
//                 type: "Sun Roof",
//                 paths: ["exterior.sunRoof"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.sunRoof")),
//             },
//             {
//                 type: "Moon Roof",
//                 paths: ["exterior.moonRoof"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "exterior.moonRoof")),
//             },
//             {
//                 type: "Available Colors",
//                 paths: ["exterior.colorsAvailable"],
//                 render: (vehicle) => renderColors(getNested(vehicle, "exterior.colorsAvailable")),
//             },
//         ],
//     },

//     // Entertainment & Communications Section
//     {
//         // title: "Entertainment & Communications",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Entertainment & Communications",
//                 type: "icon",
//                 iconURL: "/compare/communication.svg",
//             },
//             {
//                 type: "Tachometer",
//                 paths: ["entertainment.tachometer"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "entertainment.tachometer")),
//             },
//             {
//                 type: "Multi Info",
//                 paths: ["entertainment.multiInfo"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "entertainment.multiInfo")),
//             },
//             {
//                 type: "CD DVD Player",
//                 paths: ["entertainment.cdDvdPlayer"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "entertainment.cdDvdPlayer")),
//             },
//             {
//                 type: "USB & Auxiliary Cable",
//                 paths: ["entertainment.usbAndAux"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "entertainment.usbAndAux")),
//             },
//             {
//                 type: "Display Size",
//                 paths: ["entertainment.displaySize"],
//                 formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
//             },
//             {
//                 type: "Front Speakers",
//                 paths: ["entertainment.frontSpeakers"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "entertainment.frontSpeakers")),
//             },
//             {
//                 type: "Rear Seat Entertainment",
//                 paths: ["entertainment.rearSeatEntertainment"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "entertainment.rearSeatEntertainment")),
//             },
//         ],
//     },

//     // Comfort & Convenience Section
//     {
//         // title: "Comfort & Convenience",
//         isSwitchable: false,
//         fields: [
//             {
//                 featureName: "Comfort & Convenience",
//                 type: "icon",
//                 iconURL: "/compare/comfort.svg",
//             },
//             {
//                 type: "AC",
//                 paths: ["comfort.ac"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.ac")),
//             },
//             {
//                 type: "Climate Control",
//                 paths: ["comfort.climateControl"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.climateControl")),
//             },
//             {
//                 type: "Rear AC Vents",
//                 paths: ["comfort.rearAcVents"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearAcVents")),
//             },
//             {
//                 type: "Heater",
//                 paths: ["comfort.heater"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.heater")),
//             },
//             {
//                 type: "Heated Seats",
//                 paths: ["comfort.heatedSeats"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.heatedSeats")),
//             },
//             {
//                 type: "Defogger",
//                 paths: ["comfort.defogger"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.defogger")),
//             },
//             {
//                 type: "Cool Box",
//                 paths: ["comfort.coolBox"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.coolBox")),
//             },
//             {
//                 type: "Navigation",
//                 paths: ["comfort.navigation"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.navigation")),
//             },
//             {
//                 type: "Optional Navigation",
//                 paths: ["comfort.optionalNavigation"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.optionalNavigation")),
//             },
//             {
//                 type: "Front Camera",
//                 paths: ["comfort.frontCamera"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.frontCamera")),
//             },
//             {
//                 type: "Rear Camera",
//                 paths: ["comfort.rearCamera"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearCamera")),
//             },
//             {
//                 type: "Rear Central Control",
//                 paths: ["comfort.rearCentralControl"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearCentralControl")),
//             },
//             {
//                 type: "Rear Folding Seat",
//                 paths: ["comfort.rearFoldingSeat"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearFoldingSeat")),
//             },
//             {
//                 type: "Rear Headrest",
//                 paths: ["comfort.rearHeadrest"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearHeadrest")),
//             },
//             {
//                 type: "Rear Wiper",
//                 paths: ["comfort.rearWiper"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearWiper")),
//             },
//             {
//                 type: "Seat Material Type",
//                 paths: ["comfort.seatMaterialType"],
//                 formatter: (vals) => (vals[0]) ? vals[0] : "",
//             },
//             {
//                 type: "Steering Adjustment",
//                 paths: ["comfort.steeringAdjustment"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.steeringAdjustment")),
//             },
//             {
//                 type: "Steering Switches",
//                 paths: ["comfort.steeringSwitches"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.steeringSwitches")),
//             },
//             {
//                 type: "Cruise Control",
//                 paths: ["comfort.cruiseControl"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.cruiseControl")),
//             },
//             {
//                 type: "Driving Modes",
//                 paths: ["comfort.drivingModes"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.drivingModes")),
//             },
//             {
//                 type: "Key Type",
//                 paths: ["comfort.keyType"],
//                 formatter: (vals) => (vals[0]) ? vals[0] : "",
//             },
//             {
//                 type: "Keyless Entry",
//                 paths: ["comfort.keylessEntry"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.keylessEntry")),
//             },
//             {
//                 type: "Push Start",
//                 paths: ["comfort.pushStart"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.pushStart")),
//             },
//             {
//                 type: "Central Locking",
//                 paths: ["comfort.centralLocking"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.centralLocking")),
//             },
//             {
//                 type: "Power Door Locks",
//                 paths: ["comfort.powerDoorLocks"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerDoorLocks")),
//             },
//             {
//                 type: "Power Steering",
//                 paths: ["comfort.powerSteering"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerSteering")),
//             },
//             {
//                 type: "Power Windows",
//                 paths: ["comfort.powerWindows"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerWindows")),
//             },
//             {
//                 type: "Power Mirrors",
//                 paths: ["comfort.powerMirrors"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerMirrors")),
//             },
//             {
//                 type: "Cup Holders",
//                 paths: ["comfort.cupHolders"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.cupHolders")),
//             },
//             {
//                 type: "Arm Rest",
//                 paths: ["comfort.armRest"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.armRest")),
//             },
//             {
//                 type: "Handbrake",
//                 paths: ["comfort.handbrake"],
//                 formatter: (vals) => (vals[0]) ? vals[0] : "",
//             },
//             {
//                 type: "Interior Lighting",
//                 paths: ["comfort.interiorLighting"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.interiorLighting")),
//             },
//             {
//                 type: "Front Power Outlet",
//                 paths: ["comfort.frontPowerOutlet"],
//                 render: (vehicle) => renderTick(getNested(vehicle, "comfort.frontPowerOutlet")),
//             },
//         ],
//     },
// ];

// export const mapVehicleData = (vehicles = []) => {
//     if (!vehicles.length) {
//         return { comparisonData: [] };
//     }

//     // Destructure vehicles without default values to determine existence
//     const [vehicle1, vehicle2, vehicle3] = vehicles;

//     const comparisonData = sections.map((section) => {
//         const overviewTableData = section.fields.map((field) => {
//             // Handle icon fields
//             if (field.type === "icon") {
//                 return {
//                     featureName: field.featureName,
//                     type: field.type,
//                     iconURL: field.iconURL,
//                 };
//             }

//             // Handle featureName fields (like Transmission in Engine & Performance)
//             if (field.featureName && field.type === "icon") {
//                 return {
//                     featureName: field.featureName,
//                     type: field.type,
//                     iconURL: field.iconURL,
//                 };
//             }

//             // Function to render a field for a single vehicle
//             const renderSingleField = (vehicle) => {
//                 if (!vehicle) {
//                     // Vehicle does not exist
//                     return "";
//                 }

//                 if (field.render) {
//                     return field.render(vehicle);
//                 } else if (field.paths) {
//                     const values = field.paths.map((path) => getNested(vehicle, path, undefined));
//                     if (field.formatter) {
//                         return field.formatter(values);
//                     } else {
//                         // Check if all values are present
//                         const allValuesPresent = values.every(val => val !== undefined && val !== "");
//                         return allValuesPresent ? values.join(" / ") : "-";
//                     }
//                 } else {
//                     return "-";
//                 }
//             };

//             return {
//                 type: field.type,
//                 first: renderSingleField(vehicle1),
//                 second: renderSingleField(vehicle2),
//                 third: renderSingleField(vehicle3),
//             };
//         });

//         return {
//             title: section.title,
//             isSwitchable: section.isSwitchable,
//             overviewTableData,
//         };
//     });

//     return { comparisonData };
// };

// with hide fearture
import { Button, Flex, Rating, Text } from "@mantine/core";
import { GetColor } from '@/constants/colors';

// SVG Component for Green Tick
const GreenTick = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.55097 10.9466L0.586967 6.20057C0.516364 6.13444 0.460084 6.05453 0.421609 5.96577C0.383133 5.87702 0.363281 5.78131 0.363281 5.68458C0.363281 5.58784 0.383133 5.49213 0.421609 5.40338C0.460084 5.31462 0.516364 5.23471 0.586967 5.16858L1.66297 4.13958C1.80924 4.00226 2.00234 3.92583 2.20297 3.92583C2.4036 3.92583 2.59669 4.00226 2.74297 4.13958L6.08697 7.33457L13.25 0.491575C13.3962 0.354262 13.5893 0.277832 13.79 0.277832C13.9906 0.277832 14.1837 0.354262 14.33 0.491575L15.41 1.52357C15.4806 1.5897 15.5368 1.66962 15.5753 1.75838C15.6138 1.84713 15.6337 1.94284 15.6337 2.03958C15.6337 2.13631 15.6138 2.23202 15.5753 2.32077C15.5368 2.40953 15.4806 2.48944 15.41 2.55557L6.63097 10.9466C6.48469 11.0839 6.2916 11.1603 6.09097 11.1603C5.89034 11.1603 5.69724 11.0839 5.55097 10.9466Z" fill="#1BC744" />
    </svg>
);

// Helper function to safely access nested properties
const getNested = (obj, path, defaultValue = "") => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
};

// Helper function to render green tick or fallback
const renderTick = (condition) => condition ? <GreenTick /> : "-";

// Helper function to render buttons for brochure
// Helper function to render buttons for brochure
const renderButton = (condition, href, label, color) => condition ? (
    <Button 
        variant="outline" 
        fw={500} 
        color={color} 
        component="a" 
        href={href}
        target="_blank"  // This opens the link in a new tab
        rel="noopener noreferrer"  // Security best practice for target="_blank"
    >
        {label}
    </Button>
) : "-";


// Helper function to render color buttons
const renderColors = (colors) => colors?.length
    ? colors.map((color, index) => (
        <Button key={index} size="xs" radius="xl" style={{ backgroundColor: GetColor(color) }} />
    ))
    : "-";

// Helper function to render user rating
const renderUserRating = (vehicle, averageRating, reviewCount) => {
    // Check if the vehicle object is empty (i.e., vehicle does not exist)
    const isVehicleEmpty = !vehicle || Object.keys(vehicle).length === 0;

    if (isVehicleEmpty) {
        // Vehicle does not exist; return an empty string
        return "";
    }
    return (
        <Flex align="center" justify="center" gap="xs">
            <Rating
                value={averageRating ? parseFloat(averageRating) : 0}
                fractions={2}
                size="sm"
                readOnly
            />
            <Text fw={600}>
                ({averageRating ? parseFloat(averageRating) : 0})

            </Text>
        </Flex>
    );
};

// Define sections and their respective fields
const sections = [
    // Overview Section
    {
        title: "Overview",
        id: "overview",
        isSwitchable: true,
        fields: [
            {
                type: "Size",
                paths: ["dimensions.overallLength", "dimensions.overallWidth", "dimensions.overallHeight"],
                formatter: (vals) => (vals.every(val => val)) ? `${vals[0]} L x ${vals[1]} W x ${vals[2]} H` : "",
            },
            {
                type: "Mileage",
                paths: ["mileage.city", "mileage.highway"],
                formatter: (vals) => (vals.every(val => val)) ? `${vals[0]} - ${vals[1]} Km/l` : "",
            },
            {
                type: "Engine",
                paths: ["engine.displacement"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} cc` : "",
            },
            {
                type: "No. of Airbags",
                paths: ["safety.airbags"],
                formatter: (vals) => (vals[0] !== "") ? vals[0] : "",
            },
            {
                type: "User Rating",
                render: (vehicle) =>
                    renderUserRating(
                        vehicle,
                        getNested(vehicle, "averageRating"),
                        getNested(vehicle, "reviewCount")
                    ),
            },
            {
                type: "Transmission",
                paths: ["transmission.type"],
            },
            {
                type: "Anti-lock Braking System",
                paths: ["safety.abs"],
                formatter: (vals) => (vals[0] !== "") ? (vals[0] ? "Yes" : "No") : "",
            },
            {
                type: "Trunk Space",
                paths: ["dimensions.bootSpace"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} L` : "",
            },
            {
                type: "Brochure",
                render: (vehicle) => renderButton(
                    getNested(vehicle, "brochureLink"),
                    vehicle.brochureLink,
                    "Download Brochure",  // Changed from "" to "View"
                    "#E90808"
                ),
            },
        ],
    },

    // Key Features & Specs Section
    {
        title: "Key Features & Specs",
        id: "dimension",
        isSwitchable: false,
        fields: [
            {
                featureName: "Dimensions",
                id: "dimension",
                type: "icon",
                iconURL: "/compare/dimension.svg",
            },
            {
                type: "Overall Length",
                paths: ["dimensions.overallLength"],
            },
            {
                type: "Overall Width",
                paths: ["dimensions.overallWidth"],
            },
            {
                type: "Overall Height",
                paths: ["dimensions.overallHeight"],
            },
            {
                type: "Wheel Base",
                paths: ["dimensions.wheelBase"],
            },
            {
                type: "Ground Clearance",
                paths: ["dimensions.groundClearance"],
            },
            {
                type: "Kerb Weight",
                paths: ["dimensions.kerbWeight"],
            },
            {
                type: "Boot Space",
                paths: ["dimensions.bootSpace"],
            },
            {
                type: "Seating Capacity",
                paths: ["dimensions.seatingCapacity"],
            },
            {
                type: "No. of Doors",
                paths: ["dimensions.doors"],
            },
        ],
    },

    // Engine & Performance Section
    {
        id: "engine-performance",
        isSwitchable: false,
        fields: [
            {
                featureName: "Engine & Performance",
                id: "engine-performance",
                type: "icon",
                iconURL: "/compare/engine-performace.svg",
            },
            {
                type: "Engine Type",
                paths: ["engine.type"],
            },
            {
                type: "Displacement",
                paths: ["engine.displacement"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} cc` : "",
            },
            {
                type: "Horse Power",
                paths: ["engine.horsepower"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "Torque",
                paths: ["engine.torque"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "-",
            },
            {
                type: "Fuel System",
                paths: ["engine.fuelSystem"],
            },
            {
                type: "Max Speed",
                paths: ["engine.maxSpeed"],
            },
            {
                type: "No. of Cylinders",
                paths: ["engine.cylinders"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "-",
            },
            {
                type: "Cylinder Configuration",
                paths: ["engine.cylinderConfiguration"],
            },
            {
                type: "Compression Ratio",
                paths: ["engine.compressionRatio"],
            },
            {
                type: "Valves per Cylinder",
                paths: ["engine.valvesPerCylinder"],
            },
            {
                type: "Battery Type (Electrical)",
                paths: ["engine.batteryType"],
            },
            {
                type: "Battery Capacity (Electrical)",
                paths: ["engine.batteryCapacity"],
            },
            {
                type: "Charging time (Electrical)",
                paths: ["engine.chargingTime"],
            },
            {
                type: "Range (Electrical)",
                paths: ["engine.range"],
            },
            {
                type: "Valve Mechanism",
                paths: ["engine.valveMechanism"],
            },
        ],
    },

    // Transmission
    {
        id: "transmission",
        isSwitchable: false,
        fields: [
            {
                featureName: "Transmission",
                id: "transmission",
                type: "icon",
                iconURL: "/compare/transmission.svg",
            },
            {
                type: "Transmission Type",
                paths: ["transmission.type"],
            },
            {
                type: "CVT",
                paths: ["transmission.cvt"],
                render: (vehicle) => renderTick(getNested(vehicle, "transmission.cvt")),
            },
            {
                type: "Gearbox",
                paths: ["transmission.gearbox"],
            },
        ]
    },

    // Suspension, Steering & Brakes Section
    {
        id: "suspension-steering-brakes",
        isSwitchable: false,
        fields: [
            {
                featureName: "Suspension, Steering & Brakes",
                id: "suspension-steering-brakes",
                type: "icon",
                iconURL: "/compare/suspension.svg",
            },
            {
                type: "Steering Type",
                paths: ["suspensionSteeringBrakes.steeringType"],
            },
            {
                type: "Power Assisted",
                paths: ["suspensionSteeringBrakes.powerAssisted"],
            },
            {
                type: "Minimum Turning Radius",
                paths: ["suspensionSteeringBrakes.minimumTurningRadius"],
            },
            {
                type: "Front Brakes",
                paths: ["suspensionSteeringBrakes.frontBrakes"],
            },
            {
                type: "Rear Brakes",
                paths: ["suspensionSteeringBrakes.rearBrakes"],
            },
        ],
    },

    // Wheels & Tyres Section
    {
        id: "wheels-tyres",
        isSwitchable: false,
        fields: [
            {
                featureName: "Wheels & Tyres",
                id: "wheels-tyres",
                type: "icon",
                iconURL: "/compare/wheels.svg",
            },
            {
                type: "Wheel Type",
                paths: ["wheelsAndTyres.wheelType"],
            },
            {
                type: "Wheel Size",
                paths: ["wheelsAndTyres.wheelSize"],
            },
            {
                type: "PCD",
                paths: ["wheelsAndTyres.pcd"],
                formatter: (vals) => (vals[0]) ? vals[0] : "-",
            },
            {
                type: "Tyre Size",
                paths: ["wheelsAndTyres.tyreSize"],
            },
            {
                type: "Spare Tyre",
                paths: ["wheelsAndTyres.spareTyre"],
                render: (vehicle) => renderTick(getNested(vehicle, "wheelsAndTyres.spareTyre")),
            },
            {
                type: "Spare Tyre Size",
                paths: ["wheelsAndTyres.spareTyreSize"],
                formatter: (vals) => (vals[0]) ? vals[0] : "-",
            },
        ],
    },

    // Fuel Consumptions Section
    {
        id: "fuel-consumptions",
        isSwitchable: false,
        fields: [
            {
                featureName: "Fuel Consumptions",
                id: "fuel-consumptions",
                type: "icon",
                iconURL: "/compare/fuel.svg",
            },
            {
                type: "Mileage City",
                paths: ["fuelConsumption.mileageCity"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "Mileage Highway",
                paths: ["fuelConsumption.mileageHighway"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "Fuel Tank Capacity",
                paths: ["fuelConsumption.tankCapacity"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} L` : "",
            },
        ],
    },

    // Safety Section
    {
        id: "safety",
        isSwitchable: false,
        fields: [
            {
                featureName: "Safety",
                id: "safety",
                type: "icon",
                iconURL: "/compare/safety.svg",
            },
            {
                type: "No. of Airbags",
                paths: ["safety.airbags"],
                formatter: (vals) => (vals[0] !== "") ? vals[0] : "",
            },
            {
                type: "No. of Seat Belts",
                paths: ["safety.seatBelts"],
                formatter: (vals) => (vals[0] !== "") ? vals[0] : "",
            },
            {
                type: "Immobilizer",
                paths: ["safety.immobilizer"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.immobilizer")),
            },
            {
                type: "Child Lock",
                paths: ["safety.childLock"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.childLock")),
            },
            {
                type: "ISOFIX Child Seat Anchors",
                paths: ["safety.isofixAnchors"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.isofixAnchors")),
            },
            {
                type: "Anti-Lock Braking System (ABS)",
                paths: ["safety.abs"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.abs")),
            },
            {
                type: "Down Hill Assist Control",
                paths: ["safety.downHillAssist"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.downHillAssist")),
            },
            {
                type: "Hill Start Assist Control",
                paths: ["safety.hillAssist"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.hillAssist")),
            },
            {
                type: "Traction Control",
                paths: ["safety.tractionControl"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.tractionControl")),
            },
            {
                type: "Vehicle Stability Control",
                paths: ["safety.vehicleStabilityControl"],
                render: (vehicle) => renderTick(getNested(vehicle, "safety.vehicleStabilityControl")),
            },
        ],
    },

    // Exterior Section
    {
        id: "exterior",
        isSwitchable: false,
        fields: [
            {
                featureName: "Exterior",
                id: "exterior",
                type: "icon",
                iconURL: "/compare/exterior.svg",
            },
            {
                type: "Alloy Wheels",
                paths: ["exterior.alloyWheels"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.alloyWheels")),
            },
            {
                type: "Colored Outside Door Handles",
                paths: ["exterior.coloredOutsideDoorHandles"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.coloredOutsideDoorHandles")),
            },
            {
                type: "Side Mirrors with Indicators",
                paths: ["exterior.sideMirrorsWithIndicators"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.sideMirrorsWithIndicators")),
            },
            {
                type: "Rear Spoiler",
                paths: ["exterior.rearSpoiler"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.rearSpoiler")),
            },
            {
                type: "Adjustable Headlights",
                paths: ["exterior.adjustableHeadlights"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.adjustableHeadlights")),
            },
            {
                type: "Fog Lights",
                paths: ["exterior.fogLights"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.fogLights")),
            },
            {
                type: "Sun Roof",
                paths: ["exterior.sunRoof"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.sunRoof")),
            },
            {
                type: "Moon Roof",
                paths: ["exterior.moonRoof"],
                render: (vehicle) => renderTick(getNested(vehicle, "exterior.moonRoof")),
            },
            {
                type: "Available Colors",
                paths: ["exterior.colorsAvailable"],
                render: (vehicle) => renderColors(getNested(vehicle, "exterior.colorsAvailable")),
            },
        ],
    },

    // Entertainment & Communications Section
    {
        id: "entertainment-communications",
        isSwitchable: false,
        fields: [
            {
                featureName: "Entertainment & Communications",
                id: "entertainment-communications",
                type: "icon",
                iconURL: "/compare/communication.svg",
            },
            {
                type: "Tachometer",
                paths: ["entertainment.tachometer"],
                render: (vehicle) => renderTick(getNested(vehicle, "entertainment.tachometer")),
            },
            {
                type: "Multi Info",
                paths: ["entertainment.multiInfo"],
                render: (vehicle) => renderTick(getNested(vehicle, "entertainment.multiInfo")),
            },
            {
                type: "CD/DVD Player",
                paths: ["entertainment.cdDvdPlayer"],
                render: (vehicle) => renderTick(getNested(vehicle, "entertainment.cdDvdPlayer")),
            },
            {
                type: "USB & Auxiliary Cable",
                paths: ["entertainment.usbAndAux"],
                render: (vehicle) => renderTick(getNested(vehicle, "entertainment.usbAndAux")),
            },
            {
                type: "Display Size",
                paths: ["entertainment.displaySize"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "Front Speakers",
                paths: ["entertainment.frontSpeakers"],
                render: (vehicle) => renderTick(getNested(vehicle, "entertainment.frontSpeakers")),
            },
            {
                type: "Rear Seat Entertainment",
                paths: ["entertainment.rearSeatEntertainment"],
                render: (vehicle) => renderTick(getNested(vehicle, "entertainment.rearSeatEntertainment")),
            },
        ],
    },

    // Comfort & Convenience Section
    {
        id: "comfort-convenience",
        isSwitchable: false,
        fields: [
            {
                featureName: "Comfort & Convenience",
                id: "comfort-convenience",
                type: "icon",
                iconURL: "/compare/comfort.svg",
            },
            {
                type: "AC",
                paths: ["comfort.ac"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.ac")),
            },
            {
                type: "Climate Control",
                paths: ["comfort.climateControl"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.climateControl")),
            },
            {
                type: "Rear AC Vents",
                paths: ["comfort.rearAcVents"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearAcVents")),
            },
            {
                type: "Heater",
                paths: ["comfort.heater"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.heater")),
            },
            {
                type: "Heated Seats",
                paths: ["comfort.heatedSeats"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.heatedSeats")),
            },
            {
                type: "Defogger",
                paths: ["comfort.defogger"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.defogger")),
            },
            {
                type: "Cool Box",
                paths: ["comfort.coolBox"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.coolBox")),
            },
            {
                type: "Navigation",
                paths: ["comfort.navigation"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.navigation")),
            },
            {
                type: "Optional Navigation",
                paths: ["comfort.optionalNavigation"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.optionalNavigation")),
            },
            {
                type: "Front Camera",
                paths: ["comfort.frontCamera"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.frontCamera")),
            },
            {
                type: "Rear Camera",
                paths: ["comfort.rearCamera"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearCamera")),
            },
            {
                type: "Rear Central Control",
                paths: ["comfort.rearCentralControl"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearCentralControl")),
            },
            {
                type: "Rear Folding Seat",
                paths: ["comfort.rearFoldingSeat"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearFoldingSeat")),
            },
            {
                type: "Rear Headrest",
                paths: ["comfort.rearHeadrest"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearHeadrest")),
            },
            {
                type: "Rear Wiper",
                paths: ["comfort.rearWiper"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.rearWiper")),
            },
            {
                type: "Seat Material Type",
                paths: ["comfort.seatMaterialType"],
                formatter: (vals) => (vals[0]) ? vals[0] : "",
            },
            {
                type: "Steering Adjustment",
                paths: ["comfort.steeringAdjustment"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.steeringAdjustment")),
            },
            {
                type: "Steering Switches",
                paths: ["comfort.steeringSwitches"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.steeringSwitches")),
            },
            {
                type: "Cruise Control",
                paths: ["comfort.cruiseControl"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.cruiseControl")),
            },
            {
                type: "Driving Modes",
                paths: ["comfort.drivingModes"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.drivingModes")),
            },
            {
                type: "Key Type",
                paths: ["comfort.keyType"],
                formatter: (vals) => (vals[0]) ? vals[0] : "",
            },
            {
                type: "Keyless Entry",
                paths: ["comfort.keylessEntry"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.keylessEntry")),
            },
            {
                type: "Push Start",
                paths: ["comfort.pushStart"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.pushStart")),
            },
            {
                type: "Central Locking",
                paths: ["comfort.centralLocking"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.centralLocking")),
            },
            {
                type: "Power Door Locks",
                paths: ["comfort.powerDoorLocks"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerDoorLocks")),
            },
            {
                type: "Power Steering",
                paths: ["comfort.powerSteering"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerSteering")),
            },
            {
                type: "Power Windows",
                paths: ["comfort.powerWindows"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerWindows")),
            },
            {
                type: "Power Mirrors",
                paths: ["comfort.powerMirrors"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.powerMirrors")),
            },
            {
                type: "Cup Holders",
                paths: ["comfort.cupHolders"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.cupHolders")),
            },
            {
                type: "Arm Rest",
                paths: ["comfort.armRest"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.armRest")),
            },
            {
                type: "Handbrake",
                paths: ["comfort.handbrake"],
                formatter: (vals) => (vals[0]) ? vals[0] : "",
            },
            {
                type: "Interior Lighting",
                paths: ["comfort.interiorLighting"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.interiorLighting")),
            },
            {
                type: "Front Power Outlet",
                paths: ["comfort.frontPowerOutlet"],
                render: (vehicle) => renderTick(getNested(vehicle, "comfort.frontPowerOutlet")),
            },
        ],
    },
];
// Define sections specific to bikes
const bikeSections = [
    // Overview Section
    {
        title: "Overview",
        id: "overview",
        isSwitchable: true,
        fields: [
            {
                type: "Size",
                paths: ["dimensions.length", "dimensions.width", "dimensions.height"],
                formatter: (vals) => (vals.every(val => val)) ? `${vals[0]} L x ${vals[1]} W x ${vals[2]} H` : "",
            },
            {
                type: "Mileage",
                paths: ["fuelAverage"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} KM/L` : "",
            },
            {
                type: "Engine",
                paths: ["engine.type", "engine.displacement"],
                formatter: (vals) => (vals[0] && vals[1]) ? `${vals[0]}, ${vals[1]} cc` : "",
            },
            {
                type: "Transmission",
                paths: ["transmission"],
            },
            {
                type: "Fuel Capacity",
                paths: ["fuelCapacity"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} L` : "",
            },
            {
                type: "Top Speed",
                paths: ["topSpeed"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "User Rating",
                render: (vehicle) =>
                    renderUserRating(
                        vehicle,
                        getNested(vehicle, "averageRating"),
                        getNested(vehicle, "reviewCount")
                    ),
            },
        ],
    },

    // Engine & Performance Section
    {
        title: "Engine & Performance",
        id: "engine-performance",
        isSwitchable: false,
        fields: [
            {
                featureName: "Engine & Performance",
                id: "engine-performance",
                type: "icon",
                iconURL: "/compare/engine-performace.svg",
            },
            {
                type: "Engine Type",
                paths: ["engine.type"],
            },
            {
                type: "Displacement",
                paths: ["engine.displacement"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} cc` : "",
            },
            {
                type: "Horse Power",
                paths: ["engine.horsepower"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "Torque",
                paths: ["engine.torque"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "-",
            },
            {
                type: "Fuel Average",
                paths: ["fuelAverage"],
            },
            {
                type: "Max Speed",
                paths: ["topSpeed"],
            },
            {
                type: "Bore x Stroke",
                paths: ["engine.boreStroke"],
            },
            {
                type: "Compression Ratio",
                paths: ["engine.compressionRatio"],
            },
            {
                type: "Clutch Type",
                paths: ["engine.clutch"],
            },
        ],
    },

    // Transmission Section
    {
        title: "Transmission",
        id: "transmission",
        isSwitchable: false,
        fields: [
            {
                featureName: "Transmission",
                id: "transmission",
                type: "icon",
                iconURL: "/compare/transmission.svg",
            },
            {
                type: "Transmission Type",
                paths: ["transmission"],
            },
        ],
    },

    // Wheels & Tyres Section
    {
        title: "Wheels & Tyres",
        id: "wheels-tyres",
        isSwitchable: false,
        fields: [
            {
                featureName: "Wheels & Tyres",
                id: "wheels-tyres",
                type: "icon",
                iconURL: "/compare/wheels.svg",
            },
            {
                type: "Wheel Size",
                paths: ["wheelSize"],
            },
            {
                type: "Front Tyre Size",
                paths: ["tyres.front"],
            },
            {
                type: "Rear Tyre Size",
                paths: ["tyres.back"],
            },
        ],
    },

    // Fuel Consumptions Section
    {
        title: "Fuel Consumptions",
        id: "fuel-consumptions",
        isSwitchable: false,
        fields: [
            {
                featureName: "Fuel Consumptions",
                id: "fuel-consumptions",
                type: "icon",
                iconURL: "/compare/fuel.svg",
            },
            {
                type: "Mileage",
                paths: ["fuelAverage"],
                formatter: (vals) => (vals[0]) ? `${vals[0]}` : "",
            },
            {
                type: "Fuel Tank Capacity",
                paths: ["fuelCapacity"],
                formatter: (vals) => (vals[0]) ? `${vals[0]} L` : "",
            },
        ],
    },

    // Additional Bike-Specific Sections (Optional)
    // You can add more sections here if needed
];


// Function to map vehicle data and optionally hide common features
export const mapVehicleData = (vehicles = [], hideCommonFeatures = false, type = "car") => {
    if (!vehicles.length) {
        return { comparisonData: [] };
    }

    // Destructure vehicles without default values to determine existence
    const [vehicle1, vehicle2, vehicle3] = vehicles;
    const mapSection = type === "bike" ? bikeSections : sections;
    const comparisonData = mapSection
        .map((section) => {
            const overviewTableData = section.fields
                .map((field) => {
                    // Handle icon fields
                    if (field.type === "icon") {
                        return {
                            featureName: field.featureName,
                            type: field.type,
                            iconURL: field.iconURL,
                            id: field.id,
                        };
                    }

                    // Function to render a field for a single vehicle
                    const renderSingleField = (vehicle) => {
                        if (!vehicle) {
                            // Vehicle does not exist
                            return "";
                        }

                        if (field.render) {
                            return field.render(vehicle);
                        } else if (field.paths) {
                            const values = field.paths.map((path) =>
                                getNested(vehicle, path, undefined)
                            );
                            if (field.formatter) {
                                return field.formatter(values);
                            } else {
                                // Check if all values are present
                                const allValuesPresent = values.every(
                                    (val) => val !== undefined && val !== ""
                                );
                                return allValuesPresent ? values.join(" / ") : "-";
                            }
                        } else {
                            return "-";
                        }
                    };

                    // Get the data for each vehicle
                    const first = renderSingleField(vehicle1);
                    const second = renderSingleField(vehicle2);
                    const third = renderSingleField(vehicle3);

                    // Check if values are common based on number of vehicles
                    const isCommon = (() => {
                        // For 2 vehicles comparison
                        if (!vehicle3) {
                            return first && second &&
                                first === second &&
                                first !== "-";
                        }
                        // For 3 vehicles comparison
                        return first && second && third &&
                            first === second &&
                            second === third &&
                            first !== "-";
                    })();

                    return {
                        type: field.type,
                        featureName: field.type,
                        first,
                        second,
                        third,
                        isCommon,
                    };
                })
                .filter((row) => {
                    if (!hideCommonFeatures) {
                        return true;
                    }

                    // Always include icon rows (section headers)
                    if (row.type === "icon") {
                        return true;
                    }

                    const { first, second, third } = row;
                    const values = [first, second, third];

                    // Get non-empty values
                    const nonEmptyValues = values.filter(
                        (v) => v !== undefined && v !== null && v !== ""
                    );

                    // If only one or none non-empty values, include the row
                    if (nonEmptyValues.length <= 1) {
                        return true;
                    }

                    // Check if all non-empty values are equal
                    const allEqual = nonEmptyValues.every(
                        (v) => v === nonEmptyValues[0]
                    );

                    // Include the row if not all values are equal
                    return !allEqual;
                });

            // Include the section only if there are fields after filtering (excluding icon rows)
            const hasNonIconRows = overviewTableData.some(row => row.type !== "icon");

            if (hasNonIconRows) {
                return {
                    title: section.title,
                    id: section.id,
                    isSwitchable: section.isSwitchable,
                    overviewTableData,
                };
            } else {
                return null;
            }
        })
        .filter((section) => section !== null);

    return { comparisonData };
};

