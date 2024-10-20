// DetailSection.jsx
import React from "react";
import { Table, Flex, Title, Image, Switch } from "@mantine/core";

const DetailSection = ({ section }) => {
  return (
    <div className="col-md-12">
      <Flex justify="space-between" align="center" mb={section.title ? "lg" : "0"}>
        {section.title ? <Title order={3}>{section.title}</Title> : null}
        {section.isSwitchable && <Switch labelPosition="left" label="Hide Common Features" />}
      </Flex>

      <Table
        className="table-border-light"
        mb="lg"
        borderColor="hsla(0, 0%, 95%, 1)"
        withTableBorder
        withColumnBorders
        verticalSpacing="md"
        horizontalSpacing="md"
      >
        <Table.Tbody>
          {section.overviewTableData?.map((item, index) => (
            <>
              {item.type === "icon" && (
                <Table.Tr key={index} fw={600}>
                  <Table.Td colSpan={4}>
                    <Flex align="center" gap="sm">
                      <Image src={item.iconURL} height={40} alt={item.featureName} />
                      <Title order={4}>{item.featureName}</Title>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              )}
              {
                item.type !== "icon" &&
                <Table.Tr
                  key={index}
                  fw={600}
                  bg={item.isRowSelected && "hsla(0, 93%, 47%, 0.03)"}
                >
                  <Table.Td fw={600} size="md" c="dimmed" w="20%" className="border-end-0">
                    {item.type}
                  </Table.Td>
                  <Table.Td w="25%" className="text-center">{item.first}</Table.Td>
                  <Table.Td w="25%" className="text-center">{item.second}</Table.Td>
                  <Table.Td w="25%" className="text-center">{item.third}</Table.Td>
                </Table.Tr>
              }
            </>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default DetailSection;
