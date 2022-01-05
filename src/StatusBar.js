import React from "react";

function StatusBar(props) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <label>Total ticks: {props.ticks}</label>
      <label style={{ margin: 2 }}>Running: {props.running.toString()}</label>
      <label style={{ margin: 2 }}>Epoch: {props.epoch}</label>
    </nav>
  );
}

export default StatusBar;
