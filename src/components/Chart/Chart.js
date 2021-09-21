import React, { useEffect, useState } from "react";
import Bar from "./Bar/Bar";

function Chart({ data }) {
  const [unitData, setUnitData] = useState({});

  const measurementData = (list) => {
    const datad = {};
    const copylist = list;
    const sorted = copylist.sort((a, b) =>
      +a.population > +b.population ? 1 : +b.population > +a.population ? -1 : 0
    );
    for (const item in sorted) {
      datad[list[item].name] = parseInt(item) + 2;
    }
    setUnitData(datad);
  };

  useEffect(() => {
    measurementData(data);
    console.log("unitData", unitData);
  }, []);

  useEffect(() => {
    console.log("unitData", unitData);
  }, [unitData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "50%",
        margin: "0 auto",
        height: "600px",
      }}
    >
      {data.map((item) => (
        <Bar
          key={item.name}
          name={item.name}
          population={item.population}
          height={
            unitData !== 0
              ? 600 / (unitData[item.name] / (unitData[item.name] - 1))
              : 0
          }
        />
      ))}
    </div>
  );
}

export default Chart;
