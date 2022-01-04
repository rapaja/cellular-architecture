import React from "react";

function AutomatonController(props) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={props.advance}
      >
        Next
      </button>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Start
      </button>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Stop
      </button>
    </nav>
  );
}

export default AutomatonController;
