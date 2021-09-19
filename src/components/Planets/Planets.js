import React, { useEffect, useState } from "react";
import { getAllPropertyPagesResults } from "../../utils";
import { scaleLinear, scaleBand } from "d3-scale";

const viewBox = [1000, 450];

const y = scaleLinear()
  .range([viewBox[1] - 20, 0])
  .domain([0, 0.14]);

function Planets() {
  //   const Chart = ({ children, height, width }) => (
  //     <svg
  //       viewBox={`0 0 ${width} ${height}`}
  //       height={height}
  //       width={width}
  //       preserveAspectRatio="xMidYMax meet"
  //     >
  //       {children}
  //     </svg>
  //   );

  //   const Bar = ({ fill = "#000", x, y, height, width }) => (
  //     <rect fill={fill} x={x} y={y} height={height} width={width} />
  //   );

  //   const greatestValue = (values) =>
  //     values.reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);

  //   const BarChart = ({ data }) => {
  //     const barWidth = 20;
  //     const barMargin = 5;
  //     const width = data.length * (barWidth + barMargin);
  //     const height = greatestValue(data.map((datum) => datum.population % 450));

  //     return (
  //       <Chart height={height} width={width}>
  //         {data.map((datum, index) => (
  //           <Bar
  //             key={datum.name}
  //             fill="teal"
  //             x={index * (barWidth + barMargin)}
  //             y={datum.population % 450}
  //             width={barWidth}
  //             height={datum.population % 450}
  //           />
  //         ))}
  //       </Chart>
  //     );
  //   };

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

  useEffect(() => {
    console.log("filter", plantes);
  }, [plantes]);

  const scale = scaleBand()
    .rangeRound([0, viewBox[0] - 20])
    .domain(plantes.map((d) => d.name))
    .padding(0.25);
  return (
    // <BarChart data={plantes} />
    // <svg
    //   class="chart"
    //   width="420"
    //   height="150"
    //   aria-labelledby="title desc"
    //   role="img"

    // >
    //   {/* {plantes.map((plante) => (
    //     <g class="bar" style={{ height: "21px" }}>
    //       <rect width="40" height="19"></rect>
    //       <text
    //         x={+plante.population / (+plante.population / 2)}
    //         y="9.5"
    //         dy=".35em"
    //       >
    //         {plante.name}
    //       </text>
    //     </g>
    //   ))} */}
    //   <g class="bar" style={{ height: "21px" }}>
    //     <rect width={200000 % 420} height="19"></rect>
    //     <text x={200000 % 420} y={9.5 % 150} dy=".35em">
    //       1
    //     </text>
    //   </g>
    // </svg>

    <svg
      className="chart"
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      width="100%"
      height="100%"
    >
      <g transform="translate(10,10)">
        {plantes.map((entry) => {
          return (
            <g key={entry.name} transform={`translate(${scale(entry.name)},0)`}>
              <rect
                height={viewBox[1] - y(entry.population)}
                y={y(entry.population)}
                opacity="0.7"
                width={scale.bandwidth()}
              />
              <text
                x={scale.bandwidth() / 2}
                y={viewBox[1] + 20}
                dx="-.35em"
                fill="#333"
              >
                {entry.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default Planets;
