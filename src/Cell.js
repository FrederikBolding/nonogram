import { Box } from "@chakra-ui/react";

export const Cell = ({ onClick, cell }) => (
  <Box
    minW="30px"
    minH="30px"
    borderRadius="10px"
    border="2px solid #ccc"
    background={cell.userSolution === 1 ? "#424242" : "none"}
    onMouseDown={onClick}
    draggable={false}
    userSelect="none"
  >
    {cell.userSolution}
  </Box>
);
