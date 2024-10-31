// "use cache";
// import { usePlayerData } from "../hooks/usePlayerData";
// import { MatchCard } from "../components/MatchCard/MatchCard";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { getLeagueDatasets } from "@/lib/getLeagueDatasets";
import { SearchComponent } from "@/components/SearchBar";
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

  const result = await getLeagueDatasets();
  const [ddVersion, dsChampions, dsRunes, dsSumSpells, dsItems, dsModes, dsArena] = result;
  console.log(ddVersion);

  // const {
  //   targetIdentity,
  //   targetProfile,
  //   targetRank,
  //   matchIdList,
  //   matchDataArray,
  //   anyPlayerDataPending,
  //   anyPlayerDataErrors,
  //   playerDataErrors,
  //   fullRegion,
  // } = usePlayerData(regionPrefix, summoner);
  //
  // const rankHandler = (resolvedRankData) => {
  //   if (resolvedRankData.length) {
  //     const checkSoloQueue = resolvedRankData.find((queue) => queue.queueType === "RANKED_SOLO_5x5");
  //     if (checkSoloQueue) {
  //       const { tier, rank, leaguePoints } = checkSoloQueue;
  //       return `${tier} ${rank} ${leaguePoints}LP (SOLO)`;
  //     }
  //     const checkFlexQueue = resolvedRankData.find((queue) => queue.queueType === "RANKED_FLEX_SR");
  //     if (checkFlexQueue) {
  //       const { tier, rank, leaguePoints } = checkFlexQueue;
  //       return `${tier} ${rank} ${leaguePoints}LP (FLEX)`;
  //     }
  //   }
  //   return "UNRANKED";
  // };

  return (
    <main>
      <section>
        <h2>SUMMONER PROFILE</h2>
        <div className="profile-card">
          <div className="icon-container">
            <img
              // src={
              //   ddVersion && targetProfile
              //     ? `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/profileicon/${targetProfile.profileIconId}.png`
              //     : "/default.png"
              // }
              alt="Profile Icon"
            />
            <small>{/*targetProfile && targetProfile.summonerLevel*/}</small>
          </div>
          <div className="profileTable-container">
            {/* {anyPlayerDataPending && !anyPlayerDataErrors && " Loading..."}
            {anyPlayerDataErrors && ` There was a problem fetching summoner.${summoner && ` (${summoner})`}`}
            {targetIdentity && !anyPlayerDataPending && (
              <>
                <h3 className="pBold">
                  {targetIdentity.gameName} <span>#{targetIdentity.tagLine}</span>
                  {targetRank && <small className="pLabel">{rankHandler(targetRank)}</small>}
                </h3>
              </>
            )} */}
            <table className="profileTable">
              <tbody>
                <tr>
                  <th>Region</th>
                  <td>{/*fullRegion && fullRegion*/}</td>
                </tr>
                <tr>
                  <th>SummonerID</th>
                  <td>{/*targetProfile && !anyPlayerDataPending && targetProfile.id*/}</td>
                </tr>
                <tr>
                  <th>AccountID</th>
                  <td>{/*targetProfile && !anyPlayerDataPending && targetProfile.accountId*/}</td>
                </tr>
                <tr>
                  <th>PUUID</th>
                  <td>{/*targetProfile && !anyPlayerDataPending && targetProfile.puuid*/}</td>
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
          {/* Is loading, no errors */}
          {/* {(anyDatasetPending || anyPlayerDataPending) && !anyDatasetErrors && !anyPlayerDataErrors && <Spinner />} */}
          {/*If there are any dataset errors, display the error but continue*/}
          {/* {anyDatasetErrors || anyPlayerDataErrors
            ? datasetErrors.map((message) => <div key={message}>{message}</div>)
            : null} */}
          {/* If we have a valid match data array and finished fetching datasets render a matchcard for every match */}
          {/* {matchDataArray &&
            !anyDatasetPending &&
            !anyDatasetErrors &&
            !anyPlayerDataPending &&
            !anyPlayerDataErrors &&
            matchDataArray.map((match) => (
              <MatchCard
                key={match.metadata.matchId}
                matchData={match}
                targetPlayer={targetIdentity.puuid}
                dataset={[
                  ddVersion,
                  datasetChampions,
                  datasetModes,
                  datasetRunes,
                  datasetSumSpells,
                  datasetItems,
                  datasetArena,
                ]}
              />
            ))} */}
        </div>
      </section>
    </main>
  );
}
