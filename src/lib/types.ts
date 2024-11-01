import { MatchV5DtoResTypes } from "@/lib/typesMatchV5";
/* RIOT API TYPES */
interface AccountsV1ResTypes {
  puuid: string;
  gameName: string;
  tagLine: string;
}
interface SummonerV4ResTypes {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
interface LeagueV4ResTypes {
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
type matchV5ListResTypes = string[];

export interface GetPlayerDataResTypes {
  data?: [AccountsV1ResTypes, SummonerV4ResTypes, LeagueV4ResTypes, matchV5ListResTypes, string];
  message: string;
}
// AccountV1        SummonerV4       LeagueV4   MatchV5 (list), string
//[targetIdentity, targetProfile, targetRank, matchIdList, fullRegion]

export interface GetMatchDataResTypes {
  data?: MatchV5DtoResTypes;
  message: string;
}
