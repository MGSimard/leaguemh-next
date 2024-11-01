import Link from "next/link";
import {
  modeDictionary,
  reverseRegionDictionary,
  timeSince,
  calcDuration,
  getItems,
  getChampFrame,
  getRunesSumsAugs,
} from "@/lib/helpers";
import { getMatchData } from "@/server/actions";
import versionsJson from "@/datasets/versions.json";
import championsJson from "@/datasets/champion.json";
import runesJson from "@/datasets/runesReforged.json";
import sumSpellsJson from "@/datasets/summoner.json";
import itemsJson from "@/datasets/item.json";
import modesJson from "@/datasets/queues.json";
import arenaJson from "@/datasets/arena.json";
import { ParticipantDto } from "@/lib/typesMatchV5";

const patchVer = versionsJson[0];
const dsChampions = championsJson.data;
const dsRunes = runesJson;
const dsSumSpells = sumSpellsJson.data;
const dsItems = itemsJson.data;
const dsModes = modesJson;
const dsArena = arenaJson.augments;

interface MatchCardPropTypes {
  matchId: string;
  targetPlayer: string;
  regionPrefix: string;
}
export async function MatchCard({ matchId, targetPlayer, regionPrefix }: MatchCardPropTypes) {
  const matchData = await getMatchData(matchId, regionPrefix);
  const { data, message } = matchData;

  // Render an error message, small little match card with no contents
  // TODO: Do it later
  if (!data) return null;

  // Simplify some match data
  const { gameDuration, gameStartTimestamp, participants, platformId, queueId } = data.info;

  // Simplify target player data
  const targetPlayerData = participants.find((player) => player.puuid === targetPlayer)!;
  const { championId, champLevel, totalMinionsKilled, kills, deaths, assists, win } = targetPlayerData;

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
            backgroundImage: `url("${getChampFrame(dsChampions, championId, patchVer)}")`,
          }}></div>
      </div>
      <div className="mc-right">
        <div className="sums-runes-container">
          <div className="runes">
            <div
              className="rune"
              style={{
                backgroundImage: `url("${getRunesSumsAugs(1, queueId, dsRunes, dsArena, targetPlayerData, patchVer)}")`,
              }}></div>
            <div
              className="rune"
              style={{
                backgroundImage: `url("${getRunesSumsAugs(3, queueId, dsRunes, dsArena, targetPlayerData, patchVer)}")`,
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
                  patchVer
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
                  patchVer
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
              backgroundImage: getItems(dsItems, targetPlayerData.item0, patchVer),
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: getItems(dsItems, targetPlayerData.item1, patchVer),
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: getItems(dsItems, targetPlayerData.item2, patchVer),
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: getItems(dsItems, targetPlayerData.item3, patchVer),
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: getItems(dsItems, targetPlayerData.item4, patchVer),
            }}></div>
          <div
            className="item"
            style={{
              backgroundImage: getItems(dsItems, targetPlayerData.item5, patchVer),
            }}></div>
        </div>
        <div className="trinket-container">
          <div
            className="trinket"
            style={{
              backgroundImage: getItems(dsItems, targetPlayerData.item6, patchVer),
            }}></div>
        </div>
        <div className="teams-container">
          {queueId === 1700 || queueId === 1710 ? (
            <TeamsArena players={participants} platformId={platformId} />
          ) : (
            <TeamsStandard players={participants} platformId={platformId} />
          )}
        </div>
      </div>
    </div>
  );
}

const TeamsArena = ({ players, platformId }: { players: ParticipantDto[]; platformId: string }) => {
  const orderedPlayers = [...players].sort((a, b) => a.placement - b.placement);

  return (
    <ul className="teamsArena">
      {orderedPlayers.map((plr) => (
        <li key={plr.summonerId}>
          <Link href={`/summoner/${reverseRegionDictionary(platformId)}/${plr.riotIdGameName}-${plr.riotIdTagline}`}>
            <div
              className="participantChamp"
              style={{
                backgroundImage: `url("${getChampFrame(dsChampions, plr.championId, patchVer)}")`,
              }}></div>
            <span>{plr.riotIdGameName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const TeamsStandard = ({ players, platformId }: { players: ParticipantDto[]; platformId: string }) => {
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
                  backgroundImage: `url("${getChampFrame(dsChampions, plr.championId, patchVer)}")`,
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
                  backgroundImage: `url("${getChampFrame(dsChampions, plr.championId, patchVer)}")`,
                }}></div>
              <span>{plr.riotIdGameName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
