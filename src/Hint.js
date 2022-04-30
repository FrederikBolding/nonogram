import { Box, Text } from "@chakra-ui/react";

export const Hint = ({ hint, top }) => (
  <Box display="flex" flexDirection={top ? "column" : "row"}>
    {hint.map((h) => (
      <Text px="1">{h}</Text>
    ))}
  </Box>
);
