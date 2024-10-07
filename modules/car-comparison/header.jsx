"use client";
import {
  CarComparisonSmall,
  CarSmall,
  SmallReviewIcon,
} from "@/components/Icons";
import {
  Anchor,
  Box,
  Button,
  Card,
  Group,
  Image,
  Input,
  Text,
  Title,
  Modal,
} from "@mantine/core";
import React from "react";
import VehicleSelector from "@/components/VehicleSelector";
import { useDisclosure } from "@mantine/hooks";
const Header = () => {
  const router = useRouter();
  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [vehicle1, setVehicle1] = useState({ make: "", model: "", variant: "" });
  const [vehicle2, setVehicle2] = useState({ make: "", model: "", variant: "" });
  const [vehicle3, setVehicle3] = useState({ make: "", model: "", variant: "" });

  const [currentVehicle, setCurrentVehicle] = useState(null);

  const openModal = (vehicleNumber) => {
    setCurrentVehicle(vehicleNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVehicle(null);
  };

  const fetchMakesByType = async (vehicleType) => {
    try {
      const fetchMakes = await fetchMakesByTypeServer(vehicleType);
      setFetchMakesByTypeData(fetchMakes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMakesByType("car");
  }, []);

  const handleCompare = () => {
    // Allow comparisons without the variant, only make and model are mandatory
    const selectedVehicles = [vehicle1, vehicle2, vehicle3].filter(vehicle => vehicle.make && vehicle.model);

    if (selectedVehicles.length < 2) {
      alert("You must select at least 2 vehicles for comparison");
      return;
    }

    // Create a slug from the selected vehicles (handle optional variants)
    const slug = selectedVehicles.map(vehicle => 
      `${encodeURIComponent(vehicle.make)}-${encodeURIComponent(vehicle.model)}${vehicle.variant ? `-${encodeURIComponent(vehicle.variant)}` : ''}`
    ).join('_');
    router.push(`/car-comparison/${slug}`);

  };

  const getSetVehicleFunction = () => {
    if (currentVehicle === 1) return setVehicle1;
    if (currentVehicle === 2) return setVehicle2;
    if (currentVehicle === 3) return setVehicle3;
    return null;
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Select Vehicle">
        <VehicleSelector />
      </Modal>
      <Box
        className="background-search-verlay"
        mb={{ base: 850, sm: 300 }}
        pt={70}
        h={400}
      >
        <div className="container-xl">
          <div className="row">
            <div className="col-md-12">
              <nav className="mt-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor href="#">Bikes</Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor href="#">New Bikes</Anchor>
                  </li>
                </ol>
              </nav>
              <Group>
                <Button
                  leftSection={<CarSmall />}
                  variant="light"
                  radius="md"
                  size="sm"
                  bg="white"
                  c="#333"
                  autoContrast
                >
                  New Cars
                </Button>
                <Button
                  leftSection={<CarSmall />}
                  variant="light"
                  size="sm"
                  radius="md"
                  bg="white"
                  c="#333"
                  autoContrast
                >
                  Used Cars
                </Button>
                <Button
                  leftSection={<CarComparisonSmall />}
                  variant="light"
                  size="sm"
                  radius="md"
                  bg="#333"
                  c="white"
                  autoContrast
                >
                  Car Comparison
                </Button>
                <Button
                  leftSection={<SmallReviewIcon />}
                  variant="light"
                  size="sm"
                  radius="md"
                  bg="white"
                  c="#333"
                  autoContrast
                >
                  Car Reviews
                </Button>
              </Group>
            </div>
            <div className="col-md-12">
              <Box className="search-wrapper-card" mt="lg">
                <Card
                  shadow="0px 4px 20px 0px #00000014"
                  padding="lg"
                  radius="sm"
                >
                  <Title order={3} mb="md">
                    New Cars Comparison
                  </Title>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <Card
                        mb={{ base: "md", sm: 0 }}
                        shadow="none"
                        withBorder
                        padding="xl"
                        radius="md"
                        className="text-center"
                        onClick={open}
                      >
                        <Image
                          src="/compare/compare-car.svg"
                          h={120}
                          w={120}
                          mb="xs"
                          className="img-fluid mx-auto"
                          alt="Car Comparison"
                        />
                        <Text c="dimmed" mb="md">
                          Add Car 1
                        </Text>
                        <Input
                          size="md"
                          radius="md"
                          placeholder="Search by Car Variant"
                        />
                      </Card>
                    </div>
                    <div className="col-md-4">
                      <Card
                        mb={{ base: "md", sm: 0 }}
                        shadow="none"
                        withBorder
                        padding="xl"
                        radius="md"
                        className="text-center"
                      >
                        <Image
                          src="/compare/compare-car.svg"
                          h={120}
                          w={120}
                          mb="xs"
                          className="img-fluid mx-auto"
                          alt="Car Comparison"
                        />
                        <Text c="dimmed" mb="md">
                          Add Car 2
                        </Text>
                        <Input
                          size="md"
                          radius="md"
                          placeholder="Search by Car Variant"
                        />
                      </Card>
                    </div>
                    <div className="col-md-4">
                      <Card
                        mb={{ base: "md", sm: 0 }}
                        shadow="none"
                        withBorder
                        padding="xl"
                        radius="md"
                        className="text-center"
                      >
                        <Image
                          src="/compare/compare-car.svg"
                          h={120}
                          w={120}
                          mb="xs"
                          className="img-fluid mx-auto"
                          alt="Car Comparison"
                        />
                        <Text c="dimmed" mb="md">
                          Add Car 3
                        </Text>
                        <Input
                          size="md"
                          radius="md"
                          placeholder="Search by Car Variant"
                        />
                      </Card>
                    </div>
                    <div className="col-md-12">
                      <Box mt="lg" mx="auto" maw={300}>
                        <Button
                          bg="#E90808"
                          autoContrast
                          fw={500}
                          size="md"
                          fullWidth
                        >
                          Compare
                        </Button>
                      </Box>
                    </div>
                  </div>
                </Card>
              </Box>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Header;
