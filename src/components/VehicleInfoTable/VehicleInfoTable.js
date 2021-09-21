import React, { useEffect, useState } from "react";
import { getVehiclesPilotsPlanetsPolulation } from "../../utils";
import "./VehicleInfoTable.css";

function VehicleInfoTable() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [vehicleHighestName, setvehicleHighestName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const data = await getVehiclesPilotsPlanetsPolulation();
    console.log(data);
    setVehicles(data);
  };

  const findVehicleWithMostPopulation = () => {
    let max = 0;
    console.log("vehicles", vehicles);
    for (let vehicleName in vehicles) {
      const highest = +vehicles[vehicleName].pilotsPopulationSum;
      if (highest > max) {
        max = highest;
        setVehicleInfo(vehicles[vehicleName]);
        setvehicleHighestName(vehicleName);
      }
    }

    console.log("vehicleHighest", vehicleInfo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    findVehicleWithMostPopulation();
  }, [vehicles]);

  useEffect(() => {
    console.log("vehicleHighest", vehicleInfo);
  }, [vehicleInfo]);

  return (
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
