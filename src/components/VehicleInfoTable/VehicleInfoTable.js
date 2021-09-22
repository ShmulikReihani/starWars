import { useEffect, useState } from "react";
import { getVehiclesPilotsPlanetsPolulation } from "../../utils";
import "./VehicleInfoTable.css";

function VehicleInfoTable() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [vehicleWithMostPopulationName, setVehicleWithMostPopulationName] =
    useState("");

  const fetchData = async () => {
    return await getVehiclesPilotsPlanetsPolulation();
  };

  /**
   * go throw vehicles list and find the vehicle with most pilots homeworld population
   */
  const findVehicleWithMostPopulation = () => {
    let max = 0;
    for (let vehicleName in vehicles) {
      const highest = +vehicles[vehicleName].pilotsPopulationSum;
      if (highest > max) {
        max = highest;
        setVehicleInfo(vehicles[vehicleName]);
        setVehicleWithMostPopulationName(vehicleName);
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
            <th>Homeworld Name & Popuation</th>
            <th>Related Pilot Names</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{vehicleWithMostPopulationName}</td>
            <td>
              {vehicleInfo.homePlanetsAndPopulation[0].homeWorldName}:
              {vehicleInfo.homePlanetsAndPopulation[0].homeWorldPopuation}
            </td>
            <td>
              {vehicleInfo.vechilePilots.map((pilot) => (
                <div key={pilot}>{pilot}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default VehicleInfoTable;
