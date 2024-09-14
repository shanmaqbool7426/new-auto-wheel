import { Button, Flex, Group, Rating, Text } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const ComparisonCard = () => {
  return (
    <div className="card comparison-card">
    <div className="card-body">
      <Group justify="space-between">
        <Flex direction="column" gap="5">
        <Image
          src="/compare/compare-product.png"
          width={143}
          height={88}
          className="img-fluid"
        />
          <Text fw={500}> 2016 Ford Escape Cape</Text>
          <Flex align="center" justify="center" gap={5}>
            <Rating defaultValue={2} />
            (4/5)
          </Flex>
        </Flex>
        <Flex direction="column" gap="5">
        <span className="compare-txt">VS</span>
            </Flex>
        <Flex direction="column" gap="5">
        <Image
          src="/compare/compare-2.png"
          width={143}
          height={88}
          className="img-fluid"
        />
          <Text fw={500}> 2016 Ford Escape Cape</Text>
          <Flex align="center" justify="center" gap={5}>
            <Rating defaultValue={2} />
            (4/5)
          </Flex>
        </Flex>

        <Button
          variant="outline"
          color="#E90808"
          fullWidth
          size="md"
        >
          Compare
        </Button>
      </Group>
    </div>
  </div>
  )
}

export default ComparisonCard
