import React from "react";
import { Flex, Text, Title, Image, Card, Rating } from "@mantine/core";
import Link from "next/link";

import NextImage from "next/image";
import { formatToLac, formatToLacOrCrore, formatToMonthYear } from "@/utils";

const NewCarsCard = ({ vehicle, isRating }) => {
  console.log("vehicle", vehicle);
  return (
    <Link href={`/new-vehicle/${vehicle?.slug || ""}`}>
      <Card shadow="0px 4px 20px 0px #00000014" pb="xl" pt="0" px="0" mb="xl">
        <Image
          p="lg"
          pt="xl"
          component={NextImage}
          src={vehicle?.defaultImage}
          height={130}
          width={130}
          alt="Mehran"
          className="img-fluid"
        />

        <Flex direction="column" align="center" gap="xs">
          <Title order={5} fw={500} c="#E90808">
            {vehicle?.make} {vehicle?.model}
          </Title>
          <Text fw={600} fs="xl">
            Rs {formatToLacOrCrore(vehicle?.minPrice)} -{" "}
            {formatToLacOrCrore(vehicle?.maxPrice)}
          </Text>

          {!isRating && (
            <Text span inherit>
              (Launched {formatToMonthYear(vehicle.releaseDate)}*)
            </Text>
          )}

          {isRating && (
            <Flex align="center" justify="center" gap="xs">
              <Rating defaultValue={vehicle?.averageRating ?? 0} />
              <Text span inherit>
                {vehicle?.averageRating
                  ? `(${
                      Math.round(parseFloat(vehicle.averageRating) * 10) / 10
                    }/5)`
                  : null}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>
    </Link>
  );
};

export default NewCarsCard;
