import Link from "next/link";
import { modeDictionary, reverseRegionDictionary, timeSince, calcDuration } from "@/lib/helpers";

const TeamsArena = ({ players, dsChampions, ddVersion, platformId }) => {
  const orderedPlayers = [...players].sort((a, b) => a.placement - b.placement);

  return (
    <ul className="teamsArena">
      {orderedPlayers.map((plr) => (
        <li key={plr.summonerId}>
          <Link href={`/summoner/${reverseRegionDictionary(platformId)}/${plr.riotIdGameName}-${plr.riotIdTagline}`}>
            <div
              className="participantChamp"
              style={{
                backgroundImage: `url("${getChampFrame(dsChampions, plr.championId, ddVersion)}")`,
              }}></div>
            <span>{plr.riotIdGameName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const TeamsStandard = ({ players, dsChampions, ddVersion, platformId }) => {
  const teamOne = players.filter((player) => player.teamId === 100);
  const teamTwo = players.filter((player) => player.teamId === 200);

  return (
    <>
      <ul className="teamsStandard">
        {teamOne.map((plr) => (
          <li key={plr.summonerId}>
            <Link href={`/summoner/${reverseRegionDictionary(platformId)}/${plr.riotIdGameName}-${plr.riotIdTagline}`}>
              <div
                className="participantChamp"
                style={{
                  backgroundImage: `url("${getChampFrame(dsChampions, plr.championId, ddVersion)}")`,
                }}></div>
              <span>{plr.riotIdGameName}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="teamsStandard">
        {teamTwo.map((plr) => (
          <li key={plr.summonerId}>
            <Link href={`/summoner/${reverseRegionDictionary(platformId)}/${plr.riotIdGameName}-${plr.riotIdTagline}`}>
              <div
                className="participantChamp"
                style={{
                  backgroundImage: `url("${getChampFrame(dsChampions, plr.championId, ddVersion)}")`,
                }}></div>
              <span>{plr.riotIdGameName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const getRunesSumsAugs = (num, queueId, datasetX, dsArena, targetPlayerData, ddVersion) => {
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
        return `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${
          Object.entries(datasetX).find(([spell, info]) => info.key == sumId)[1].image.full
        }`;
      }
    }
  }
};

// Get all built items and return asset link, return null if no item in slot or bug
const getItems = (dsItems, itemId, ddVersion) => {
  if (dsItems[itemId]) {
    return `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${dsItems[itemId].image.full}`;
  } else return null;
};

// Get a champion frame, return asset link that matches the ID. Else return nothing, leave to empty string.
const getChampFrame = (dsChampions, championId, ddVersion) => {
  if (Object.entries(dsChampions).find(([champ, info]) => info.key == championId)) {
    return `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${
      Object.entries(dsChampions).find(([champ, info]) => info.key == championId)[1].image.full
    }`;
  } else return null;
};

export const MatchCard = ({ matchData, targetPlayer, dataset }) => {
  // Simplify some match data
  const { gameDuration, gameStartTimestamp, participants, platformId, queueId } = matchData.info;

  // Simplify target player data
  const targetPlayerData = participants.find((player) => player.puuid === targetPlayer);
  const { championId, champLevel, totalMinionsKilled, kills, deaths, assists, win } = targetPlayerData;

  // Dataset libraries to get URL asset pointers
  const [ddVersion, dsChampions, dsModes, dsRunes, dsSumSpells, dsItems, dsArena] = dataset;

  return (
    <div className="match-card" style={{ backgroundColor: win ? "#182a44" : "#441818" }}>
      <div className="mc-left">
        <div className="data-top">
          <div className="dt1">
            <div className="matchMode">{modeDictionary(queueId)}</div>
            <small>({calcDuration(gameDuration)})</small>
          </div>
          <small className="matchTimeSince">{timeSince(gameStartTimestamp, gameDuration)}</small>
        </div>
        <div className="data-bot">
          <div className="matchOutcome">
            {win ? <span className="outcomeWin">VICTORY</span> : <span className="outcomeLoss">DEFEAT</span>}
          </div>
          <div className="matchLevel">{champLevel}</div>
        </div>
        <div
          className="mc-portrait"
          style={{
            backgroundImage: `url("${getChampFrame(dsChampions, championId, ddVersion)}")`,
          }}></div>
      </div>
      <div className="mc-right">
        <div className="sums-runes-container">
          <div className="runes">
            <div
              className="rune"
              style={{
                backgroundImage: `url("${getRunesSumsAugs(1, queueId, dsRunes, dsArena, targetPlayerData)}")`,
              }}></div>
            <div
              className="rune"
              style={{
                backgroundImage: `url("${getRunesSumsAugs(3, queueId, dsRunes, dsArena, targetPlayerData)}")`,
                backgroundSize: `${queueId === 1700 || queueId === 1710 ? "cover" : "50%"}`,
              }}></div>
          </div>
          <div className="sums">
            <div
              className="sum"
              style={{
                backgroundImage: `url("${getRunesSumsAugs(
                  2,
                  queueId,
                  dsSumSpells,
                  dsArena,
                  targetPlayerData,
                  ddVersion
                )}")`,
              }}></div>
            <div
              className="sum"
              style={{
                backgroundImage: `url("${getRunesSumsAugs(
                  4,
                  queueId,
                  dsSumSpells,
                  dsArena,
                  targetPlayerData,
                  ddVersion
                )}")`,
              }}></div>
          </div>
        </div>
        <div className="kda-container">
          <div className="kda">
            {kills}
            <span className="kda-slash">/</span>
            <span className="kda-deaths">{deaths}</span>
            <span className="kda-slash">/</span>
            {assists}
          </div>
          <div className="kda-ratio">{deaths ? ((kills + assists) / deaths).toFixed(2) : kills + assists} KDA</div>
          <div className="creepscore">{totalMinionsKilled} CS</div>
        </div>
        <div className="items-container">
          <div
            className="item"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item0, ddVersion)}")`,
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item1, ddVersion)}")`,
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item2, ddVersion)}")`,
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item3, ddVersion)}")`,
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item4, ddVersion)}")`,
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item5, ddVersion)}")`,
            }}></div>
        </div>
        <div className="trinket-container">
          <div
            className="trinket"
            style={{
              backgroundImage: `url("${getItems(dsItems, targetPlayerData.item6, ddVersion)}")`,
            }}></div>
        </div>
        <div className="teams-container">
          {queueId === 1700 || queueId === 1710 ? (
            <TeamsArena
              players={participants}
              dsChampions={dsChampions}
              ddVersion={ddVersion}
              platformId={platformId}
            />
          ) : (
            <TeamsStandard
              players={participants}
              dsChampions={dsChampions}
              ddVersion={ddVersion}
              platformId={platformId}
            />
          )}
        </div>
      </div>
    </div>
  );
};
