import { unstable_cacheLife as cacheLife } from "next/cache";

/** cacheLife:
 * cacheLife({ stale: N, revalidate: N, expire: N }) N = SECONDS.
 * Stale:.......Cache may be stale on clients for N seconds before refetching from server.
 * Revalidate:..If the server receives a new request after N seconds, start revalidating new values in the background.
 * Expire:......If this entry has no traffic for N seconds it will expire. The next request will recompute it.
 */

export async function getLeagueDatasets() {
  // Wanted top-level file "use cache" directive
  // But it's currently bugged: https://github.com/vercel/next.js/issues/71900
  "use cache";
  cacheLife({ stale: 3600, revalidate: 900, expire: 86400 }); // in seconds

  const [ddVersion] = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((res) => res.json())
    .then((data) => data);
  return ddVersion;
  /**
   * 1. DataDragon Version:.......https://ddragon.leagueoflegends.com/api/versions.json
   * 2. Champions Dataset:........https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/champion.json
   * 3. Runes Dataset:............https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/runesReforged.json
   * 4. Summoner Spells Dataset:..https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/summoner.json
   * 5. Items Dataset:............https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/item.json
   * 6. Gamemodes Dataset:........https://static.developer.riotgames.com/docs/lol/queues.json
   * 7. Arena Dataset:............https://raw.communitydragon.org/latest/cdragon/arena/en_us.json
   * // COMBINE PENDINGS, ERRORS, DATA RETURNS
   * IE: const anyDatasetErrors = isThingError || isThing2Error;
   * IE: const datasetErrors = [thingError?.message,thing2Error?.message].filter((message) => message !== undefined);
   */
}
