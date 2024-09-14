"use client";
import { CarComparisonSmall, CarSmall, SmallReviewIcon } from '@/components/Icons';
import { Anchor, Box, Button, Card, Group, Image, Input, Text, Title,Modal } from '@mantine/core';
import React from 'react'
import VehicleSelector from "@/components/VehicleSelector";
import { useDisclosure } from '@mantine/hooks';
const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
         <Modal  opened={opened} onClose={close} title="Select Vehicle">
         <VehicleSelector/>
        
      </Modal>
    <Box className="background-search-verlay" mb="420">
    <div className="container">
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
              size="md"
              bg="white"
              c="#333"
              autoContrast
            >
              New Cars
            </Button>
            <Button
              leftSection={<CarSmall />}
              variant="light"
              size="md"
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
              size="md"
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
              size="md"
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
          <Box className="search-wrapper-card" mt="xl">
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
  )
}

export default Header
