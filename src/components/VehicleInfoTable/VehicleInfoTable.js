import { useEffect, useState } from "react";
import { getVehiclesPilotsPlanetsPolulation } from "../../utils";
import "./VehicleInfoTable.css";

function VehicleInfoTable() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [vehicleHighestName, setvehicleHighestName] = useState("");

  const fetchData = async () => {
    return await getVehiclesPilotsPlanetsPolulation();
  };

  const findVehicleWithMostPopulation = () => {
    let max = 0;
    for (let vehicleName in vehicles) {
      const highest = +vehicles[vehicleName].pilotsPopulationSum;
      if (highest > max) {
        max = highest;
        setVehicleInfo(vehicles[vehicleName]);
        setvehicleHighestName(vehicleName);
      }
    }
  };

  useEffect(() => {
    fetchData()
      .then((res) => setVehicles(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    findVehicleWithMostPopulation();
  }, [vehicles]);

  return !vehicleInfo.homePlanetsAndPopulation &&
    !vehicleInfo.homePlanetsAndPopulation &&
    !vehicleInfo.vechilePilots ? (
    <div className="loader">Loading...</div>
  ) : (
    <div style={{ margin: "0 auto", width: "fit-content" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>HomeWorld Name & Popuation</th>
            <th>Related Pilot Names</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{vehicleHighestName}</td>
            <td>
              {vehicleInfo && vehicleInfo.homePlanetsAndPopulation
                ? vehicleInfo.homePlanetsAndPopulation[0].homeWorldName
                : null}{" "}
              :
              {vehicleInfo && vehicleInfo.homePlanetsAndPopulation
                ? vehicleInfo.homePlanetsAndPopulation[0].homeWorldPopuation
                : null}
            </td>
            <td>
              {vehicleInfo && vehicleInfo.vechilePilots
                ? vehicleInfo.vechilePilots.map((pilot) => (
                    <div key={pilot}>{pilot}</div>
                  ))
                : null}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default VehicleInfoTable;
