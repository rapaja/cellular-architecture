import "./App.css";
import NavigationBar from "./NavigationBar";
import Automaton from "./Automaton";

function App() {
  return (
    <div class="container-fluid">
      <NavigationBar></NavigationBar>
      <Automaton height="25" width="25" states_no="2" />
    </div>
  );
}

export default App;
