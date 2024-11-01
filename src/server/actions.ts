"use server";
import { regionDictionary } from "@/lib/helpers";
import type {
  AccountsV1ResTypes,
  SummonerV4ResTypes,
  MatchV5ListResTypes,
  GetMatchDataResTypes,
  GetPlayerDataResTypes,
} from "@/lib/types";

const APIKEY = process.env.RIOTAPIKEY;

// SUCCESS RETURN CONVENTION:
// return { success: true, data, message: "SUCCESS: Text" };
// ERROR RETURN CONVENTION
// return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
// API KEY: ${process.env.RIOTAPIKEY}

export async function getPlayerData(regionPrefix: string, summoner: string): Promise<GetPlayerDataResTypes> {
  // Get server shard(NA1), server cluster(americas), full region name(North America)
  const [shard, cluster, fullRegion] = regionDictionary(regionPrefix);
  const [summonerName, summonerTag] = summoner.split("-");

  try {
    if (!fullRegion) throw new Error("ERROR: Invalid Region.");
    // prettier-ignore
    const targetIdentity: AccountsV1ResTypes = await fetch(
      `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${APIKEY}`
    ).then((res) => {
      if (!res.ok) throw new Error(`FETCH ERROR: ACCOUNT IDENTITY. STATUS: ${res.status}`);
      return res.json();
    });

    // prettier-ignore
    const [targetProfile, matchIdList]: [SummonerV4ResTypes, MatchV5ListResTypes] = await Promise.all([
      fetch(`https://${shard}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetIdentity.puuid}?api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: SUMMONER PROFILE. STATUS: ${res.status}`);return res.json();}),
      fetch(`https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetIdentity.puuid}/ids?start=0&count=1&api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: MATCH ID LIST. STATUS: ${res.status}`);return res.json();}),
    ]);
    // prettier-ignore
    const targetRank = await fetch(`https://${shard}.api.riotgames.com/lol/league/v4/entries/by-summoner/${targetProfile.id}?api_key=${APIKEY}`).then((res) => {if (!res.ok) throw new Error(`FETCH ERROR: LEAGUE RANK. STATUS: ${res.status}`);return res.json();});

    return {
      data: [targetIdentity, targetProfile, targetRank, matchIdList, fullRegion],
      message: "SUCCESS: Profile data fetched.",
    };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "UNKNOWN ERROR.");
    return { message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
}

export async function getMatchData(matchId: string, regionPrefix: string): Promise<GetMatchDataResTypes> {
  const [shard, cluster, fullRegion] = regionDictionary(regionPrefix);

  try {
    const matchData = await fetch(
      `https://${cluster}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${APIKEY}`
    ).then((res) => {
      if (!res.ok) throw new Error(`FETCH ERROR: MATCH ${matchId}. STATUS: ${res.status}`);
      return res.json();
    });

    return { data: matchData, message: "SUCCESS: Match data fetched." };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "UNKNOWN ERROR.");
    return { message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
}
