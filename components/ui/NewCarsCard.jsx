import React from "react";
import { Flex, Text, Title, Image, Card, Rating, Box } from "@mantine/core";
import Link from "next/link";

import NextImage from "next/image";
import { formatToLac, formatToLacOrCrore, formatToMonthYear } from "@/utils";
import styles from './Card.module.css';

const NewCarsCard = ({ vehicle, isRating, mb = '32px' }) => {
  return (
    <Link href={`/new-vehicle/${vehicle?.slug || ""}`}>
      <Card radius="5px" shadow="0px 4px 20px 0px #00000014" pb="28px" pt="0" px="0" mb={mb}>
        <Box className={styles.cardMedia}>
          <Image
            component={NextImage}
            src={vehicle?.defaultImage || ""}
            height={137}
            width={269}
            alt="Mehran"
          />
        </Box>

        <Flex direction="column" align="center" gap="12px">
          <Title order={5} fw={500} c="#E90808" lh="1" fz="12px">
            {vehicle?.make} {vehicle?.model}
          </Title>
          <Text fw={700} fz="12px">
            Rs {formatToLacOrCrore(vehicle?.minPrice)} -{" "}
            {formatToLacOrCrore(vehicle?.maxPrice)}
          </Text>

          {!isRating && (
            <Text span inherit fz="12px">
              (Launched {formatToMonthYear(vehicle.releaseDate)}*)
            </Text>
          )}

          {isRating && (
            <Flex align="center" justify="center" gap="xs">
              <Rating defaultValue={vehicle.averageRating ?? 0} size={'xs'} readOnly />
              <Text span inherit fz="12px">
                {vehicle?.averageRating
                  ? `(${Math.round(parseFloat(vehicle.averageRating) * 10) / 10
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
