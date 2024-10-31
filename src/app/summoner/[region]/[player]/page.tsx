// "use cache";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { getPlayerData } from "@/server/actions";
import { getLeagueDatasets } from "@/lib/getLeagueDatasets";
import { SearchComponent } from "@/components/SearchBar";
import { MatchCard } from "@/components/MatchCard";
import { Spinner } from "@/components/Spinner";
// cacheLife("hours");

/** cacheLife:
 * cacheLife({ stale: N, revalidate: N, expire: N }) N = SECONDS.
 * Stale:.......Cache may be stale on clients for N seconds before refetching from server.
 * Revalidate:..If the server receives a new request after N seconds, start revalidating new values in the background.
 * Expire:......If this entry has no traffic for N seconds it will expire. The next request will recompute it.
 */
// cacheLife outside fn is currently bugged (or docs wrong?): https://github.com/vercel/next.js/issues/71900

export default async function Page({ params }: { params: Promise<{ region: string; player: string }> }) {
  const { region: regionPrefix, player: summoner } = await params;

  const [ddVersion, dsChampions, dsRunes, dsSumSpells, dsItems, dsModes, dsArena] = await getLeagueDatasets();
  const [targetIdentity, targetProfile, targetRank, matchDataArray, fullRegion] = await getPlayerData(
    regionPrefix,
    summoner
  );

  const rankHandler = (resolvedRankData) => {
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
  };

  return (
    <main>
      <section>
        <h2>SUMMONER PROFILE</h2>
        <div className="profile-card">
          <div className="icon-container">
            <img
              src={
                ddVersion && targetProfile
                  ? `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/profileicon/${targetProfile.profileIconId}.png`
                  : "/avatar-default.png"
              }
              alt="Profile Icon"
            />
            <small>{targetProfile && targetProfile.summonerLevel}</small>
          </div>
          <div className="profileTable-container">
            {/* `There was a problem fetching summoner. ${summoner}` */}
            {/* LOADING STATE: Loading... */}
            {targetIdentity && (
              <>
                <h3 className="pBold">
                  {targetIdentity.gameName} <span>#{targetIdentity.tagLine}</span>
                  {targetRank && <small className="pLabel">{rankHandler(targetRank)}</small>}
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
          {/* Move match data fetching into diff component that gets fed puuid */}
          {/* Suspense match history with <Spinner /> fallback */}
          {/* Is loading, no errors */}
          {matchDataArray &&
            matchDataArray.map((match) => (
              <MatchCard
                key={match.metadata.matchId}
                matchData={match}
                targetPlayer={targetIdentity.puuid}
                dataset={[ddVersion, dsChampions, dsModes, dsRunes, dsSumSpells, dsItems, dsArena]}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
