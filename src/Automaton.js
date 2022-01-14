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
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
      if (running) {
        caAdvance();
        // setEpoch((x) => x + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

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
    let moje_stanje = cells[row][col];

    let gore_levo = cells[row - 1][col - 1];
    let gore = cells[row - 1][col];
    let gore_desno = cells[row - 1][col + 1];

    let levo = cells[row][col - 1];
    let desno = cells[row][col + 1];

    let dole_levo = cells[row + 1][col - 1];
    let dole = cells[row + 1][col];
    let dole_desno = cells[row + 1][col + 1];

    let visina12 = 1;
    let visina9 = 2;
    let visina6 = 3;
    let visina3 = 4;
    let neizgradjeno = 0;

    if (moje_stanje === visina12) {
      return visina12;
    } else if (
      gore_levo === visina12 ||
      gore === visina12 ||
      gore_desno === visina12 ||
      levo === visina12 ||
      desno === visina12 ||
      dole_levo === visina12 ||
      dole === visina12 ||
      dole_desno === visina12
    ) {
      return visina9;
    } else if (moje_stanje === visina9) {
      return visina9;
    } else if (
      gore_levo === visina9 ||
      gore === visina9 ||
      gore_desno === visina9 ||
      levo === visina9 ||
      desno === visina9 ||
      dole_levo === visina9 ||
      dole === visina9 ||
      dole_desno === visina9
    ) {
      return visina6;
    } else {
      return moje_stanje;
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
    setEpoch((x) => x + 1);
  }

  function caStart() {
    setRunning(true);
  }

  function caStop() {
    setRunning(false);
  }

  return (
    <div>
      <AutomatonController
        advance_action={() => {
          !running && caAdvance();
        }}
        start_action={() => caStart()}
        stop_action={() => caStop()}
        isRunning={running}
      />
      <StatusBar ticks={ticks} running={running} epoch={epoch} />
      <div class="d-flex justify-content-center">{drawTable()}</div>
    </div>
  );
}

export default Automaton;
