import React, { useEffect, useState } from "react";
import Bar from "./Bar/Bar";

function Chart({ data, height }) {
  const [unitDataObject, setUnitDataObject] = useState(null);

  const measurementDataByPopulationNumber = (list) => {
    const objectOfUnitDataMeasurement = {};
    const sorted = [...list].sort((a, b) => +a.population - +b.population);
    for (const item in sorted) {
      objectOfUnitDataMeasurement[sorted[item].name] = parseInt(item) + 2;
    }
    setUnitDataObject(objectOfUnitDataMeasurement);
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
            unitDataObject
              ? height /
                (unitDataObject[item.name] / (unitDataObject[item.name] - 1))
              : 0
          }
        />
      ))}
    </div>
  );
}

export default Chart;
