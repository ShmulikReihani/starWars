import React, { useEffect, useState } from "react";
import { getVehiclesPilotsPlanetsPolulation } from "../../utils";
import TableRow from "@mui/material/TableRow";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";

function VehicleHighest() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleHighest, setvehicleHighest] = useState({});
  const [vehicleHighestName, setvehicleHighestName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const data = await getVehiclesPilotsPlanetsPolulation("vehicles");
    console.log(data);
    setVehicles(data);
  };

  const findHighestVehicle = () => {
    let max = 0;
    for (let k in vehicles) {
      const highest = vehicles[k].pilotsPopulationSum;
      if (highest > max) {
        max = highest;
        setvehicleHighest(vehicles[k]);
        setvehicleHighestName(k);
      }
    }

    console.log("vehicleHighest", vehicleHighest);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    findHighestVehicle();
  }, [vehicles]);

  useEffect(() => {
    console.log("vehicleHighest", vehicleHighest);
  }, [vehicleHighest]);

  return (
    // <div>
    //   <div>
    //     <div>vehicleName: {vehicleHighestName}</div>
    //     <div>
    //       homeWorldName:
    //       {vehicleHighest && vehicleHighest.homePlanetsAndPopulation
    //         ? vehicleHighest.homePlanetsAndPopulation[0].homeWorldName
    //         : null}
    //     </div>
    //     <div>
    //       homeWorldName:
    //       {vehicleHighest && vehicleHighest.homePlanetsAndPopulation
    //         ? vehicleHighest.homePlanetsAndPopulation[0].homeWorldPopuation
    //         : null}
    //     </div>
    //     <div>
    //       Related pilot names:{" "}
    //       {vehicleHighest && vehicleHighest.vechilePilots
    //         ? vehicleHighest.vechilePilots.map((pilots) => (
    //             <div key={pilots}>{pilots}</div>
    //           ))
    //         : null}
    //     </div>
    //   </div>
    // </div>

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Vehicle name</TableCell>
            <TableCell align="right">home planets</TableCell>
            <TableCell align="right">population</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VehicleHighest;
