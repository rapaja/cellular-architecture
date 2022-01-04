import React, { useState, useEffect } from "react";
import AutomatonController from "./AutomatonController";
import StatusBar from "./StatusBar";

function Cell(props) {
  let cell_class = `cell cell-${props.cell_state}`;
  return <button className={cell_class} onClick={props.onClick}></button>;
}

function createTable(height, width) {
  let table = new Array(height);
  for (let row = 0; row < table.length; row++) {
    table[row] = new Array(width).fill(0);
  }
  return table;
}

function Automaton(props) {
  const height = parseInt(props.height);
  const width = parseInt(props.width);
  const states_no = parseInt(props.states_no);

  const [cells, setCells] = useState(createTable(height, width));
  const [ticks, setTicks] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function copyState() {
    return cells.map((row) => {
      return row.slice();
    });
  }

  function promoteCellState(row, col) {
    let new_cells = copyState();
    let current_state = new_cells[row][col] + 1;
    if (current_state >= states_no) {
      current_state = 0;
    }
    new_cells[row][col] = current_state;
    setCells(new_cells);
  }

  function drawRow(row) {
    return (
      <div className="board-row">
        {[...Array(parseInt(width)).keys()].map((col) => {
          return (
            <Cell
              cell_state={cells[row][col]}
              onClick={() => promoteCellState(row, col)}
            />
          );
        })}
      </div>
    );
  }

  function drawTable() {
    return (
      <div className="board">
        {[...Array(parseInt(props.height)).keys()].map((row) => {
          return drawRow(row);
        })}
      </div>
    );
  }

  function caGetNewCellState(cells, row, col) {
    let alive = cells[row][col] === 1;
    let sum =
      cells[row - 1][col - 1] +
      cells[row - 1][col] +
      cells[row - 1][col + 1] +
      cells[row][col - 1] +
      cells[row][col + 1] +
      cells[row + 1][col - 1] +
      cells[row + 1][col] +
      cells[row + 1][col + 1];
    if (alive && sum < 2) {
      return 0;
    } else if (alive && sum > 3) {
      return 0;
    } else if (!alive && sum === 3) {
      return 1;
    } else {
      return cells[row][col];
    }
  }

  function caAdvance() {
    let new_cells = copyState();
    for (let row = 1; row < new_cells.length - 1; row++) {
      for (let col = 1; col < new_cells[row].length - 1; col++) {
        new_cells[row][col] = caGetNewCellState(cells, row, col);
      }
    }
    setCells(new_cells);
  }

  return (
    <div>
      <AutomatonController advance={() => caAdvance()} />
      <StatusBar ticks={ticks} />
      <div class="d-flex justify-content-center">{drawTable()}</div>
    </div>
  );
}

export default Automaton;
