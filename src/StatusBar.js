import React from "react";

function StatusBar(props) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <label>Total ticks: {props.ticks}</label>
    </nav>
  );
}

export default StatusBar;
