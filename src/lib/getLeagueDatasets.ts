import { GetLeagueDatasetsTypes } from "@/lib/types";

export async function getLeagueDatasets(): Promise<GetLeagueDatasetsTypes> {
  // prettier-ignore
  try {
    // 1. DataDragon Version
    const [ddVersion] = await fetch("https://ddragon.leagueoflegends.com/api/versions.json").then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: DATA DRAGON VERSION. STATUS: ${res.status}`);return res.json();});
    const datasets = await Promise.all([
      // 2. Champions Dataset
      fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/champion.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: CHAMPION DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.data),
      // 3. Runes Dataset
      fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/runesReforged.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: RUNES DATASET. STATUS: ${res.status}`);return res.json();}),
      // 4. Summoner Spells Dataset
      fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/summoner.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: SUMMONER SPELLS DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.data),
      // 5. Items Dataset
       fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/item.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: ITEMS DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.data),
      // 6. Gamemodes Dataset (Riot does SSL oopsies sometimes: https://github.com/RiotGames/developer-relations/issues/1004)
      fetch("https://static.developer.riotgames.com/docs/lol/queues.json").then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: QUEUES DATASET. STATUS: ${res.status}`);return res.json();}),
      // 7. Arena Dataset
      fetch("https://raw.communitydragon.org/latest/cdragon/arena/en_us.json").then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: ARENA DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.augments),
    ]);


    return {
      success: true,
      data: [ddVersion, ...datasets],
      message: "SUCCESS: Datasets fetched.",
    };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "UNKNOWN ERROR.");
    return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
}
