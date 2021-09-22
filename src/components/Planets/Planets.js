import React, { useEffect, useState } from "react";
import { getListOfDataResourcesBySearch } from "../../utils";
import "./Planets.css";

import Chart from "../Chart/Chart";

function Planets() {
  const [plantes, setPlantes] = useState([]);
  const [loader, setLoader] = useState(true);

  const getPlaentsResourcesByPlaentsNames = (list) => {
    getListOfDataResourcesBySearch(list).then((res) => {
      setPlantes(res);
      setLoader(false);
    });
  };

  useEffect(() => {
    getPlaentsResourcesByPlaentsNames([
      "Tatooine",
      "Alderaan",
      "Naboo",
      "Bespin",
      "Endor",
    ]);
  }, []);

  return loader ? (
    <div className="loader">Loading...</div>
  ) : (
    <Chart data={plantes} height={600} />
  );
}

export default Planets;
