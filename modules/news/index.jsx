"use client";
import React from "react";
import {
  Box,
  Text,
  Title,
  Image,
  Group,
  Card,
  Stack,
  Grid,
  Anchor,
  Badge,
  Tabs,
  List,
  ActionIcon,
  rem,
  TextInput,
  Button,
  Checkbox,
  Textarea,
} from "@mantine/core";
import {
  FacebookCircle,
  YoutubeCircle,
  InstagramCircle,
} from "@/components/Icons";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { Form } from "@mantine/form";

const NewsModule = () => {
  return (
    <>
      <Box component="section" className="blog-page" pt={60} pb="xl">
        <Box className="container">
          <Box className="row">
            <Box className="col-md-12" mt="md">
              <Title order={2} mb="lg">
                Top
                <Text span className="text-primary" inherit>
                  {" "}
                  News
                </Text>
              </Title>
            </Box>
            <Box className="col-md-8">
              {/* Large Post */}
              <Box className="article-large" component="article">
                <Image
                  mb="md"
                  src="/blogs/img-large.png"
                  radius="md"
                  alt="Norway"
                  className="img-fluid"
                />
                <Text lineClamp={4} size="md">
                  Atlas Honda, commonly known as Honda Bikes, has recorded the
                  highest quarterly profits in the September 30, 2023 quarter.
                  According to its letter to the Pakistan Stock Exchange (PSX).
                  Atlas Honda, commonly known as Honda Bikes, has recorded the
                  highest quarterly profits in the September 30, 2023 quarter.
                  According to its letter to the Pakistan Stock Exchange (PSX).
                </Text>
              </Box>
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

                  {/* <Tabs.Panel value="2"  p="md">Messages tab content</Tabs.Panel>

                    <Tabs.Panel value="3"  p="md">Settings tab content</Tabs.Panel> */}
                </Tabs>
              </Card>

              {/* Reply Section */}
              <Box component="section" mt="xl">
                <Title order={3} mb="xs">
                  Leave a reply
                </Title>
                <Text mb="md">
                  Your email address will not be published. Required fields are
                  marked
                </Text>
                <form>
                  <Box className="row">
                    <Box className="col-md-6" mb="md">
                      <TextInput
                        size="md"
                        label="Name*"
                        placeholder="Enter Name"
                        required
                      />
                    </Box>
                    <Box className="col-md-6" mb="md">
                      <TextInput
                        label="Email"
                        placeholder="Enter Email"
                        required
                        size="md"
                      />
                    </Box>
                    <Box className="col-md-12">
                      <Textarea
                        size="md"
                        label="Message"
                        required
                        rows={5}
                        maxRows={5}
                      />
                    </Box>
                    <Box className="col-md-12" my="lg">
                      <Checkbox
                        label="Save my name, email, and website in this browser for the next time I comment."
                        size="md"
                      ></Checkbox>
                    </Box>
                    <Box className="col-md-12">
                      <Button
                        size="md"
                        color="#EB2321"
                        autoContrast
                        ff="heading"
                        tt="uppercase"
                      >
                        Post Comment
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
            <Box className="col-md-4">
              <Card
                shadow="0px 4px 20px 0px #00000014"
                padding="md"
                mb="lg"
                withBorder
                className="border-light"
              >
                <Title order={5} className="title-with-border" pb="xs" mb="xs">
                  Follow Us
                </Title>
                <Grid mt="md">
                  <Grid.Col span={4}>
                    <Stack
                      align="center"
                      justify="center"
                      gap="0"
                      component={Anchor}
                    >
                      <FacebookCircle />
                      <Text fw={600} mt="xs" c="#222222">
                        563
                      </Text>
                      <Text size="sm" c="#222222">
                        Fans
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Stack
                      align="center"
                      justify="center"
                      gap="0"
                      component={Anchor}
                    >
                      <YoutubeCircle />
                      <Text fw={600} mt="xs" c="#222222">
                        20,100
                      </Text>
                      <Text size="sm" c="#222222">
                        Subscribers
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Stack
                      align="center"
                      justify="center"
                      gap="0"
                      component={Anchor}
                    >
                      <InstagramCircle />
                      <Text fw={600} mt="xs" c="#222222">
                        563
                      </Text>
                      <Text size="sm" c="#222222">
                        Followers
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>
              <Card
                mb="lg"
                shadow="0px 4px 20px 0px #00000014"
                padding="md"
                withBorder
                className="border-light"
              >
                <Title order={5} className="title-with-border" pb="xs" mb="xs">
                  Popular Posts
                </Title>
                <Box className="small-post" pb="md" mb="md">
                  <Image
                    className="img-fluid w-auto"
                    src="/blogs/bike.svg"
                    mx="auto"
                    my="md"
                  />
                  <Title order={5} fw={600}>
                    Honda 125 Price in Pakistan 2023 (September Update)
                  </Title>
                  <Text c="dimmed" mt="xs">
                    Oct 23, 2023
                  </Text>
                </Box>
                {[1, 2, 3, 4, 5].map((_, index) => {
                  return (
                    <>
                      <Box className="small-post" pb="md" mb="md" key={index}>
                        <Group grow>
                          <Image
                            className="img-fluid "
                            src="/blogs/small-car.svg"
                          />
                          <Box>
                            <Title order={6} fw={600}>
                              Toyota Corolla 2023 Price in Pakistan
                            </Title>
                            <Text c="dimmed" mt="5px" size="sm">
                              Oct 23, 2023
                            </Text>
                          </Box>
                        </Group>
                      </Box>
                    </>
                  );
                })}
              </Card>
              <Card
                shadow="0px 4px 20px 0px #00000014"
                padding="md"
                withBorder
                className="border-light"
              >
                <Title order={5} className="title-with-border" pb="xs" mb="xs">
                  Popular Tags
                </Title>
                <Group my="sm" gap="xs">
                  <Badge
                    variant="light"
                    size="lg"
                    fw={500}
                    c="#222222"
                    p="md"
                    bg="#F3F3F3"
                  >
                    Autowheels.pk
                  </Badge>
                  <Badge
                    variant="light"
                    size="lg"
                    fw={500}
                    c="#222222"
                    p="md"
                    bg="#F3F3F3"
                  >
                    Changan Alsvin Price
                  </Badge>
                  <Badge
                    variant="light"
                    size="lg"
                    fw={500}
                    c="#222222"
                    p="md"
                    bg="#F3F3F3"
                  >
                    DFSK Glory 580 Pro
                  </Badge>
                  <Badge
                    variant="light"
                    size="lg"
                    fw={500}
                    c="#222222"
                    p="md"
                    bg="#F3F3F3"
                  >
                    DFSK Glory 580 Pro
                  </Badge>
                </Group>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewsModule;
