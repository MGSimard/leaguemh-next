import { MatchV5DtoResTypes } from "@/lib/typesMatchV5";

/* RIOT API TYPES */
export interface accountsV1ResTypes {
  puuid: string;
  gameName: string;
  tagLine: string;
}
export interface summonerV4ResTypes {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
export interface leagueV4ResTypes {
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
}
export interface GetPlayerDataResTypes {
  data?: MatchV5DtoResTypes;
  message: string;
}
