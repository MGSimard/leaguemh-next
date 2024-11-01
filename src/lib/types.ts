/* DATASET TYPES */
export type ddVersionTypes = string;

export interface dsChampionsTypes {
  [champion: string]: {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
      attack: number;
      defense: number;
      magic: number;
      difficulty: number;
    };
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    tags: string[];
    partype: string;
    stats: {
      hp: number;
      hpperlevel: number;
      mp: number;
      mpperlevel: number;
      movespeed: number;
      armor: number;
      armorperlevel: number;
      spellblock: number;
      spellblockperlevel: number;
      attackrange: number;
      hpregen: number;
      hpregenperlevel: number;
      mpregen: number;
      mpregenperlevel: number;
      crit: number;
      critperlevel: number;
      attackdamage: number;
      attackdamageperlevel: number;
      attackspeedperlevel: number;
      attackspeed: number;
    };
  };
}

export type dsRunesTypes = {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: {
    runes: {
      id: number;
      key: string;
      icon: string;
      name: string;
      shortDesc: string;
      longDesc: string;
    }[];
  }[];
}[];

export interface dsSumSpellsTypes {
  [sumSpell: string]: {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: [number];
    cooldownBurn: string;
    cost: [number];
    costburn: string;
    datavalues: {};
    effect: ([number] | null)[];
    effectBurn: (string | null)[];
    vars: [];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: [number];
    rangeBurn: string;
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    resource: string;
  };
}

export interface dsItemsTypes {
  [itemId: string]: {
    name: string;
    description: string;
    colloq: string;
    plaintext: string;
    into: string[];
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    gold: {
      base: number;
      purchasable: boolean;
      total: number;
      sell: number;
    };
    tags: string[];
    maps: { [id: string]: boolean };
    stats: { [stat: string]: number };
  };
}
export type dsModesTypes = {
  queueId: number;
  map: string;
  description: string | null;
  notes: string | null;
}[];
export interface dsArenaTypes {}

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
