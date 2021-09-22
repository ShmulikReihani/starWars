import React, { useEffect, useState } from "react";
import Bar from "./Bar/Bar";

function Chart({ data, height }) {
  const [unitData, setUnitData] = useState(null);

  const measurementData = (list) => {
    const datad = {};
    const sorted = [...list].sort((a, b) => +a.population - +b.population);
    for (const item in sorted) {
      datad[sorted[item].name] = parseInt(item) + 2;
    }
    setUnitData(datad);
  };

  useEffect(() => {
    measurementData(data);
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
            unitData
              ? height / (unitData[item.name] / (unitData[item.name] - 1))
              : 0
          }
        />
      ))}
    </div>
  );
}

export default Chart;
