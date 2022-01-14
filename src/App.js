import "./App.css";
// import NavigationBar from "./NavigationBar";
import Automaton from "./Automaton";

function App() {
  return (
    <div class="container-fluid">
      {/* <NavigationBar></NavigationBar> */}
      <Automaton height="30" width="30" states_no="5" />
    </div>
  );
}

export default App;
