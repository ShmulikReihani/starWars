import React, { useEffect, useState } from "react";
import { getAllPropertyPagesResults } from "../../utils";

import Chart from "../Chart/Chart";

function Planets() {
  const [plantes, setPlantes] = useState([]);

  const fetchData = async () => {
    const data = await getAllPropertyPagesResults("planets");
    return data;
  };

  const FilterPlanets = (list) => {
    const planetsFiltered = list.filter(({ name }) =>
      ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"].includes(name)
    );
    setPlantes(planetsFiltered);
  };

  useEffect(() => {
    fetchData()
      .then((res) => FilterPlanets(res))
      .catch((err) => console.log(err));
  }, []);

  return <Chart data={plantes} height="800" />;
}

export default Planets;
