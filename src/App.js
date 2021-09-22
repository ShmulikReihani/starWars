import "./App.css";
import Planets from "./components/Planets/Planets";
import Container from "./components/UI/Container/Container";
import VehicleInfoTable from "./components/VehicleInfoTable/VehicleInfoTable";

function App() {
  return (
    <div className="App">
      <Container>
        <div
          style={{
            marginBottom: "45px",
            fontSize: "45px",
            color: "lightskyblue",
            textShadow: "1px 1px grey",
          }}
        >
          TIKAL CODE CHALLENGE - STAR WARS
        </div>
        <VehicleInfoTable />
        <Planets />
      </Container>
    </div>
  );
}

export default App;
