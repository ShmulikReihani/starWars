import "./App.css";
import Planets from "./components/Planets/Planets";
import Container from "./components/UI/Container/Container";
import VehicleInfoTable from "./components/VehicleInfoTable/VehicleInfoTable";

function App() {
  return (
    <div className="App">
      <Container>
        <VehicleInfoTable />
        <Planets />
      </Container>
    </div>
  );
}

export default App;
