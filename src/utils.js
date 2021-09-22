import axios from "axios";

const apiUrl = "https://swapi.dev/api/";

/**
 * return all data on a schema like People and go throw all is pages
 */
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

/**
 * return all data from a single page
 */
export const getPropertySinglePageData = async (url) => {
  const { data } = await axios.get(url);
  const { results, next } = data;
  return { results, next };
};

export const getSinglePropertyBySearch = async (schemaName, propertySearch) => {
  const url = apiUrl + schemaName + "?search=" + propertySearch;
  const { data } = await axios.get(url);
  const { results } = data;
  return results[0];
};

export const getAllplaentsBySearch = async (plaentsNames) => {
  const planetsPromisesList = plaentsNames.map((planet) =>
    getSinglePropertyBySearch("planets", planet)
  );
  const respones = await Promise.all(planetsPromisesList);
  return respones;
};

/**
 * return a vehicle name with the highest sum of population for all its pilots’ home planets
 */
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

/**
 * return a object data from a url api
 */
export const getObjectData = async (url) => {
  return (await axios.get(url)).data;
};
