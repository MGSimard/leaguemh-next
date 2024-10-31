"use server";
import { regionDictionary } from "@/lib/helpers";

const APIKEY = process.env.RIOTAPIKEY;

// SUCCESS RETURN CONVENTION:
// return { success: true, data, message: "SUCCESS: Text" };
// ERROR RETURN CONVENTION
// return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
// API KEY: ${process.env.RIOTAPIKEY}

export async function getPlayerData(regionPrefix: string, summoner: string) {
  // Split the hyphen-separated summoner name and tag
  const [summonerName, summonerTag] = summoner.split("-");

  // Get server shard(NA1), server cluster(americas), full region name(North America)
  const [shard, cluster, fullRegion] = regionDictionary(regionPrefix);

  // prettier-ignore
  const targetIdentity = await fetch(`https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: ACCOUNT IDENTITY. STATUS: ${res.status}`);return res.json();}).catch((err) => console.error(err));
  // prettier-ignore
  const [targetProfile, matchIdList] = await Promise.all([
    fetch(`https://${shard}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetIdentity.puuid}?api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: SUMMONER PROFILE. STATUS: ${res.status}`);return res.json();}).catch((err) => {console.error(err);Promise.reject(err);}),
    fetch(`https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetIdentity.puuid}/ids?start=0&count=3&api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: MATCH ID LIST. STATUS: ${res.status}`);return res.json();}).catch((err) => {console.error(err);Promise.reject(err);}),
  ]);
  // prettier-ignore
  const targetRank = await fetch(`https://${shard}.api.riotgames.com/lol/league/v4/entries/by-summoner/${targetProfile.id}?api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: LEAGUE RANK. STATUS: ${res.status}`);return res.json();}).catch((err) => console.error(err));

  const matches = await Promise.allSettled(
    matchIdList.map(async (matchId: string) =>
      fetch(`https://${cluster}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${APIKEY}`)
        .then((res) => {
          if (!res.ok) throw new Error(`FETCH ERROR: MATCH ${matchId}. STATUS: ${res.status}`);
          return res.json();
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject();
        })
    )
  );
  const matchDataArray = matches.filter((res) => res.status === "fulfilled").map((res) => res.value);

  return [targetIdentity, targetProfile, targetRank, matchDataArray, fullRegion];
}
