import { bikeEngines, carEngines, truckEngines } from "@/mock-data/mock-array";

/**
 * Create Specifications
 */
const createSpecifications = (values, vehicle) => ({
    suburb: values.suburb,
    exteriorColor: values.exteriorColor,
    mileage: values.milage,
    engine: values.engine,
    drive: values.drive,
    engineType: values.engineType,
    fuelType: values.engineType,
    bodyType: values.body,
    engineCapacity: values.engineCapacity,
    transmission: values.transmission,
    assembly: values.assembly,
    ...(vehicle !== "bike" && {
        seats: values.seats,
        doors: values.doors
    })
});

/**
 * Create Payload
 */
export const createPayload = (values, vehicle, session) => ({
    ...values,
    registeredIn: values.registeredIn?.toLowerCase(),
    specifications: createSpecifications(values, vehicle),
    Info: {
        make: values.make,
        model: values.model,
        variant: values.variant,
    },
    rego: values.rego,
    price: values.price || 0,
    startPrice: values.price || 0,
    endPrice: values.price || 0,
    cityArea: values.suburb,
    type: vehicle,
    year: values.year,
    make: values.make,
    model: values.model,
    variant: values.variant,
    contactInfo: {
        mobileNumber: values.mobileNumber,
        secondaryNumber: values.secondaryNumber,
        allowWhatsAppContact: values.allowWhatsAppContact,
    },
    images: values.images,
    defaultImage: values.images[0],
    seller: session?.user?._id,
});

/**
* Year List Generation
*/
export const generateYearList = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= 1970; year--) {
        years.push({ value: year.toString(), label: year.toString() });
    }

    return years;
};


/**
 * Engine List
 */
export const getEngineListByVehicle = (vehicleType) => {
    switch (vehicleType) {
        case "bike":
            return bikeEngines;
        case "truck":
            return truckEngines;
        default:
            return carEngines;
    }
};