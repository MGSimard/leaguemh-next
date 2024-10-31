export async function getLeagueDatasets() {
  // 1. DataDragon Version
  const [ddVersion] = await fetch("https://ddragon.leagueoflegends.com/api/versions.json").then((res) => res.json());

  // prettier-ignore
  const result = await Promise.allSettled([
    // 2. Champions Dataset
    fetch(`xhttps://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/champion.json`).then((res) => res.json()).then((data) => data.data),
    // 3. Runes Dataset
    fetch(`xhttps://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/runesReforged.json`).then((res) => res.json()),
    // 4. Summoner Spells Dataset
    fetch(`xhttps://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/summoner.json`).then((res) => res.json()).then((data) => data.data),
    // 5. Items Dataset
     fetch(`xhttps://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/item.json`).then((res) => res.json()).then((data) => data.data),
    // 6. Gamemodes Dataset (Riot does SSL oopsies sometimes: https://github.com/RiotGames/developer-relations/issues/1004)
    fetch("xhttps://static.developer.riotgames.com/docs/lol/queues.json").then((res) =>res.json()),
    // 7. Arena Dataset
    fetch("xhttps://raw.communitydragon.org/latest/cdragon/arena/en_us.json").then((res) => res.json()).then((data) => data.augments),
  ]);

  return [ddVersion, ...result.map((res) => (res.status === "fulfilled" ? res.value : null))];
}
