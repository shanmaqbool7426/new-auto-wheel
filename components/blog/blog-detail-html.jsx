"use client";
import { ActionIcon, Box, Card, Group, Image, List, rem, Tabs, Text, Title } from '@mantine/core'
import React from 'react'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { BsTwitterX, BsYoutube } from 'react-icons/bs'

const BlogDetailHtml = () => {
  return (
    <Card
    mb="lg"
    color="#E90808"
    mt="xl"
    padding="lg"
    shadow="0px 4px 20px 0px #00000014"
  >
    <Title order={3} mb="lg">
      Table of Contents
    </Title>
    <Tabs color="#E90808" defaultValue="1">
      <Tabs.List>
        <Tabs.Tab value="1">Changan Alsvin Pricess</Tabs.Tab>
        <Tabs.Tab value="2">Changan Oshan Prices</Tabs.Tab>
        <Tabs.Tab value="3">Changan M9 Price</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="1" p="md">
        <Title order={4} mt="md" fw={600}>
          Changan Alsvin Prices
        </Title>
        <Text my="md">
          The revised prices for Changan Alsvin variants are as
          follows:
        </Text>
        <List size="md">
          <List.Item mb="sm">
            The base Alsvin 1.3L M/T Comfort variant will now be
            priced at Rs. 3,799,000, down from the previous price of
            Rs. 4,149,000, reflecting a reduction of Rs. 350,000.
          </List.Item>
          <List.Item mb="sm">
            The price of the Alsvin 1.5L DCT Comfort has also been
            reduced by Rs. 350,000, bringing the car’s price to Rs.
            4,349,000 from the former rate of Rs. 4,699,000.
          </List.Item>
          <List.Item mb="sm">
            The top-of-the-line Alsvin 1.5L DCT AT Lumiere variant
            has witnessed a decrease of Rs. 450,000, resulting in a
            new price of Rs. 4,549,000 compared to the previous rate
            of Rs. 4,999,000.
          </List.Item>
        </List>

        <Title order={4} mt="xl" fw={600}>
          Changan Oshan Prices
        </Title>
        <Text my="md">
          The revised prices for Changan Oshan X7 variants are as
          follows:
        </Text>
        <List size="md">
          <List.Item mb="sm">
            The Changan Oshan X7 Comfort variant will now be
            available at Rs. 8,299,000, a decrease from the previous
            price of Rs. 8,549,000, marking a reduction of Rs.
            250,000.
          </List.Item>
          <List.Item mb="sm">
            The price of Oshan X7 FutureSense has also been lowered
            by Rs. 250,000, bringing the car’s price to Rs.
            8,949,000 from the previous rate of Rs. 9,199,000.
          </List.Item>
        </List>
        <Title order={4} mt="xl" mb="md" fw={600}>
          Changan M9 Price
        </Title>
        <Text mb="md">
          Changan Sherpa (M9) has also undergone a reduction of Rs.
          350,000, with the pickup now priced at Rs. 2,179,000, down
          from the previous price of Rs. 2,529,000.
        </Text>
        <Text mb="md">
          The primary reason behind these price reductions is the
          appreciation of the Pakistani Rupee (PKR) against the US
          Dollar (USD). Local car companies are passing on these
          benefits to the customers. Other prominent automakers such
          as Kia, MG, Toyota, Honda, and Hyundai Pakistan have also
          recently announced price reductions. This is welcoming
          news for consumers, as prices have gradually exceeded
          their affordability in recent years.
        </Text>
        <Text mb="md">
          What are your thoughts on the drop in Changan car prices?
          Would you consider purchasing one now? Share your opinions
          in the comments section.
        </Text>

        <Box className="post-meta-info" mt="xl">
          <Group>
            <Image
              w={50}
              h={50}
              src="/pak-wheel.png"
              alt="Pak Wheel Logo"
              className="img-fluid"
            />
            <Box>
              <Title order={4} fw={600}>
                Sadia Malik
              </Title>
              <Text size="md">
                I am content writer at AutoWheels Pakistan. I love
                Automobile and Technology.
              </Text>
              <ActionIcon.Group mt="xs">
                <ActionIcon variant="transparent" color="#333">
                  <BiLogoInstagramAlt
                    style={{ width: rem(40), height: rem(40) }}
                  />
                </ActionIcon>
                <ActionIcon variant="transparent" color="#333">
                  <BsTwitterX
                    style={{ width: rem(20), height: rem(20) }}
                  />
                </ActionIcon>
                <ActionIcon variant="transparent" color="#333">
                  <BsYoutube
                    style={{ width: rem(20), height: rem(20) }}
                  />
                </ActionIcon>
              </ActionIcon.Group>
            </Box>
          </Group>
        </Box>
      </Tabs.Panel>
    </Tabs>
  </Card>
  )
}

export default BlogDetailHtml
