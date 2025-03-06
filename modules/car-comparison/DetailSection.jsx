// DetailSection.jsx
import React from "react";
import { Table, Flex, Title, Image, Switch } from "@mantine/core";

const DetailSection = ({ section, setHideCommonFeatures, hideCommonFeatures }) => {
  return (
    <div className="col-md-12">
      <Flex
        justify="space-between"
        align="center"
        mb={section.title ? "lg" : "0"}
      >
        {section.title ? <Title lh="1.35" size="20px" c="#333333" order={3}>{section.title}</Title> : null}
        {section.title == "Overview" && (
          <Switch labelPosition="left" label="Hide Common Features"
            checked={hideCommonFeatures}
            onChange={(event) => setHideCommonFeatures(event.currentTarget.checked)}
          />
        )}
      </Flex>
      <Table
        // className="table-border-light"
        mb="lg"
        borderColor="hsla(0, 0%, 95%, 1)"
        withTableBorder
        withColumnBorders
        verticalSpacing="md"
        horizontalSpacing="md"
        id={section.id}
      >
        <Table.Tbody>
          {section.overviewTableData?.map((item, index) => (
            <>
              {item.type === "icon" && (
                <Table.Tr key={index} fw={600}>
                  <Table.Td colSpan={4}>
                    <Flex align="center" gap="sm">
                      <Image
                        src={item.iconURL}
                        height={40}
                        alt={item.featureName}
                      />
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
                  bg={item.isCommon ? "hsla(0, 93%, 47%, 0.03)" : item.isRowSelected && "hsla(0, 93%, 47%, 0.03)"}
                >
                  <Table.Td fw={600} size="md" c="#878787" w="20%" className="border-end-0">
                    {item.type}
                  </Table.Td>
                  <Table.Td w="25%" className="text-center" fz="16px" fw="700" c="#333">{item.first}</Table.Td>
                  <Table.Td w="25%" className="text-center" fz="16px" fw="700" c="#333">{item.second}</Table.Td>
                  <Table.Td w="25%" className="text-center" fz="16px" fw="700" c="#333">{item.third}</Table.Td>
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
