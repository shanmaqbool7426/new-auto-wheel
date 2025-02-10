"use client";
import Link from "next/link";
import {
  useMantineTheme,
  UnstyledButton,
  Group,
  ThemeIcon,
  Loader,
  rem,
  HoverCard,
  Center,
  Box,
  Anchor,
  Text,
  Divider,
  SimpleGrid,
  Button,
  Burger,
  Drawer,
  ScrollArea,
  Collapse,
  List,
  Title,
  Image,
  Accordion,
  NavLink,
  Menu,
  Avatar,
  Container,
  AppShell,
} from "@mantine/core";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { BsArrowDown, BsCaretDown } from "react-icons/bs";
import { AUTH_VIEWS } from "@/constants/auth-config";
import AuthModal from "@/modules/auth/AuthModal";

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [hoverTarget, setHoverTarget] = useState("cars");
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState(
    AUTH_VIEWS.ACCOUNT_TYPE
  );
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
  };

  if (session) {
    console.log(">>>>>> session?.user?.token?.user",session.user)
    localStorage.setItem("token", JSON.stringify(session.user));
    localStorage.setItem("user", JSON.stringify(session?.user?.token?.user));
  }
  console.log(session, "session");

  const handleSignUp = (e) => {
    e.stopPropagation();
    setInitialAuthView(AUTH_VIEWS.ACCOUNT_TYPE);
    setAuthModalOpened(true);
  };

  const handleSignIn = (e) => {
    e.stopPropagation();
    setInitialAuthView(AUTH_VIEWS.SOCIAL_LOGIN);
    setAuthModalOpened(true);
  };

  // Data for cars, bikes, and trucks
  const data = {
    cars: {
      firstCol: [
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/new-car.svg" />,
          title: "New Cars",
          link: "/new/car",
          description: "Find new cars in Pakistan",
        },
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/used-cars.svg" />,
          title: "Used Cars",
          link: "/listing/cars",
          description: "Find used cars in Pakistan",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Featured Used Cars",
          link: "/listing/cars/search/-/ft_featured",
          description: "Find new cars in Pakistan",
        },
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/sale-car.svg" />,
          title: "Sell Your Cars",
          link: "/sale/car/post-ad",
          description: "Find new cars in Pakistan",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Comparison",
          link: "/comparison/car",
          description: "Compare cars",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Car Dealer",
          link: "/cars-dealership",
          description: "Car Dealership",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Car Reviews",
          link: "/reviews/car",
          description: "Car Reviews",
        },
      ],
      secondCol: [
        { title: "Suzuki Cars", link: "/listing/cars/search/-/mk_suzuki" },
        { title: "Honda Cars", link: "/listing/cars/search/-/mk_honda" },
        { title: "Toyota Cars", link: "/listing/cars/search/-/mk_toyota" },
        { title: "KIA Cars", link: "/listing/cars/search/-/mk_kia" },
        { title: "MG Cars", link: "/listing/cars/search/-/mk_mg" },
        { title: "Hyundai Cars", link: "/listing/cars/search/-/mk_hyundai" },
      ],

      thirdCol: [
        { title: "Suzuki Alto", link: "/listing/cars/search/-/mk_suzuki" },
        { title: "Honda Civic", link: "/listing/cars/search/-/mk_honda" },
        { title: "Toyota Corolla", link: "/listing/cars/search/-/mk_toyota" },
        { title: "KIA Sportage", link: "/listing/cars/search/-/mk_kia" },
        { title: "Suzuki Wagon R", link: "/listing/cars/search/-/mk_suzuki" },
        { title: "Toyota Yaris", link: "/listing/cars/search/-/mk_toyota" },
      ],
    },
    bikes: {
      firstCol: [
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/motorcycle.svg" />,
          title: "New Bikes",
          link: "/new/bike",
          description: "Find new bikes in Pakistan",
        },
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/motorcycle.svg" />,
          title: "Used Bikes",
          link: "/listing/bikes",
          description: "Find used bikes in Pakistan",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Featured Used Bikes",
          link: "/listing/bikes",
          description: "Find new bikes in Pakistan",
        },
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/sale-car.svg" />,
          title: "Sell Your Bikes",
          link: "/listing/bikes",
          description: "Find new bikes in Pakistan",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Comparison",
          link: "/comparison/bike",
          description: "Compare bikes",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Bike Reviews",
          link: "/reviews/bike",
          description: "Bike Reviews",
        },
      ],
      secondCol: [
        { title: "Honda CG 125", link: "/listing/bikes/search/-/mk_honda" },
        { title: "Yamaha YBR 125", link: "/listing/bikes/search/-/mk_yamaha" },
        { title: "Suzuki GD 110S", link: "/listing/bikes/search/-/mk_suzuki" },
        { title: "Suzuki GS 150", link: "/listing/bikes/search/-/mk_suzuki" },
        { title: "Honda Pridor", link: "/listing/bikes/search/-/mk_honda" },
      ],

      thirdCol: [
        { title: "Honda CD 70", link: "/listing/bikes/search/-/mk_honda" },
        { title: "Yamaha YBR 125", link: "/listing/bikes/search/-/mk_yamaha" },
        { title: "Suzuki GS 150", link: "/listing/bikes/search/-/mk_suzuki" },
      ],
    },
    trucks: {
      firstCol: [
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/truck.png" />,
          title: "New Trucks",
          link: "/new/truck",
          description: "Find new trucks in Pakistan",
        },
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/truck.png" />,
          title: "Used Trucks",
          link: "/listing/trucks",
          description: "Find used trucks in Pakistan",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Featured Used Trucks",
          link: "/listing/trucks",
          description: "Find new trucks in Pakistan",
        },
        {
          icon: <Image w={17} h={17} mt={3} src="/megamenu/sale-car.svg" />,
          title: "Sell Your Trucks",
          link: "/listing/trucks",
          description: "Find new trucks in Pakistan",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Comparison",
          link: "/comparison/truck",
          description: "Compare trucks",
        },
        {
          icon: (
            <Image w={17} h={17} mt={3} src="/megamenu/featured-cars.svg" />
          ),
          title: "Truck Reviews",
          link: "/reviews/truck",
          description: "Truck Reviews",
        },
      ],
      secondCol: [
        { title: "Hino", link: "/listing/trucks/search/-/mk_hino" },
        { title: "ISUZU", link: "/listing/trucks/search/-/mk_isuzu" },
        { title: "JAC", link: "/listing/trucks/search/-/mk_jac" },
        {
          title: "JW Forland",
          link: "/listing/trucks/search/-/mk_jw%20forland",
        },
        {
          title: "Master Foton",
          link: "/listing/trucks/search/-/mk_master%20foton",
        },
        {
          title: "JW Forland",
          link: "/listing/trucks/search/-/mk_jw%20forland",
        },
      ],

      thirdCol: [
        { title: "Hino", link: "/listing/trucks/search/-/mk_hino" },
        { title: "ISUZU", link: "/listing/trucks/search/-/mk_isuzu" },
        { title: "JAC", link: "/listing/trucks/search/-/mk_jac" },
        {
          title: "JW Forland",
          link: "/listing/trucks/search/-/mk_jw%20forland",
        },
        {
          title: "Master Foton",
          link: "/listing/trucks/search/-/mk_master%20foton",
        },
        {
          title: "JW Forland",
          link: "/listing/trucks/search/-/mk_jw%20forland",
        },
      ],
    },
  };

  // Function to dynamically generate first column links
  const firstColLinks = data[hoverTarget].firstCol.map((item, index) => (
    <UnstyledButton key={index} component={Link} href={item.link ?? "#"}>
      <Group wrap="nowrap" gap="xs" align="flex-start" className="subLink">
        {item.icon}
        <div>
          <Title order={6} fw={500}>
            {item.title}
          </Title>
          <Text size="sm" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const secondColLinks = (
    <>
      <Group align="center" mb="xs" gap={10}>
        <Image
          w={17}
          h={17}
          mt={3}
          src={
            hoverTarget === "cars"
              ? "megamenu/new-car.svg"
              : hoverTarget === "bikes"
              ? "megamenu/motorcycle.png"
              : "megamenu/truck.png"
          }
        />
        <Title order={6} fw={500}>
          Popular Brands {hoverTarget}
        </Title>
      </Group>
      <List listStyleType="none" withPadding>
        {data[hoverTarget].secondCol.map((item, index) => (
          <List.Item key={index} mb="xs">
            <Anchor
              component={Link}
              c="dark"
              href={item?.link ?? "#"}
              size="sm"
            >
              {item.title}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </>
  );

  const thirdColLinks = (
    <>
      <Group align="center" mb="xs" gap={10}>
        <Image w={15} h={15} src="megamenu/popular-car.svg" />
        <Title order={6} fw={500}>
          Popular{" "}
          {hoverTarget === "cars"
            ? "New Cars"
            : hoverTarget === "bikes"
            ? "New Bikes"
            : "New Trucks"}
        </Title>
      </Group>
      <List listStyleType="none" withPadding>
        {data[hoverTarget].thirdCol.map((item, index) => (
          <List.Item key={index} mb="xs">
            <Anchor component={Link} c="dark" href={item.link ?? "#"} size="sm">
              {item.title}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </>
  );

  // Show a loading spinner while session is being fetched
  if (status === "loading") {
    return (
      <Box component="header" className="header">
        <Box className="container-xl" h="100%">
          <Group justify="space-between" h="100%" wrap="nowrap">
            <Image src="/logo.png" alt="Logo" />
            <Loader size="sm" />
          </Group>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box component="header" className="header">
        <Box className="container-xl" h="100%">
          <Group justify="space-between" h="100%" wrap="nowrap">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" />
            </Link>
            <Group h="100%" gap={0} visibleFrom="md" wrap={false}>
              <HoverCard
                withArrow
                offset={0}
                radius="sm"
                shadow="0px 4px 20px 0px #00000014"
                withinPortal
              >
                <HoverCard.Target>
                  <Link
                    href="#"
                    onMouseEnter={() => setHoverTarget("cars")}
                    className="link"
                  >
                    <Center inline>
                      <Box component="span" mr={3}>
                        Cars
                      </Box>
                    </Center>
                    <IconChevronDown
                      style={{
                        width: rem(14),
                        height: rem(14),
                        marginTop: rem(2),
                      }}
                    />
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown p="lg" className="megamenu-card-dropdown">
                  <SimpleGrid cols={3} spacing="md">
                    <Box className="border-end" pr="md">
                      {firstColLinks}
                    </Box>
                    <Box className="border-end">{secondColLinks}</Box>
                    <Box>{thirdColLinks}</Box>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard
                withArrow
                offset={0}
                radius="sm"
                shadow="0px 4px 20px 0px #00000014"
                withinPortal
              >
                <HoverCard.Target>
                  <Link
                    href="#"
                    onMouseEnter={() => setHoverTarget("bikes")}
                    className="link"
                  >
                    <Center inline>
                      <Box component="span" mr={3}>
                        Bikes
                      </Box>
                      <IconChevronDown
                        style={{
                          width: rem(14),
                          height: rem(14),
                          marginTop: rem(2),
                        }}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown p="lg" className="megamenu-card-dropdown">
                  <SimpleGrid cols={3} spacing="md">
                    <Box className="border-end" pr="md">
                      {firstColLinks}
                    </Box>
                    <Box className="border-end">{secondColLinks}</Box>
                    <Box>{thirdColLinks}</Box>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>

              <HoverCard
                withArrow
                offset={0}
                radius="sm"
                shadow="0px 4px 20px 0px #00000014"
                withinPortal
              >
                <HoverCard.Target>
                  <Link
                    href="/listing/trucks/search/-/"
                    className="link"
                    onMouseEnter={() => setHoverTarget("trucks")}
                  >
                    <Center inline>
                      <Box component="span" mr={3}>
                        Truck
                      </Box>
                      <IconChevronDown
                        style={{
                          width: rem(14),
                          height: rem(14),
                          marginTop: rem(2),
                        }}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown
                  style={{ overflow: "hidden" }}
                  p="lg"
                  className="megamenu-card-dropdown"
                >
                  <SimpleGrid cols={3} spacing="md">
                    <Box className="border-end" pr="md">
                      {firstColLinks}
                    </Box>
                    <Box className="border-end">{secondColLinks}</Box>
                    <Box>{thirdColLinks}</Box>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <Link href="/blog" className="link">
                <Center inline>Blog</Center>
              </Link>
              <Link href="/videos" className="link">
                <Center inline>Videos</Center>
              </Link>
            </Group>
            <Group visibleFrom="md" wrap={false}>
              {session ? (
                <>
                  <Menu shadow="lg" width={200}>
                    <Menu.Target>
                      <Button
                        rightSection={
                          <IconChevronDown
                            style={{
                              width: rem(14),
                              height: rem(14),
                            }}
                          />
                        }
                        component={Text}
                        variant="transparent"
                        c="dark"
                        fw={500}
                      >
                        Wellcome {session.user.fullName || session.user.name} !
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Settings</Menu.Label>
                      <Menu.Item component={Link} href="/user/profile-settings">
                        Profile
                      </Menu.Item>
                      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                  {/* <Accordion>
                    <Accordion.Item value="user-info">
                      <Accordion.Control>
                        Wellcome {session.user.fullName || session.user.name} !
                      </Accordion.Control>
                      <Accordion.Panel>
                        <span
                          onClick={handleLogout}
                          style={{ cursor: "pointer" }}
                        >
                          Log out
                        </span>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion> */}
                </>
              ) : (
                <Button
                  tt="uppercase"
                  variant="outline"
                  color="#E90808"
                  autoContrast
                  ff="heading"
                >
                  <span onClick={(e) => handleSignIn(e)}>Login</span>/
                  <span onClick={(e) => handleSignUp(e)}>Signup</span>
                </Button>
              )}

              <Menu shadow="lg" radius="sm">
                <Menu.Target>
                  <Button
                    color="#E90808"
                    autoContrast
                    ff="heading"
                    tt="uppercase"
                  >
                    Post an Ad
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Anchor
                      component={Link}
                      underline="none"
                      c="dark"
                      href="/sale/car/post-ad"
                      passHref
                      fw={500}
                      size="sm"
                    >
                      Sell Your Car
                    </Anchor>
                  </Menu.Item>
                  <Menu.Item>
                    <Anchor
                      component={Link}
                      underline="none"
                      c="dark"
                      href="/sale/bike/post-ad"
                      passHref
                      fw={500}
                      size="sm"
                    >
                      Sell Your Bike
                    </Anchor>
                  </Menu.Item>
                  <Menu.Item>
                    <Anchor
                      component={Link}
                      underline="none"
                      c="dark"
                      href="/sale/truck/post-ad"
                      passHref
                      fw={500}
                      size="sm"
                    >
                      Sell Your Truck
                    </Anchor>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="md"
            />
          </Group>
        </Box>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Button
            my="sm"
            variant="transparent"
            className="link"
            component={Link}
            href="#"
          >
            Cars
          </Button>
          <Button
            my="sm"
            variant="transparent"
            className="link"
            onClick={toggleLinks}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
          >
            Bikes
          </Button>
          <Collapse in={linksOpened}>{firstColLinks}</Collapse>
          <Button
            component={Link}
            variant="transparent"
            href="#"
            className="link"
            my="sm"
          >
            Truck
          </Button>
          <Button
            component={Link}
            variant="transparent"
            href="#"
            className="link"
            my="sm"
          >
            Blog
          </Button>
          <Button
            component={Link}
            variant="transparent"
            href="#"
            className="link"
            my="sm"
          >
            Videos
          </Button>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
      {authModalOpened && (
        <AuthModal
          opened={authModalOpened}
          onClose={() => setAuthModalOpened(false)}
          initialView={initialAuthView}
        />
      )}
    </>
  );
};

export default Header;
