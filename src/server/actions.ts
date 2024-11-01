"use server";
import { regionDictionary } from "@/lib/helpers";
import type {
  AccountsV1ResTypes,
  SummonerV4ResTypes,
  MatchV5ListResTypes,
  GetMatchDataResTypes,
  GetPlayerDataResTypes,
  LeagueV4ResTypes,
} from "@/lib/types";
import type { MatchV5DtoResTypes } from "@/lib/typesMatchV5";

const APIKEY = process.env.RIOTAPIKEY;

export async function getPlayerData(regionPrefix: string, summoner: string): Promise<GetPlayerDataResTypes> {
  // Get server shard(NA1), server cluster(americas), full region name(North America)
  const [shard, cluster, fullRegion] = regionDictionary(regionPrefix);
  const [summonerName, summonerTag] = summoner.split("-");

  try {
    if (!fullRegion) throw new Error("ERROR: Invalid Region.");
    const targetIdentity = await fetch(
      `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${APIKEY}`
    ).then((res) => {
      if (!res.ok) throw new Error(`FETCH ERROR: ACCOUNT IDENTITY. STATUS: ${res.status}`);
      return res.json() as Promise<AccountsV1ResTypes>;
    });

    const [targetProfile, matchIdList] = await Promise.all([
      fetch(
        `https://${shard}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetIdentity.puuid}?api_key=${APIKEY}`
      ).then((res) => {
        if (!res.ok) throw new Error(`FETCH ERROR: SUMMONER PROFILE. STATUS: ${res.status}`);
        return res.json() as Promise<SummonerV4ResTypes>;
      }),
      fetch(
        `https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetIdentity.puuid}/ids?start=0&count=10&api_key=${APIKEY}`
      ).then((res) => {
        if (!res.ok) throw new Error(`FETCH ERROR: MATCH ID LIST. STATUS: ${res.status}`);
        return res.json() as Promise<MatchV5ListResTypes>;
      }),
    ]);

    const targetRank = await fetch(
      `https://${shard}.api.riotgames.com/lol/league/v4/entries/by-summoner/${targetProfile.id}?api_key=${APIKEY}`
    ).then((res) => {
      if (!res.ok) throw new Error(`FETCH ERROR: LEAGUE RANK. STATUS: ${res.status}`);
      return res.json() as Promise<LeagueV4ResTypes>;
    });

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
      return res.json() as Promise<MatchV5DtoResTypes>;
    });

    return { data: matchData, message: "SUCCESS: Match data fetched." };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "UNKNOWN ERROR.");
    return { message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
}
