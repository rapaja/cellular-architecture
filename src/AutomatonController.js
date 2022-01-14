import React from "react";

function AutomatonController(props) {
  function renderStartStopBtn(isRunning) {
    if (!isRunning) {
      return (
        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={props.start_action}
        >
          <i class="bi bi-play text-primary"></i> Start
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={props.stop_action}
        >
          <i class="bi bi-stop text-primary"></i> Stop
        </button>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={props.advance_action}
        disabled={props.isRunning}
      >
        Next
      </button>
      {renderStartStopBtn(props.isRunning)}
    </nav>
  );
}

export default AutomatonController;
