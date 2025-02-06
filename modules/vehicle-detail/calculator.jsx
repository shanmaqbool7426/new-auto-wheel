"use client";
import { useState, useEffect } from "react";
import {
  Group,
  Title,
  Badge,
  Slider,
  Text,
  Button,
  Image,
  Box,
  rem,
  Card,
  ActionIcon,
  ThemeIcon,
} from "@mantine/core";
import ViewLoanBreakup from "@/components/ui/ViewLoanBreakup";

function EMICalculator({ data }) {
  const [loanAmount, setLoanAmount] = useState(100000); // Setting a default loan amount for example
  const [interestRate, setInterestRate] = useState(14.5);
  const [duration, setDuration] = useState(4);
  const [emi, setEmi] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [downPayment, setDownPayment] = useState(0);
  const [loanPayment, setLoanPayment] = useState(0);
  const [interestPayment, setInterestPayment] = useState(0);
  const [payablePayment, setPayablePayment] = useState(0);
  const [yearWiseEMI, setYearWiseEMI] = useState([]);

  // Utility function to format price
  const formatPrice = (price) => price.toLocaleString("en-IN");

  // EMI calculation function
  const calculateEMI = () => {
    const principalAmount = loanAmount; // P
    const monthlyInterestRate = interestRate / 12 / 100; // R
    const totalMonths = duration * 12; // N

    // EMI Calculation formula
    const emiValue =
      (principalAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    setEmi(Math.round(emiValue));

    // Calculate other payments and year-wise EMI breakdown
    calculateLoanBreakup(
      principalAmount,
      monthlyInterestRate,
      totalMonths,
      emiValue
    );
  };

  const calculateLoanBreakup = (
    principalAmount,
    monthlyInterestRate,
    totalMonths,
    emiValue
  ) => {
    const downPaymentAmount = (data?.price || 470000) - principalAmount; // Correctly calculating down payment
    setDownPayment(downPaymentAmount);

    const totalPayment = emiValue * totalMonths;
    const loanAmountAfterDownPayment = principalAmount;
    const totalInterest = totalPayment - loanAmountAfterDownPayment;
    setInterestPayment(Math.round(totalInterest));
    setPayablePayment(Math.round(totalPayment));
    setLoanPayment(loanAmountAfterDownPayment);

    // Calculate year-wise EMI breakdown
    calculateYearWiseEMI(loanAmountAfterDownPayment);
  };

  const calculateYearWiseEMI = (principalAmount) => {
    const yearlyEMI = [];
    for (let year = 1; year <= 5; year++) {
      const tenureMonths = year * 12;
      const monthlyInterestRate = interestRate / 12 / 100;
      const emiValue =
        (principalAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, tenureMonths)) /
        (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
      const totalInterest = emiValue * tenureMonths - principalAmount;
      yearlyEMI.push({
        tenure: year,
        interestAmount: Math.round(totalInterest),
        emi: Math.round(emiValue),
      });
    }
    setYearWiseEMI(yearlyEMI);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, duration]);

  return (
    <>
      <Box className="calc-container mt-4">
        <Card py="lg" shadow="0px 4px 20px 0px #00000014">
          <Box className="row">
            <Box className="col-md-7">
              <Title order={3} mb="xs">
                EMI calculator
              </Title>
              <Text ff="heading" c="dimmed" size="sm" mb="lg">
                Avail upto 100% of the car value in finance at attractive
                interest rates
              </Text>
              <Box className="slider-wrapper" mb="xl">
                <Group justify="space-between" align="center" mb="sm">
                  <Title fw={600} size={rem(16)} lts={-0.5}>
                    Loan Amount
                  </Title>
                  <Badge color="#EB2321" size="lg" radius="sm" lts={-0.5}>
                    Rs {formatPrice(loanAmount)}
                  </Badge>
                </Group>

                <Slider
                  thumbSize={25}
                  size="xs"
                  color="#EB2321"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={0}
                  max={data?.price || 1000000}
                  step={10000}
                  styles={{
                    thumb: {
                      boxShadow: "0px 2px 5px 0px #00000033",
                      width: "20px",
                      height: "20px",
                      border: "3px solid #FFFFFF",
                      backgroundColor: "#E90808",
                    },
                    bar: { height: "3px" },
                    track: { height: "3px" },
                  }}
                />
                <Group justify="space-between" align="center">
                  <Text mt="xs" size={rem(14)} fw={600}>
                    Rs 0
                  </Text>
                  <Text mt="xs" size={rem(14)} fw={600}>
                    Rs {formatPrice(data?.price || 1000000)}
                  </Text>
                </Group>
              </Box>
              <Box className="slider-wrapper">
                <Group justify="space-between" align="center" mb="sm" >
                  <Title fw={600} size={rem(16)} lts={-0.5}>
                    Rate of Interest
                  </Title>
                  <Badge color="#EB2321" size="lg" radius="sm" lts={-0.5}>
                    {interestRate}%
                  </Badge>
                </Group>

                <Slider
                  thumbSize={25}
                  size="xs"
                  color="#EB2321"
                  value={interestRate}
                  onChange={setInterestRate}
                  min={0}
                  max={18}
                  step={0.1}
                  styles={{
                    thumb: {
                      boxShadow: "0px 2px 5px 0px #00000033",
                      width: "20px",
                      height: "20px",
                      border: "3px solid #FFFFFF",
                      backgroundColor: "#E90808",
                    },
                    bar: { height: "3px" },
                    track: { height: "3px" },
                  }}
                />
                <Group justify="space-between" align="center">
                  <Text mt="xs" size={rem(14)} fw={600}>
                    0%
                  </Text>
                  <Text mt="xs" size={rem(14)} fw={600}>
                    18%
                  </Text>
                </Group>
              </Box>
              <Box className="duration-wrapper" mt="lg">
                <Title size={rem(16)} fw={600}>
                  Duration
                  <Text size="sm" span fw="normal" ml={5}>
                    in years
                  </Text>
                </Title>
                <Group mt="md" gap="sm" align="center">
                  {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                    <ThemeIcon
                      autoContrast
                      bg={year === duration ? "#E90808" : "#FFFFFF"}
                      bd={
                        year === duration
                          ? "1px solid #E90808"
                          : "1px solid #3338461A"
                      }
                      c={year === duration ? "#FFFFFF" : "#222222"}
                      w={50}
                      h={50}
                      radius={50}
                      fw={700}
                      variant="outline"
                      key={year}
                      className="cursor"
                      // className={`duration-btn ${
                      //   year === duration ? "active" : ""
                      // }`}
                      onClick={() => setDuration(year)}
                    >
                      {year}
                    </ThemeIcon>
                  ))}
                </Group>
                <Box className="card emi-card">
                  <Box className="card-body align-items-center flex-row justify-content-between">
                    <Box className="left-area">
                      <Text size={rem(14)}>Your Monthly EMI</Text>
                      <Text fz={rem(20)} fw={600} order={2}>
                        Rs {formatPrice(emi.toFixed(2))}
                      </Text>
                    </Box>
                    <Box className="right">
                      <Button
                        onClick={() => setShowModal(true)}
                        variant="transparent"
                        color="#E90808"
                        ff="heading"
                        size="md"
                      >
                        View Breakup
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Title order={6} fw={400} c="dimmed" mt="sm">
                  Interest rate and loan amount offered may vary subject to
                  customer risk profile
                </Title>
                <Text size={rem(14)} ff="heading" mt="md">
                  550+ customers availed the facility
                </Text>
              </Box>
            </Box>
            <Box className="col-md-5">
              <Image
                alt="My image"
                src="/calc-placeholder.svg"
                className="image-placeholder"
              />
            </Box>
          </Box>
        </Card>
      </Box>
      {/* Pass computed values to `ViewLoanBreakup` */}
      <ViewLoanBreakup
        opened={showModal}
        close={() => setShowModal(false)}
        loanAmount={loanAmount}
        interestRate={interestRate}
        tenureYears={duration}
        emiAmount={emi}
        downPayment={downPayment}
        loanPayment={loanPayment}
        interestPayment={interestPayment}
        payablePayment={payablePayment}
        yearWiseEMI={yearWiseEMI}
      />
    </>
  );
}

export default EMICalculator;
