import React, { useEffect, useState } from "react";
import { getAllplaentsBySearch } from "../../utils";
import "./Planets.css";

import Chart from "../Chart/Chart";

function Planets() {
  const [plantes, setPlantes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFilterPlaents = (list) => {
    getAllplaentsBySearch(list).then((res) => {
      setPlantes(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFilterPlaents(["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"]);
  }, []);

  return loading ? (
    <div className="loader">Loading...</div>
  ) : (
    <Chart data={plantes} height={600} />
  );
}

export default Planets;
