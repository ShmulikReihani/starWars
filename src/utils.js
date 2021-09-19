import axios from "axios";

// export const getAllPagesResults = (schemaName) => {
//   const Next = async (nextUrl, list = []) => {
//     if (!nextUrl) {
//       return list;
//     }

//     let { data } = await axios.get(nextUrl);
//     const { results, next } = data;
//     list.push(...results);
//     return await Next(next, list);
//   };

//   const url = `https://swapi.dev/api/${schemaName}`;
//   return Next(url);
// };

// export const exstractPilotsUrlLisFromVehical = (pilotsURLS) => {
//   const pilots = [];
//   pilotsURLS.map((pilotUrl) => {
//     const fetchData = async () => {
//       const pilotData = await exstractObjectNameFromUrl(pilotUrl);
//       pilots.push(pilotData);
//     };
//     fetchData();
//   });

//   return pilots;
// };

// export const query = async (url) => {
//     return (await axios.get(url)).data;
// }

// export const exstractObjectNameFromUrl = async (url) => {
//     const {}
//   return (await axios.get(url)).data;
// };

const apiUrl = "https://swapi.dev/api/";

export const getAllPropertyPagesResults = async (schema) => {
  const url = apiUrl + schema;
  let { results, next } = await getPropertySinglePageData(url);
  let allPagesResults = results;

  while (next !== null) {
    const singlePageData = await getPropertySinglePageData(next);
    next = singlePageData.next;
    results = singlePageData.results;

    allPagesResults.push(...results);
  }
  return allPagesResults;
};

export const getPropertySinglePageData = async (url) => {
  let { data } = await axios.get(url);
  let { results, next } = data;
  return { results, next };
};

export const getVehiclesPilotsPlanetsPolulation = async () => {
  let vehiclesInformationSummary = {};
  let vehicles = await getAllPropertyPagesResults("vehicles");
  for (const vehicle of vehicles) {
    const vehicleName = vehicle.name;
    const vechilePilotsUrls = vehicle.pilots;
    let pilotsPopulationSum = 0;
    const homePlanetsAndPopulation = [];
    const vechilePilots = [];
    for (const pilotUrl of vechilePilotsUrls) {
      const pilotData = await getObjectData(pilotUrl);
      const pilotName = pilotData.name;
      const pilotHomeWorld = pilotData.homeworld;
      const homeWorldData = await getObjectData(pilotHomeWorld);
      const homeWorldPopuation = homeWorldData.population;
      const homeWorldName = homeWorldData.name;
      vechilePilots.push(pilotName);
      homePlanetsAndPopulation.push({ homeWorldName, homeWorldPopuation });
      if (homeWorldPopuation !== "unknown") {
        pilotsPopulationSum =
          pilotsPopulationSum + parseInt(homeWorldPopuation);
      }
    }

    const res = {
      homePlanetsAndPopulation: homePlanetsAndPopulation,
      pilotsPopulationSum: pilotsPopulationSum,
      vechilePilots: vechilePilots,
    };

    vehiclesInformationSummary[vehicleName] = res;
  }
  return vehiclesInformationSummary;
};

export const getObjectData = async (url) => {
  return (await axios.get(url)).data;
};
