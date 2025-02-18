import type { MatchV5DtoResTypes } from "@/lib/typesMatchV5";
/* RIOT API TYPES */
export interface AccountsV1ResTypes {
  puuid: string;
  gameName: string;
  tagLine: string;
}
export interface SummonerV4ResTypes {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
export type LeagueV4ResTypes = {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}[];
export type MatchV5ListResTypes = string[];

export interface GetPlayerDataResTypes {
  data?: [AccountsV1ResTypes, SummonerV4ResTypes, LeagueV4ResTypes, MatchV5ListResTypes, string];
  message: string;
}

export interface GetMatchDataResTypes {
  data?: MatchV5DtoResTypes;
  message: string;
}
