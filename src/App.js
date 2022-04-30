import { useMemo, useState } from "react";
import "./App.css";
import { Creator } from "nonogram";
import { Cell } from "./Cell";
import { Hint } from "./Hint";
import { Box, Button } from "@chakra-ui/react";

const creator = new Creator();

function App() {
  const WIDTH = 8;
  const HEIGHT = 8;
  const puzzle = useMemo(() => creator.createRandom(WIDTH, HEIGHT), []);

  const [currentSelection, setCurrentSelection] = useState(1);
  const [userSolution, setUserSolution] = useState(
    new Array(WIDTH * HEIGHT).fill(null)
  );

  const rows = puzzle.cells.reduce((acc, cur, idx) => {
    const toAdd = { ...cur, userSolution: userSolution[idx] };
    if (idx % puzzle.width === 0) {
      return [...acc, [toAdd]];
    }
    const before = acc.slice(0, -1);
    const current = acc.slice(-1)[0];
    return [...before, [...current, toAdd]];
  }, []);

  const isSolved = puzzle.cells.reduce((acc, cur, idx) => {
    return acc && cur.solution === (userSolution[idx] ?? 0);
  }, true);

  const topHints = puzzle.columnHints;
  const leftHints = puzzle.rowHints;

  const onClick = (idx) => {
    const before = userSolution.slice(0, idx);
    const after = userSolution.slice(idx + 1);
    const currentValue = userSolution[idx];
    if (currentValue !== null && currentValue !== currentSelection) {
      return;
    }
    const newValue =
      currentValue === currentSelection ? null : currentSelection;
    const result = [...before, newValue, ...after];
    setUserSolution(result);
  };

  return (
    <div className="App">
      <header>Marias Nonogram</header>
      <Box display="flex" justifyContent="center" userSelect="none">
        <table>
          <thead>
            <tr>
              <th></th>
              {rows.map((row, idx) => (
                <th>
                  <Hint hint={topHints[idx]} top={true} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr>
                <th>
                  <Hint hint={leftHints[idx]} />
                </th>
                {row.map((cell) => (
                  <td>
                    <Cell cell={cell} onClick={() => onClick(cell.index)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box>
        <Button onClick={() => setCurrentSelection(1)}>1</Button>
        <Button onClick={() => setCurrentSelection(0)}>0</Button>
      </Box>
      <Box>{JSON.stringify(isSolved)}</Box>
    </div>
  );
}

export default App;
