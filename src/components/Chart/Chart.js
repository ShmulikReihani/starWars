import React, { useEffect, useState } from "react";
import Bar from "./Bar/Bar";

function Chart({ data, height }) {
  const [scales, setScales] = useState(null);

  /**
   * make scales object to list of data
   */
  const measurementDataByPopulationNumber = (list) => {
    const scalesObject = {};
    const sorted = [...list].sort((a, b) => +a.population - +b.population);
    for (const item in sorted) {
      scalesObject[sorted[item].name] = parseInt(item) + 2;
    }
    setScales(scalesObject);
  };

  useEffect(() => {
    measurementDataByPopulationNumber(data);
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "50%",
        margin: "0 auto",
        height: `${height}px`,
      }}
    >
      {data.map((item) => (
        <Bar
          key={item.name}
          name={item.name}
          population={item.population}
          height={
            scales ? height / (scales[item.name] / (scales[item.name] - 1)) : 0
          }
        />
      ))}
    </div>
  );
}

export default Chart;
