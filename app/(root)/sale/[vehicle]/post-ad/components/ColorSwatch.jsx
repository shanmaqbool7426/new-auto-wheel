import { Box, Flex, Text } from '@mantine/core';

/**
 * ColorSwatch Component
 * Renders a color swatch with title for color selection
 */
const ColorSwatch = ({ color, title }) => (
    <Flex align="center" gap="sm">
      <Box
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: color,
          border: '1px solid #ddd'
        }}
      />
      <Text>{title}</Text>
    </Flex>
  );

export default ColorSwatch;