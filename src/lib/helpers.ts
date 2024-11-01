export function timeSince(startUnix: number, gameLength: number) {
  const currentUnix = Math.floor(new Date().getTime() / 1000);
  const gameStartUnix = Math.floor(startUnix / 1000);
  const gameEndUnix = gameStartUnix + gameLength;
  const timeSinceEnd = currentUnix - gameEndUnix;

  if (timeSinceEnd < 60) {
    return timeSinceEnd + " seconds ago";
  } else if (timeSinceEnd < 120) {
    return Math.floor(timeSinceEnd / 60) + " minute ago";
  } else if (timeSinceEnd < 3600) {
    return Math.floor(timeSinceEnd / 60) + " minutes ago";
  } else if (timeSinceEnd < 7200) {
    return Math.floor(timeSinceEnd / 3600) + " hour ago";
  } else if (timeSinceEnd < 86400) {
    return Math.floor(timeSinceEnd / 3600) + " hours ago";
  } else if (timeSinceEnd < 172800) {
    return Math.floor(timeSinceEnd / 86400) + " day ago";
  } else if (timeSinceEnd < 604800) {
    return Math.floor(timeSinceEnd / 86400) + " days ago";
  } else if (timeSinceEnd < 1209600) {
    return Math.floor(timeSinceEnd / 604800) + " week ago";
  } else if (timeSinceEnd < 2628000) {
    return Math.floor(timeSinceEnd / 604800) + " weeks ago";
  } else if (timeSinceEnd < 5256000) {
    return Math.floor(timeSinceEnd / 2620800) + " month ago";
  } else if (timeSinceEnd < 31536000) {
    return Math.floor(timeSinceEnd / 2620800) + " months ago";
  }
}

export function calcDuration(gameLength: number) {
  return Math.floor(gameLength / 60) + "m" + Math.floor(gameLength % 60) + "s";
}

export function modeDictionary(queueId: number) {
  // Queue IDs https://static.developer.riotgames.com/docs/lol/queues.json
  switch (queueId) {
    case 0:
      return "Custom";
    case 72:
    case 73:
      return "Showdown";
    case 75:
    case 98:
      return "Hexakill";
    case 76:
    case 1900:
      return "URF";
    case 78:
    case 1020:
      return "One For All";
    case 83:
      return "Co-op URF";
    case 100:
      return "Butcher's Bridge";
    case 310:
      return "Nemesis";
    case 313:
      return "Black Market Brawlers";
    case 317:
      return "Definitely Not Dominion";
    case 325:
      return "All Random (SR)";
    case 400:
      return "Draft Pick";
    case 420:
      return "Ranked";
    case 430:
      return "Blind Pick";
    case 440:
      return "Ranked Flex";
    case 450:
      return "ARAM";
    case 490:
      return "Quickplay";
    case 600:
      return "Blood Hunt";
    case 610:
      return "Dark Star";
    case 700:
      return "Clash";
    case 720:
      return "ARAM Clash";
    case 830:
    case 840:
    case 850:
      return "Bots";
    case 900:
    case 1010:
      return "ARURF";
    case 910:
      return "Ascension";
    case 920:
      return "Poro King";
    case 940:
      return "Nexus Siege";
    case 950:
    case 960:
      return "Doom Bots";
    case 980:
    case 990:
      return "Star Guardian";
    case 1000:
      return "PROJECT";
    case 1030:
    case 1040:
    case 1050:
    case 1060:
    case 1070:
      return "Odyssey";
    case 1300:
      return "Nexus Blitz";
    case 1400:
      return "Ultimate Spellbook";
    case 1700:
    case 1710:
      return "Arena";
    case 1810:
    case 1820:
    case 1830:
    case 1840:
      return "Swarm";
    case 2000:
    case 2010:
    case 2020:
      return "Tutorial";
    default:
      return "Featured";
  }
}

export function regionDictionary(regionPrefix: string) {
  switch (regionPrefix.toLowerCase()) {
    //AMERICAS
    case "na":
      return ["NA1", "americas", "North America"];
    case "br":
      return ["BR1", "americas", "Brazil"];
    case "lan":
      return ["LA1", "americas", "Latin America North"];
    case "las":
      return ["LA2", "americas", "Latin America South"];
    //ASIA
    case "kr":
      return ["KR", "asia", "Korea"];
    case "jp":
      return ["JP1", "asia", "Japan"];
    //EUROPE
    case "euw":
      return ["EUW1", "europe", "Europe West"];
    case "eun":
      return ["EUN1", "europe", "Europe Nordic & East"];
    case "me":
      return ["ME1", "europe", "Middle East"];
    case "tr":
      return ["TR1", "europe", "Türkiye"];
    case "ru":
      return ["RU", "europe", "Russia"];
    //SEA
    case "oce":
      return ["OC1", "sea", "Oceania"];
    case "sg":
      return ["SG2", "sea", "Singapore"];
    case "ph":
      return ["PH2", "sea", "Phillippines"];
    case "th":
      return ["TH2", "sea", "Thailand"];
    case "tw":
      return ["TW2", "sea", "Taiwan"];
    case "vn":
      return ["VN2", "sea", "Vietnam"];
    default:
      alert("Invalid Region!");
      return ["", "", ""];
  }
}

export function reverseRegionDictionary(devId: string) {
  switch (devId.toLowerCase()) {
    //AMERICAS
    case "na1":
      return "na";
    case "br1":
      return "br";
    case "la1":
      return "lan";
    case "la2":
      return "las";
    //ASIA
    case "kr":
      return "kr";
    case "jp1":
      return "jp";
    //EUROPE
    case "euw1":
      return "euw";
    case "eun1":
      return "eun";
    case "tr1":
      return "tr";
    case "RU":
      return "ru";
    //SEA
    case "oc1":
      return "oce";
    case "sg2":
      return "sg";
    case "ph2":
      return "ph";
    case "tw2":
      return "tw";
    case "vn2":
      return "vn";
    case "th2":
      return "th";
    default:
      alert("Invalid Region!");
      return;
  }
}

export function rankDisplayFormatter(resolvedRankData) {
  if (resolvedRankData.length) {
    const checkSoloQueue = resolvedRankData.find((queue) => queue.queueType === "RANKED_SOLO_5x5");
    if (checkSoloQueue) {
      const { tier, rank, leaguePoints } = checkSoloQueue;
      return `${tier} ${rank} ${leaguePoints}LP (SOLO)`;
    }
    const checkFlexQueue = resolvedRankData.find((queue) => queue.queueType === "RANKED_FLEX_SR");
    if (checkFlexQueue) {
      const { tier, rank, leaguePoints } = checkFlexQueue;
      return `${tier} ${rank} ${leaguePoints}LP (FLEX)`;
    }
  }
  return "UNRANKED";
}

// Get all built items and return asset link, return null if no item in slot or bug
export function getItems(dsItems, itemId, patchVer) {
  if (dsItems[itemId]) {
    return `https://ddragon.leagueoflegends.com/cdn/${patchVer}/img/item/${dsItems[itemId].image.full}`;
  } else return null;
}

// Get a champion frame, return asset link that matches the ID. Else return nothing, leave to empty string.
export function getChampFrame(dsChampions, championId, patchVer) {
  if (Object.entries(dsChampions).find(([champ, info]) => info.key == championId)) {
    return `https://ddragon.leagueoflegends.com/cdn/${patchVer}/img/champion/${
      Object.entries(dsChampions).find(([champ, info]) => info.key == championId)[1].image.full
    }`;
  } else return null;
}

export function getRunesSumsAugs(num, queueId, datasetX, dsArena, targetPlayerData, patchVer) {
  // datasetX is Runes or Summoners depending on input.

  // If Arena, check for augment ID. Return augment asset image if found.
  if (queueId === 1700 || queueId === 1710) {
    const augId = targetPlayerData[`playerAugment${num}`];
    if (dsArena.find((augment) => augment.id === augId)) {
      return `https://raw.communitydragon.org/latest/game/${dsArena.find((augment) => augment.id === augId).iconSmall}`;
    }
  } else {
    // If not arena, get runes and summoners.
    if (num === 1) {
      // Keystone
      for (let i = 0; i < datasetX.length; i++) {
        let keystone;
        keystone = datasetX[i].slots[0].runes.find(
          (rune) => rune.id === targetPlayerData.perks.styles[0].selections[0].perk
        );
        if (keystone) return `https://ddragon.canisback.com/img/${keystone.icon}`;
      }
    } else if (num === 3) {
      const styleId = targetPlayerData.perks.styles[1].style;
      // Secondary style
      if (datasetX.find((style) => style.id === styleId)) {
        return `https://ddragon.canisback.com/img/${datasetX.find((style) => style.id === styleId).icon}`;
      }
    } else if (num === 2 || num === 4) {
      const sumId = targetPlayerData[`summoner${num / 2}Id`];
      if (Object.entries(datasetX).find(([spell, info]) => info.key == sumId)) {
        return `https://ddragon.leagueoflegends.com/cdn/${patchVer}/img/spell/${
          Object.entries(datasetX).find(([spell, info]) => info.key == sumId)[1].image.full
        }`;
      }
    }
  }
}
