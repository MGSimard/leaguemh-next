import { Suspense } from "react";
import { getPlayerData } from "@/server/actions";
import { SearchComponent } from "@/components/SearchBar";
import { rankDisplayFormatter } from "@/lib/helpers";
import { MatchCard } from "@/components/MatchCard";
import { Spinner } from "@/components/Spinner";
import versionsJson from "@/datasets/versions.json";
import championsJson from "@/datasets/champion.json";
import runesJson from "@/datasets/runesReforged.json";
import sumSpellsJson from "@/datasets/summoner.json";
import itemsJson from "@/datasets/item.json";
import modesJson from "@/datasets/queues.json";
import arenaJson from "@/datasets/arena.json";

export default async function Page({ params }: { params: Promise<{ region: string; player: string }> }) {
  const { region: regionPrefix, player: summoner } = await params;

  const patchVer = versionsJson[0];
  const dsChampions = championsJson.data;
  const dsRunes = runesJson;
  const dsSumSpells = sumSpellsJson.data;
  const dsItems = itemsJson.data;
  const dsModes = modesJson;
  const dsArena = arenaJson.augments;

  const { data, message } = await getPlayerData(regionPrefix, summoner);

  if (!data) return <div>You broke it</div>;

  const [targetIdentity, targetProfile, targetRank, matchIdList, fullRegion] = data;

  return (
    <main>
      <section>
        <h2>SUMMONER PROFILE</h2>
        <div className="profile-card">
          <div className="icon-container">
            <img
              src={
                patchVer && targetProfile
                  ? `https://ddragon.leagueoflegends.com/cdn/${patchVer}/img/profileicon/${targetProfile.profileIconId}.png`
                  : "/avatar-default.png"
              }
              alt="Profile Icon"
            />
            <small>{targetProfile.summonerLevel}</small>
          </div>
          <div className="profileTable-container">
            {!data && `There was an issue fetching summoner profile. (${summoner})`}
            {targetIdentity && (
              <>
                <h3 className="pBold">
                  {targetIdentity.gameName} <span>#{targetIdentity.tagLine}</span>
                  {targetRank && <small className="pLabel">{rankDisplayFormatter(targetRank)}</small>}
                </h3>
              </>
            )}
            <table className="profileTable">
              <tbody>
                <tr>
                  <th>Region</th>
                  <td>{fullRegion && fullRegion}</td>
                </tr>
                <tr>
                  <th>SummonerID</th>
                  <td>{targetProfile?.id}</td>
                </tr>
                <tr>
                  <th>AccountID</th>
                  <td>{targetProfile?.accountId}</td>
                </tr>
                <tr>
                  <th>PUUID</th>
                  <td>{targetProfile?.puuid}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <SearchComponent usedIn="summoner" />
        </div>
      </section>

      <section>
        <h2>MATCH HISTORY</h2>
        <div className="match-history">
          {matchIdList && (
            <Suspense fallback={<Spinner />}>
              {matchIdList.map((matchId) => (
                <MatchCard
                  key={matchId}
                  matchId={matchId}
                  targetPlayer={targetIdentity.puuid}
                  regionPrefix={regionPrefix}
                  datasets={[patchVer, dsChampions, dsRunes, dsSumSpells, dsItems, dsModes, dsArena]}
                />
              ))}
            </Suspense>
          )}
        </div>
      </section>
    </main>
  );
}
