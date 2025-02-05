'use client';
import React from 'react';
import { Box, Title, Text, Anchor, Grid } from '@mantine/core';
import styles from './SectionTopComparison.module.css';
import Link from "next/link";

export default function SectionTopComparison() {
  return (
    <Box component="section" className={styles.section} bg={"#F3F3F3"}>
      <Box className="container-xl">
        <Box className={styles.sectionHeader}>
          <Title order={2} lh={'1.2'}>
            {`Top`}{" "}
            <Text span inherit className="text-primary">
              Comparison
            </Text>
          </Title>

          <Anchor component={Link} href="/videos" c="#E90808">
            Show all Comparison
          </Anchor>
        </Box>

        <Box className={styles.sectionBody}>
          <Grid>
            <Grid.Col span={4}>
              Comparison card
            </Grid.Col>
            <Grid.Col span={4}>
              Comparison card
            </Grid.Col>
            <Grid.Col span={4}>
              Comparison card
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
