import { Box, Text } from "@chakra-ui/react";

export const Hint = ({ hint, row, top }) => {
  // @todo This doesn't work for all cases yet.
  const isSatisfied =
    row.reduce((acc, cur) => {
      const currentHint = acc[0];
      if (currentHint - 1 === 0 && cur.userSolution > 0) {
        return acc.slice(1);
      }
      if (currentHint > 0 && cur.userSolution > 0) {
        return [currentHint - 1, ...acc.slice(1)];
      }
      if (!currentHint && cur.userSolution > 0) {
        // Too many 1s in one row
        return [Infinity];
      }
      return acc;
    }, hint).length === 0;
  return (
    <Box
      display="flex"
      flexDirection={top ? "column" : "row"}
      textDecoration={isSatisfied && "line-through"}
      justifyContent={!top && "flex-end"}
      mr={!top && "1"}
      mb={top && "1"}
    >
      {hint.map((h) => (
        <Text px="1">{h}</Text>
      ))}
    </Box>
  );
};
