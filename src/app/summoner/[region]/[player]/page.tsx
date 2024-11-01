// "use cache";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { Suspense } from "react";
import { getPlayerData } from "@/server/actions";
import { getLeagueDatasets } from "@/lib/getLeagueDatasets";
import { SearchComponent } from "@/components/SearchBar";
import { rankDisplayFormatter } from "@/lib/helpers";
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

  const { success, data, message } = await getLeagueDatasets();

  // const { success, data, message } = await getPlayerData(regionPrefix, summoner);
  console.log(success ? "Success." : "Failed.");
  if (!success || !data) return <div>You broke it</div>;

  const [ddVersion, dsChampions, dsRunes, dsSumSpells, dsItems, dsModes, dsArena] = data;
  console.log(dsRunes[1]);

  // if (!data) return <div>ERROR</div>;
  // const [targetIdentity, targetProfile, targetRank, matchIdList, fullRegion] = data;

  return (
    <main>
      {/* <section>
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
            {!success && `There was an issuefetching summoner. ${summoner}`}
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
          {matchIdList &&
            matchIdList.map((matchId) => (
              <Suspense fallback={<Spinner />} key={matchId}>
                <MatchCard
                  key={matchId}
                  matchId={matchId}
                  regionPrefix={regionPrefix}
                  targetPlayer={targetIdentity.puuid}
                  dataset={[ddVersion, dsChampions, dsModes, dsRunes, dsSumSpells, dsItems, dsArena]}
                />
              </Suspense>
            ))}
        </div>
      </section> */}
    </main>
  );
}

{
  /* Move match data fetching into diff component that gets fed puuid */
}
{
  /* Suspense match history with <Spinner /> fallback */
}
{
  /* Is loading, no errors */
}
