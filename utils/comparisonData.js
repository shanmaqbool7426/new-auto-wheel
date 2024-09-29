import { Button, Flex, Rating, Text } from "@mantine/core";
import { GetColor } from '@/constants/colors'

export const mapVehicleData = (vehicles) => {
    const greenTick = <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.55097 10.9466L0.586967 6.20057C0.516364 6.13444 0.460084 6.05453 0.421609 5.96577C0.383133 5.87702 0.363281 5.78131 0.363281 5.68458C0.363281 5.58784 0.383133 5.49213 0.421609 5.40338C0.460084 5.31462 0.516364 5.23471 0.586967 5.16858L1.66297 4.13958C1.80924 4.00226 2.00234 3.92583 2.20297 3.92583C2.4036 3.92583 2.59669 4.00226 2.74297 4.13958L6.08697 7.33457L13.25 0.491575C13.3962 0.354262 13.5893 0.277832 13.79 0.277832C13.9906 0.277832 14.1837 0.354262 14.33 0.491575L15.41 1.52357C15.4806 1.5897 15.5368 1.66962 15.5753 1.75838C15.6138 1.84713 15.6337 1.94284 15.6337 2.03958C15.6337 2.13631 15.6138 2.23202 15.5753 2.32077C15.5368 2.40953 15.4806 2.48944 15.41 2.55557L6.63097 10.9466C6.48469 11.0839 6.2916 11.1603 6.09097 11.1603C5.89034 11.1603 5.69724 11.0839 5.55097 10.9466Z" fill="#1BC744" />
    </svg>;
    return {
        comparisonData: [
            // Overview Section
            {
                title: "Overview",
                isSwitchable: true,
                overviewTableData: [
                    {
                        type: "Size",
                        first: vehicles[0] ? `${vehicles[0].dimensions.overallLength} L x ${vehicles[0].dimensions.overallWidth} W x ${vehicles[0].dimensions.overallHeight} H` : "",
                        second: vehicles[1] ? `${vehicles[1].dimensions.overallLength} L x ${vehicles[1].dimensions.overallWidth} W x ${vehicles[1].dimensions.overallHeight} H` : "",
                        third: vehicles[2] ? `${vehicles[2].dimensions.overallLength} L x ${vehicles[2].dimensions.overallWidth} W x ${vehicles[2].dimensions.overallHeight} H` : "",
                    },
                    {
                        type: "Mileage",
                        first: vehicles[0]?.mileage?.city ? `${vehicles[0].mileage.city} - ${vehicles[0].mileage.highway} Km/l` : "",
                        second: vehicles[1]?.mileage?.city ? `${vehicles[1].mileage.city} - ${vehicles[1].mileage.highway} Km/l` : "",
                        third: vehicles[2]?.mileage?.city ? `${vehicles[2].mileage.city} - ${vehicles[2].mileage.highway} Km/l` : "",
                    },
                    {
                        type: "Engine",
                        first: vehicles[0]?.engine?.displacement ? `${vehicles[0].engine.displacement} cc` : "",
                        second: vehicles[1]?.engine?.displacement ? `${vehicles[1].engine.displacement} cc` : "",
                        third: vehicles[2]?.engine?.displacement ? `${vehicles[2].engine.displacement} cc` : "",
                    },
                    {
                        type: "No. of Airbags",
                        first: vehicles[0]?.safety?.airbags || "N/A",
                        second: vehicles[1]?.safety?.airbags || "N/A",
                        third: vehicles[2]?.safety?.airbags || "N/A",
                    },
                    {
                        type: "User Rating",
                        first: (
                            <Flex align="center" justify="center" gap="xs">
                                <Rating defaultValue={3.5} count={5} />
                                <Text fw={600}>{vehicles[0]?.userRating || "3.5"}</Text>
                            </Flex>
                        ),
                        second: (
                            <Flex align="center" justify="center" gap="xs">
                                <Rating defaultValue={3.5} count={5} />
                                <Text fw={600}>{vehicles[1]?.userRating || "3.5"}</Text>
                            </Flex>
                        ),
                        third: (
                            <Flex align="center" justify="center" gap="xs">
                                <Rating defaultValue={3.5} count={5} />
                                <Text fw={600}>{vehicles[2]?.userRating || "3.5"}</Text>
                            </Flex>
                        ),
                    },
                    {
                        type: "Transmission",
                        first: vehicles[0]?.transmission?.type || "N/A",
                        second: vehicles[1]?.transmission?.type || "N/A",
                        third: vehicles[2]?.transmission?.type || "N/A",
                    },
                    {
                        type: "Anti-lock Braking System",
                        first: vehicles[0]?.safety?.abs ? "Yes" : "No",
                        second: vehicles[1]?.safety?.abs ? "Yes" : "No",
                        third: vehicles[2]?.safety?.abs ? "Yes" : "No",
                    },
                    {
                        type: "Trunk Space",
                        first: vehicles[0]?.dimensions?.bootSpace ? `${vehicles[0].dimensions.bootSpace} L` : "N/A",
                        second: vehicles[1]?.dimensions?.bootSpace ? `${vehicles[1].dimensions.bootSpace} L` : "N/A",
                        third: vehicles[2]?.dimensions?.bootSpace ? `${vehicles[2].dimensions.bootSpace} L` : "N/A",
                    },
                    {
                        type: "Brochure",
                        first: vehicles[0]?.brochureLink ? (
                            <Button variant="outline" fw={500} color="#E90808" component="a" href={vehicles[0].brochureLink}>
                                Download Brochure
                            </Button>
                        ) : "N/A",
                        second: vehicles[1]?.brochureLink ? (
                            <Button variant="outline" fw={500} color="#E90808" component="a" href={vehicles[1].brochureLink}>
                                Download Brochure
                            </Button>
                        ) : "N/A",
                        third: vehicles[2]?.brochureLink ? (
                            <Button variant="outline" fw={500} color="#E90808" component="a" href={vehicles[2].brochureLink}>
                                Download Brochure
                            </Button>
                        ) : "N/A",
                    },
                ],
            },

            // Key Features & Specs Section
            {
                title: "Key Features & Specs",
                isSwitchable: false,
                overviewTableData: [
                    {
                        featureName: "Dimensions",
                        type: "icon",
                        iconURL: "/compare/dimension.svg",
                    },
                    {
                        type: "Overall Length",
                        first: vehicles[0]?.dimensions?.overallLength || "N/A",
                        second: vehicles[1]?.dimensions?.overallLength || "N/A",
                        third: vehicles[2]?.dimensions?.overallLength || "N/A",
                    },
                    {
                        type: "Overall Width",
                        first: vehicles[0]?.dimensions?.overallWidth || "N/A",
                        second: vehicles[1]?.dimensions?.overallWidth || "N/A",
                        third: vehicles[2]?.dimensions?.overallWidth || "N/A",
                    },
                    {
                        type: "Overall Height",
                        first: vehicles[0]?.dimensions?.overallHeight || "N/A",
                        second: vehicles[1]?.dimensions?.overallHeight || "N/A",
                        third: vehicles[2]?.dimensions?.overallHeight || "N/A",
                    },
                    {
                        type: "Wheel Base",
                        first: vehicles[0]?.dimensions?.wheelBase || "N/A",
                        second: vehicles[1]?.dimensions?.wheelBase || "N/A",
                        third: vehicles[2]?.dimensions?.wheelBase || "N/A",
                    },
                    {
                        type: "Ground Clearance",
                        first: vehicles[0]?.dimensions?.groundClearance || "N/A",
                        second: vehicles[1]?.dimensions?.groundClearance || "N/A",
                        third: vehicles[2]?.dimensions?.groundClearance || "N/A",
                    },
                    {
                        type: "Kerb Weight",
                        first: vehicles[0]?.dimensions?.kerbWeight || "N/A",
                        second: vehicles[1]?.dimensions?.kerbWeight || "N/A",
                        third: vehicles[2]?.dimensions?.kerbWeight || "N/A",
                    },
                    {
                        type: "Boot Space",
                        first: vehicles[0]?.dimensions?.bootSpace || "N/A",
                        second: vehicles[1]?.dimensions?.bootSpace || "N/A",
                        third: vehicles[2]?.dimensions?.bootSpace || "N/A",
                    },
                    {
                        type: "Seating Capacity",
                        first: vehicles[0]?.dimensions?.seatingCapacity || "N/A",
                        second: vehicles[1]?.dimensions?.seatingCapacity || "N/A",
                        third: vehicles[2]?.dimensions?.seatingCapacity || "N/A",
                    },
                    {
                        type: "No. of Doors",
                        first: vehicles[0]?.dimensions?.doors || "N/A",
                        second: vehicles[1]?.dimensions?.doors || "N/A",
                        third: vehicles[2]?.dimensions?.doors || "N/A",
                    },
                ],
            },

            // Engine & Performance Section
            {
                title: "Engine & Performance",
                overviewTableData: [
                    {
                        featureName: "Engine & Performance",
                        type: "icon",
                        iconURL: "/compare/engine-performace.svg",
                    },
                    {
                        type: "Engine Type",
                        first: vehicles[0]?.engine?.type || "N/A",
                        second: vehicles[1]?.engine?.type || "N/A",
                        third: vehicles[2]?.engine?.type || "N/A",
                    },
                    {
                        type: "Displacement",
                        first: vehicles[0]?.engine?.displacement ? `${vehicles[0].engine.displacement} cc` : "N/A",
                        second: vehicles[1]?.engine?.displacement ? `${vehicles[1].engine.displacement} cc` : "N/A",
                        third: vehicles[2]?.engine?.displacement ? `${vehicles[2].engine.displacement} cc` : "N/A",
                    },
                    {
                        type: "Horse Power",
                        first: vehicles[0]?.engine?.horsepower || "N/A",
                        second: vehicles[1]?.engine?.horsepower || "N/A",
                        third: vehicles[2]?.engine?.horsepower || "N/A",
                    },
                    {
                        type: "Torque",
                        first: vehicles[0]?.engine?.torque || "N/A",
                        second: vehicles[1]?.engine?.torque || "N/A",
                        third: vehicles[2]?.engine?.torque || "N/A",
                    },
                    {
                        type: "Fuel System",
                        first: vehicles[0]?.engine?.fuelSystem || "N/A",
                        second: vehicles[1]?.engine?.fuelSystem || "N/A",
                        third: vehicles[2]?.engine?.fuelSystem || "N/A",
                    },
                    {
                        type: "Max Speed",
                        first: vehicles[0]?.engine?.maxSpeed || "N/A",
                        second: vehicles[1]?.engine?.maxSpeed || "N/A",
                        third: vehicles[2]?.engine?.maxSpeed || "N/A",
                    },
                    {
                        type: "No. of Cylinders",
                        first: vehicles[0]?.engine?.cylinders || "N/A",
                        second: vehicles[1]?.engine?.cylinders || "N/A",
                        third: vehicles[2]?.engine?.cylinders || "N/A",
                    },
                    {
                        type: "Cylinder Configuration",
                        first: vehicles[0]?.engine?.cylinderConfiguration || "N/A",
                        second: vehicles[1]?.engine?.cylinderConfiguration || "N/A",
                        third: vehicles[2]?.engine?.cylinderConfiguration || "N/A",
                    },
                    {
                        type: "Compression Ratio",
                        first: vehicles[0]?.engine?.compressionRatio || "N/A",
                        second: vehicles[1]?.engine?.compressionRatio || "N/A",
                        third: vehicles[2]?.engine?.compressionRatio || "N/A",
                    },
                    {
                        type: "Valves per Cylinder",
                        first: vehicles[0]?.engine?.valvesPerCylinder || "N/A",
                        second: vehicles[1]?.engine?.valvesPerCylinder || "N/A",
                        third: vehicles[2]?.engine?.valvesPerCylinder || "N/A",
                    },
                    {
                        type: "Battery Type (Electrical)",
                        first: vehicles[0]?.engine?.batteryType || "N/A",
                        second: vehicles[1]?.engine?.batteryType || "N/A",
                        third: vehicles[2]?.engine?.batteryType || "N/A",
                    },
                    {
                        type: "Battery Capacity (Electrical)",
                        first: vehicles[0]?.engine?.batteryCapacity || "N/A",
                        second: vehicles[1]?.engine?.batteryCapacity || "N/A",
                        third: vehicles[2]?.engine?.batteryCapacity || "N/A",
                    },
                    {
                        type: "Charging time (Electrical)",
                        first: vehicles[0]?.engine?.chargingTime || "N/A",
                        second: vehicles[1]?.engine?.chargingTime || "N/A",
                        third: vehicles[2]?.engine?.chargingTime || "N/A",
                    },
                    {
                        type: "Range (Electrical)",
                        first: vehicles[0]?.engine?.range || "N/A",
                        second: vehicles[1]?.engine?.range || "N/A",
                        third: vehicles[2]?.engine?.range || "N/A",
                    },
                    {
                        type: "Valve Mechanism",
                        first: vehicles[0]?.engine?.valveMechanism || "N/A",
                        second: vehicles[1]?.engine?.valveMechanism || "N/A",
                        third: vehicles[2]?.engine?.valveMechanism || "N/A",
                    },
                    // Transmission Section
                    {
                        title: "Transmission",
                        overviewTableData: [
                            {
                                featureName: "Transmission",
                                type: "icon",
                                iconURL: "/compare/transmission.svg",
                            },
                            {
                                type: "Transmission Type",
                                first: vehicles[0]?.transmission?.type || "-",
                                second: vehicles[1]?.transmission?.type || "-",
                                third: vehicles[2]?.transmission?.type || "-",
                            },
                            {
                                type: "CVT",
                                first: vehicles[0]?.transmission?.cvt ? greenTick : "-",
                                second: vehicles[1]?.transmission?.cvt ? greenTick : "-",
                                third: vehicles[2]?.transmission?.cvt ? greenTick : "-",
                            },
                            {
                                type: "Gearbox",
                                first: vehicles[0]?.transmission?.gearbox || "-",
                                second: vehicles[1]?.transmission?.gearbox || "-",
                                third: vehicles[2]?.transmission?.gearbox || "-",
                            },
                        ],
                    },
                ],
            },
            // Transmission Section
            {
                title: "Transmission",
                overviewTableData: [
                    {
                        featureName: "Transmission",
                        type: "icon",
                        iconURL: "/compare/transmission.svg",
                    },
                    {
                        type: "Transmission Type",
                        first: vehicles[0]?.transmission?.type || "-",
                        second: vehicles[1]?.transmission?.type || "-",
                        third: vehicles[2]?.transmission?.type || "-",
                    },
                    {
                        type: "CVT",
                        first: vehicles[0]?.transmission?.cvt ? greenTick : "-",
                        second: vehicles[1]?.transmission?.cvt ? greenTick : "-",
                        third: vehicles[2]?.transmission?.cvt ? greenTick : "-",
                    },
                    {
                        type: "Gearbox",
                        first: vehicles[0]?.transmission?.gearbox || "-",
                        second: vehicles[1]?.transmission?.gearbox || "-",
                        third: vehicles[2]?.transmission?.gearbox || "-",
                    },
                ],
            },
            // Suspension, Steering & Brakes Section
            {
                title: "Suspension, Steering & Brakes",
                overviewTableData: [
                    {
                        featureName: "Suspension, Steering & Brakes",
                        type: "icon",
                        iconURL: "/compare/suspension.svg",
                    },
                    {
                        type: "Steering Type",
                        first: vehicles[0]?.suspensionSteeringBrakes?.steeringType || "N/A",
                        second: vehicles[1]?.suspensionSteeringBrakes?.steeringType || "N/A",
                        third: vehicles[2]?.suspensionSteeringBrakes?.steeringType || "N/A",
                    },
                    {
                        type: "Power Assisted",
                        first: vehicles[0]?.suspensionSteeringBrakes?.powerAssisted || "N/A",
                        second: vehicles[1]?.suspensionSteeringBrakes?.powerAssisted || "N/A",
                        third: vehicles[2]?.suspensionSteeringBrakes?.powerAssisted || "N/A",
                    },
                    {
                        type: "Minimum Turning Radius",
                        first: vehicles[0]?.suspensionSteeringBrakes?.minimumTurningRadius || "N/A",
                        second: vehicles[1]?.suspensionSteeringBrakes?.minimumTurningRadius || "N/A",
                        third: vehicles[2]?.suspensionSteeringBrakes?.minimumTurningRadius || "N/A",
                    },
                    {
                        type: "Front Brakes",
                        first: vehicles[0]?.suspensionSteeringBrakes?.frontBrakes || "N/A",
                        second: vehicles[1]?.suspensionSteeringBrakes?.frontBrakes || "N/A",
                        third: vehicles[2]?.suspensionSteeringBrakes?.frontBrakes || "N/A",
                    },
                    {
                        type: "Rear Brakes",
                        first: vehicles[0]?.suspensionSteeringBrakes?.rearBrakes || "N/A",
                        second: vehicles[1]?.suspensionSteeringBrakes?.rearBrakes || "N/A",
                        third: vehicles[2]?.suspensionSteeringBrakes?.rearBrakes || "N/A",
                    },
                ],
            },
            // Wheels & Tyres Section
            {
                title: "Wheels & Tyres",
                overviewTableData: [
                    {
                        featureName: "Wheels & Tyres",
                        type: "icon",
                        iconURL: "/compare/wheels.svg",
                    },
                    {
                        type: "Wheel Type",
                        first: vehicles[0]?.wheelsAndTyres?.wheelType || "N/A",
                        second: vehicles[1]?.wheelsAndTyres?.wheelType || "N/A",
                        third: vehicles[2]?.wheelsAndTyres?.wheelType || "N/A",
                    },
                    {
                        type: "Wheel Size",
                        first: vehicles[0]?.wheelsAndTyres?.wheelSize || "N/A",
                        second: vehicles[1]?.wheelsAndTyres?.wheelSize || "N/A",
                        third: vehicles[2]?.wheelsAndTyres?.wheelSize || "N/A",
                    },
                    {
                        type: "PCD",
                        first: vehicles[0]?.wheelsAndTyres?.pcd || "-",
                        second: vehicles[1]?.wheelsAndTyres?.pcd || "-",
                        third: vehicles[2]?.wheelsAndTyres?.pcd || "-",
                    },
                    {
                        type: "Tyre Size",
                        first: vehicles[0]?.wheelsAndTyres?.tyreSize || "N/A",
                        second: vehicles[1]?.wheelsAndTyres?.tyreSize || "N/A",
                        third: vehicles[2]?.wheelsAndTyres?.tyreSize || "N/A",
                    },
                    {
                        type: "Spare Tyre",
                        first: vehicles[0]?.wheelsAndTyres?.spareTyre ? greenTick : "-",
                        second: vehicles[1]?.wheelsAndTyres?.spareTyre ? greenTick : "-",
                        third: vehicles[2]?.wheelsAndTyres?.spareTyre ? greenTick : "-",
                    },
                    {
                        type: "Spare Tyre Size",
                        first: vehicles[0]?.wheelsAndTyres?.spareTyreSize || "-",
                        second: vehicles[1]?.wheelsAndTyres?.spareTyreSize || "-",
                        third: vehicles[2]?.wheelsAndTyres?.spareTyreSize || "-",
                    },
                ],
            },
            // Fuel Consumptions Section
            {
                title: "Fuel Consumptions",
                overviewTableData: [
                    {
                        featureName: "Fuel Consumptions",
                        type: "icon",
                        iconURL: "/compare/fuel.svg",
                    },
                    {
                        type: "Mileage City",
                        first: vehicles[0]?.fuelConsumption?.mileageCity || "N/A",
                        second: vehicles[1]?.fuelConsumption?.mileageCity || "N/A",
                        third: vehicles[2]?.fuelConsumption?.mileageCity || "N/A",
                    },
                    {
                        type: "Mileage Highway",
                        first: vehicles[0]?.fuelConsumption?.mileageHighway || "N/A",
                        second: vehicles[1]?.fuelConsumption?.mileageHighway || "N/A",
                        third: vehicles[2]?.fuelConsumption?.mileageHighway || "N/A",
                    },
                    {
                        type: "Fuel Tank Capacity",
                        first: vehicles[0]?.fuelConsumption?.tankCapacity ? `${vehicles[0].fuelConsumption.tankCapacity} L` : "N/A",
                        second: vehicles[1]?.fuelConsumption?.tankCapacity ? `${vehicles[1].fuelConsumption.tankCapacity} L` : "N/A",
                        third: vehicles[2]?.fuelConsumption?.tankCapacity ? `${vehicles[2].fuelConsumption.tankCapacity} L` : "N/A",
                    },
                ],
            },
            // Safety Section
            {
                title: "Safety",
                overviewTableData: [
                    {
                        featureName: "Safety",
                        type: "icon",
                        iconURL: "/compare/safety.svg",
                    },
                    {
                        type: "No. of Airbags",
                        first: vehicles[0]?.safety?.airbags || "N/A",
                        second: vehicles[1]?.safety?.airbags || "N/A",
                        third: vehicles[2]?.safety?.airbags || "N/A",
                    },
                    {
                        type: "No. of Seat Belts",
                        first: vehicles[0]?.safety?.seatBelts || "N/A",
                        second: vehicles[1]?.safety?.seatBelts || "N/A",
                        third: vehicles[2]?.safety?.seatBelts || "N/A",
                    },
                    {
                        type: "Immobilizer",
                        first: vehicles[0]?.safety?.immobilizer ? greenTick : "-",
                        second: vehicles[1]?.safety?.immobilizer ? greenTick : "-",
                        third: vehicles[2]?.safety?.immobilizer ? greenTick : "-",
                    },
                    {
                        type: "Child Lock",
                        first: vehicles[0]?.safety?.childLock ? greenTick : "-",
                        second: vehicles[1]?.safety?.childLock ? greenTick : "-",
                        third: vehicles[2]?.safety?.childLock ? greenTick : "-",
                    },
                    {
                        type: "ISOFIX Child Seat Anchors",
                        first: vehicles[0]?.safety?.isofixAnchors ? greenTick : "-",
                        second: vehicles[1]?.safety?.isofixAnchors ? greenTick : "-",
                        third: vehicles[2]?.safety?.isofixAnchors ? greenTick : "-",
                    },
                    {
                        type: "Anti-Lock Braking System (ABS)",
                        first: vehicles[0]?.safety?.abs ? greenTick : "-",
                        second: vehicles[1]?.safety?.abs ? greenTick : "-",
                        third: vehicles[2]?.safety?.abs ? greenTick : "-",
                    },
                    {
                        type: "Down Hill Assist Control",
                        first: vehicles[0]?.safety?.downHillAssist ? greenTick : "-",
                        second: vehicles[1]?.safety?.downHillAssist ? greenTick : "-",
                        third: vehicles[2]?.safety?.downHillAssist ? greenTick : "-",
                    },
                    {
                        type: "Start Hill Start Assist Control",
                        first: vehicles[0]?.safety?.hillAssist ? greenTick : "-",
                        second: vehicles[1]?.safety?.hillAssist ? greenTick : "-",
                        third: vehicles[2]?.safety?.hillAssist ? greenTick : "-",
                    },
                    {
                        type: "Traction Control",
                        first: vehicles[0]?.safety?.tractionControl ? greenTick : "-",
                        second: vehicles[1]?.safety?.tractionControl ? greenTick : "-",
                        third: vehicles[2]?.safety?.tractionControl ? greenTick : "-",
                    },
                    {
                        type: "Vehicle Stability Control",
                        first: vehicles[0]?.safety?.vehicleStabilityControl ? greenTick : "-",
                        second: vehicles[1]?.safety?.vehicleStabilityControl ? greenTick : "-",
                        third: vehicles[2]?.safety?.vehicleStabilityControl ? greenTick : "-",
                    },
                ],
            },
            // Exterior Section
            {
                title: "Exterior",
                overviewTableData: [
                    {
                        featureName: "Exterior",
                        type: "icon",
                        iconURL: "/compare/exterior.svg",
                    },
                    {
                        type: "Alloy Wheels",
                        first: vehicles[0]?.exterior?.alloyWheels ? greenTick : "-",
                        second: vehicles[1]?.exterior?.alloyWheels ? greenTick : "-",
                        third: vehicles[2]?.exterior?.alloyWheels ? greenTick : "-",
                    },
                    {
                        type: "Colored Outside Door Handles",
                        first: vehicles[0]?.exterior?.coloredOutsideDoorHandles ? greenTick : "-",
                        second: vehicles[1]?.exterior?.coloredOutsideDoorHandles ? greenTick : "-",
                        third: vehicles[2]?.exterior?.coloredOutsideDoorHandles ? greenTick : "-",
                    },
                    {
                        type: "Side Mirrors with Indicators",
                        first: vehicles[0]?.exterior?.sideMirrorsWithIndicators ? greenTick : "-",
                        second: vehicles[1]?.exterior?.sideMirrorsWithIndicators ? greenTick : "-",
                        third: vehicles[2]?.exterior?.sideMirrorsWithIndicators ? greenTick : "-",
                    },
                    {
                        type: "Rear Spoiler",
                        first: vehicles[0]?.exterior?.rearSpoiler ? greenTick : "-",
                        second: vehicles[1]?.exterior?.rearSpoiler ? greenTick : "-",
                        third: vehicles[2]?.exterior?.rearSpoiler ? greenTick : "-",
                    },
                    {
                        type: "Adjustable Headlights",
                        first: vehicles[0]?.exterior?.adjustableHeadlights ? greenTick : "-",
                        second: vehicles[1]?.exterior?.adjustableHeadlights ? greenTick : "-",
                        third: vehicles[2]?.exterior?.adjustableHeadlights ? greenTick : "-",
                    },
                    {
                        type: "Fog Lights",
                        first: vehicles[0]?.exterior?.fogLights ? greenTick : "-",
                        second: vehicles[1]?.exterior?.fogLights ? greenTick : "-",
                        third: vehicles[2]?.exterior?.fogLights ? greenTick : "-",
                    },
                    {
                        type: "Sun Roof",
                        first: vehicles[0]?.exterior?.sunRoof ? greenTick : "-",
                        second: vehicles[1]?.exterior?.sunRoof ? greenTick : "-",
                        third: vehicles[2]?.exterior?.sunRoof ? greenTick : "-",
                    },
                    {
                        type: "Moon Roof",
                        first: vehicles[0]?.exterior?.moonRoof ? greenTick : "-",
                        second: vehicles[1]?.exterior?.moonRoof ? greenTick : "-",
                        third: vehicles[2]?.exterior?.moonRoof ? greenTick : "-",
                    },
                    {
                        type: "Available Colors",
                        first: vehicles[0]?.exterior?.colorsAvailable?.length
                            ? vehicles[0].exterior.colorsAvailable.map((color, index) => (
                                <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
                            ))
                            : "-",
                        second: vehicles[1]?.exterior?.colorsAvailable?.length
                            ? vehicles[1].exterior.colorsAvailable.map((color, index) => (
                                <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
                            ))
                            : "-",
                        third: vehicles[2]?.exterior?.colorsAvailable?.length
                            ? vehicles[2].exterior.colorsAvailable.map((color, index) => (
                                <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
                            ))
                            : "-",
                    },
                ],
            },
            // Entertainment & Communications Section
            {
                title: "Entertainment & Communications",
                overviewTableData: [
                    {
                        featureName: "Entertainment & Communications",
                        type: "icon",
                        iconURL: "/compare/communication.svg",
                    },
                    {
                        type: "Tachometer",
                        first: vehicles[0]?.entertainment?.tachometer ? greenTick : "-",
                        second: vehicles[1]?.entertainment?.tachometer ? greenTick : "-",
                        third: vehicles[2]?.entertainment?.tachometer ? greenTick : "-",
                    },
                    {
                        type: "Multi Info",
                        first: vehicles[0]?.entertainment?.multiInfo ? greenTick : "-",
                        second: vehicles[1]?.entertainment?.multiInfo ? greenTick : "-",
                        third: vehicles[2]?.entertainment?.multiInfo ? greenTick : "-",
                    },
                    {
                        type: "CD DVD Player",
                        first: vehicles[0]?.entertainment?.cdDvdPlayer ? greenTick : "-",
                        second: vehicles[1]?.entertainment?.cdDvdPlayer ? greenTick : "-",
                        third: vehicles[2]?.entertainment?.cdDvdPlayer ? greenTick : "-",
                    },
                    {
                        type: "USB & Auxiliary Cable",
                        first: vehicles[0]?.entertainment?.usbAndAux ? greenTick : "-",
                        second: vehicles[1]?.entertainment?.usbAndAux ? greenTick : "-",
                        third: vehicles[2]?.entertainment?.usbAndAux ? greenTick : "-",
                    },
                    {
                        type: "Display Size",
                        first: vehicles[0]?.entertainment?.displaySize ? `${vehicles[0].entertainment.displaySize}` : "-",
                        second: vehicles[1]?.entertainment?.displaySize ? `${vehicles[1].entertainment.displaySize}` : "-",
                        third: vehicles[2]?.entertainment?.displaySize ? `${vehicles[2].entertainment.displaySize}` : "-",
                    },
                    {
                        type: "Front Speakers",
                        first: vehicles[0]?.entertainment?.frontSpeakers ? greenTick : "-",
                        second: vehicles[1]?.entertainment?.frontSpeakers ? greenTick : "-",
                        third: vehicles[2]?.entertainment?.frontSpeakers ? greenTick : "-",
                    },
                    {
                        type: "Rear Seat Entertainment",
                        first: vehicles[0]?.entertainment?.rearSeatEntertainment ? greenTick : "-",
                        second: vehicles[1]?.entertainment?.rearSeatEntertainment ? greenTick : "-",
                        third: vehicles[2]?.entertainment?.rearSeatEntertainment ? greenTick : "-",
                    },
                ],
            },
            //   "Comfort & Convenience",
            {
                title: "Comfort & Convenience",
                overviewTableData: [
                    {
                        featureName: "Comfort & Convenience",
                        type: "icon",
                        iconURL: "/compare/comfort.svg",
                    },
                    {
                        type: "AC",
                        first: vehicles[0]?.comfort?.ac ? greenTick : "-",
                        second: vehicles[1]?.comfort?.ac ? greenTick : "-",
                        third: vehicles[2]?.comfort?.ac ? greenTick : "-",
                    },
                    {
                        type: "Climate Control",
                        first: vehicles[0]?.comfort?.climateControl ? greenTick : "-",
                        second: vehicles[1]?.comfort?.climateControl ? greenTick : "-",
                        third: vehicles[2]?.comfort?.climateControl ? greenTick : "-",
                    },
                    {
                        type: "Rear AC Vents",
                        first: vehicles[0]?.comfort?.rearAcVents ? greenTick : "-",
                        second: vehicles[1]?.comfort?.rearAcVents ? greenTick : "-",
                        third: vehicles[2]?.comfort?.rearAcVents ? greenTick : "-",
                    },
                    {
                        type: "Heater",
                        first: vehicles[0]?.comfort?.heater ? greenTick : "-",
                        second: vehicles[1]?.comfort?.heater ? greenTick : "-",
                        third: vehicles[2]?.comfort?.heater ? greenTick : "-",
                    },
                    {
                        type: "Heated Seats",
                        first: vehicles[0]?.comfort?.heatedSeats ? greenTick : "-",
                        second: vehicles[1]?.comfort?.heatedSeats ? greenTick : "-",
                        third: vehicles[2]?.comfort?.heatedSeats ? greenTick : "-",
                    },
                    {
                        type: "Defogger",
                        first: vehicles[0]?.comfort?.defogger ? greenTick : "-",
                        second: vehicles[1]?.comfort?.defogger ? greenTick : "-",
                        third: vehicles[2]?.comfort?.defogger ? greenTick : "-",
                    },
                    {
                        type: "Cool Box",
                        first: vehicles[0]?.comfort?.coolBox ? greenTick : "-",
                        second: vehicles[1]?.comfort?.coolBox ? greenTick : "-",
                        third: vehicles[2]?.comfort?.coolBox ? greenTick : "-",
                    },
                    {
                        type: "Navigation",
                        first: vehicles[0]?.comfort?.navigation ? greenTick : "-",
                        second: vehicles[1]?.comfort?.navigation ? greenTick : "-",
                        third: vehicles[2]?.comfort?.navigation ? greenTick : "-",
                    },
                    {
                        type: "Optional Navigation",
                        first: vehicles[0]?.comfort?.optionalNavigation ? greenTick : "-",
                        second: vehicles[1]?.comfort?.optionalNavigation ? greenTick : "-",
                        third: vehicles[2]?.comfort?.optionalNavigation ? greenTick : "-",
                    },
                    {
                        type: "Front Camera",
                        first: vehicles[0]?.comfort?.frontCamera ? greenTick : "-",
                        second: vehicles[1]?.comfort?.frontCamera ? greenTick : "-",
                        third: vehicles[2]?.comfort?.frontCamera ? greenTick : "-",
                    },
                    {
                        type: "Rear Camera",
                        first: vehicles[0]?.comfort?.rearCamera ? greenTick : "-",
                        second: vehicles[1]?.comfort?.rearCamera ? greenTick : "-",
                        third: vehicles[2]?.comfort?.rearCamera ? greenTick : "-",
                    },
                    {
                        type: "Rear Central Control",
                        first: vehicles[0]?.comfort?.rearCentralControl ? greenTick : "-",
                        second: vehicles[1]?.comfort?.rearCentralControl ? greenTick : "-",
                        third: vehicles[2]?.comfort?.rearCentralControl ? greenTick : "-",
                    },
                    {
                        type: "Rear Folding Seat",
                        first: vehicles[0]?.comfort?.rearFoldingSeat ? greenTick : "-",
                        second: vehicles[1]?.comfort?.rearFoldingSeat ? greenTick : "-",
                        third: vehicles[2]?.comfort?.rearFoldingSeat ? greenTick : "-",
                    },
                    {
                        type: "Rear Headrest",
                        first: vehicles[0]?.comfort?.rearHeadrest ? greenTick : "-",
                        second: vehicles[1]?.comfort?.rearHeadrest ? greenTick : "-",
                        third: vehicles[2]?.comfort?.rearHeadrest ? greenTick : "-",
                    },
                    {
                        type: "Rear Wiper",
                        first: vehicles[0]?.comfort?.rearWiper ? greenTick : "-",
                        second: vehicles[1]?.comfort?.rearWiper ? greenTick : "-",
                        third: vehicles[2]?.comfort?.rearWiper ? greenTick : "-",
                    },
                    {
                        type: "Seat Material Type",
                        first: vehicles[0]?.comfort?.seatMaterialType || "-",
                        second: vehicles[1]?.comfort?.seatMaterialType || "-",
                        third: vehicles[2]?.comfort?.seatMaterialType || "-",
                    },
                    {
                        type: "Steering Adjustment",
                        first: vehicles[0]?.comfort?.steeringAdjustment ? greenTick : "-",
                        second: vehicles[1]?.comfort?.steeringAdjustment ? greenTick : "-",
                        third: vehicles[2]?.comfort?.steeringAdjustment ? greenTick : "-",
                    },
                    {
                        type: "Steering Switches",
                        first: vehicles[0]?.comfort?.steeringSwitches ? greenTick : "-",
                        second: vehicles[1]?.comfort?.steeringSwitches ? greenTick : "-",
                        third: vehicles[2]?.comfort?.steeringSwitches ? greenTick : "-",
                    },
                    {
                        type: "Cruise Control",
                        first: vehicles[0]?.comfort?.cruiseControl ? greenTick : "-",
                        second: vehicles[1]?.comfort?.cruiseControl ? greenTick : "-",
                        third: vehicles[2]?.comfort?.cruiseControl ? greenTick : "-",
                    },
                    {
                        type: "Driving Modes",
                        first: vehicles[0]?.comfort?.drivingModes ? greenTick : "-",
                        second: vehicles[1]?.comfort?.drivingModes ? greenTick : "-",
                        third: vehicles[2]?.comfort?.drivingModes ? greenTick : "-",
                    },
                    {
                        type: "Key Type",
                        first: vehicles[0]?.comfort?.keyType || "-",
                        second: vehicles[1]?.comfort?.keyType || "-",
                        third: vehicles[2]?.comfort?.keyType || "-",
                    },
                    {
                        type: "Keyless Entry",
                        first: vehicles[0]?.comfort?.keylessEntry ? greenTick : "-",
                        second: vehicles[1]?.comfort?.keylessEntry ? greenTick : "-",
                        third: vehicles[2]?.comfort?.keylessEntry ? greenTick : "-",
                    },
                    {
                        type: "Push Start",
                        first: vehicles[0]?.comfort?.pushStart ? greenTick : "-",
                        second: vehicles[1]?.comfort?.pushStart ? greenTick : "-",
                        third: vehicles[2]?.comfort?.pushStart ? greenTick : "-",
                    },
                    {
                        type: "Central Locking",
                        first: vehicles[0]?.comfort?.centralLocking ? greenTick : "-",
                        second: vehicles[1]?.comfort?.centralLocking ? greenTick : "-",
                        third: vehicles[2]?.comfort?.centralLocking ? greenTick : "-",
                    },
                    {
                        type: "Power Door Locks",
                        first: vehicles[0]?.comfort?.powerDoorLocks ? greenTick : "-",
                        second: vehicles[1]?.comfort?.powerDoorLocks ? greenTick : "-",
                        third: vehicles[2]?.comfort?.powerDoorLocks ? greenTick : "-",
                    },
                    {
                        type: "Power Steering",
                        first: vehicles[0]?.comfort?.powerSteering ? greenTick : "-",
                        second: vehicles[1]?.comfort?.powerSteering ? greenTick : "-",
                        third: vehicles[2]?.comfort?.powerSteering ? greenTick : "-",
                    },
                    {
                        type: "Power Windows",
                        first: vehicles[0]?.comfort?.powerWindows ? greenTick : "-",
                        second: vehicles[1]?.comfort?.powerWindows ? greenTick : "-",
                        third: vehicles[2]?.comfort?.powerWindows ? greenTick : "-",
                    },
                    {
                        type: "Power Mirrors",
                        first: vehicles[0]?.comfort?.powerMirrors ? greenTick : "-",
                        second: vehicles[1]?.comfort?.powerMirrors ? greenTick : "-",
                        third: vehicles[2]?.comfort?.powerMirrors ? greenTick : "-",
                    },
                    {
                        type: "Cup Holders",
                        first: vehicles[0]?.comfort?.cupHolders ? greenTick : "-",
                        second: vehicles[1]?.comfort?.cupHolders ? greenTick : "-",
                        third: vehicles[2]?.comfort?.cupHolders ? greenTick : "-",
                    },
                    {
                        type: "Arm Rest",
                        first: vehicles[0]?.comfort?.armRest ? greenTick : "-",
                        second: vehicles[1]?.comfort?.armRest ? greenTick : "-",
                        third: vehicles[2]?.comfort?.armRest ? greenTick : "-",
                    },
                    {
                        type: "Handbrake",
                        first: vehicles[0]?.comfort?.handbrake || "-",
                        second: vehicles[1]?.comfort?.handbrake || "-",
                        third: vehicles[2]?.comfort?.handbrake || "-",
                    },
                    {
                        type: "Interior Lighting",
                        first: vehicles[0]?.comfort?.interiorLighting ? greenTick : "-",
                        second: vehicles[1]?.comfort?.interiorLighting ? greenTick : "-",
                        third: vehicles[2]?.comfort?.interiorLighting ? greenTick : "-",
                    },
                    {
                        type: "Front Power Outlet",
                        first: vehicles[0]?.comfort?.frontPowerOutlet ? greenTick : "-",
                        second: vehicles[1]?.comfort?.frontPowerOutlet ? greenTick : "-",
                        third: vehicles[2]?.comfort?.frontPowerOutlet ? greenTick : "-",
                    },
                ],
            },
        ],
    };
};

