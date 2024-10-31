export async function getLeagueDatasets() {
  // 1. DataDragon Version
  const [ddVersion] = await fetch("https://ddragon.leagueoflegends.com/api/versions.json").then((res) => res.json());

  // prettier-ignore
  const result = await Promise.allSettled([
    // 2. Champions Dataset
    fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/champion.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: CHAMPION DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.data).catch((err) => {console.error(err);Promise.reject(err)}),
    // 3. Runes Dataset
    fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/runesReforged.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: RUNES DATASET. STATUS: ${res.status}`);return res.json();}).catch((err) => {console.error(err);Promise.reject(err)}),
    // 4. Summoner Spells Dataset
    fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/summoner.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: SUMMONER SPELLS DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.data).catch((err) => {console.error(err);Promise.reject(err)}),
    // 5. Items Dataset
     fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/item.json`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: ITEMS DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.data).catch((err) => {console.error(err);Promise.reject(err)}),
    // 6. Gamemodes Dataset (Riot does SSL oopsies sometimes: https://github.com/RiotGames/developer-relations/issues/1004)
    fetch("https://static.developer.riotgames.com/docs/lol/queues.json").then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: QUEUES DATASET. STATUS: ${res.status}`);return res.json();}).catch((err) => {console.error(err);Promise.reject(err)}),
    // 7. Arena Dataset
    fetch("https://raw.communitydragon.org/latest/cdragon/arena/en_us.json").then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: ARENA DATASET. STATUS: ${res.status}`);return res.json();}).then((data) => data.augments).catch((err) => {console.error(err);Promise.reject(err)}),
  ]);

  return [ddVersion, ...result.map((res) => (res.status === "fulfilled" ? res.value : null))];
}
