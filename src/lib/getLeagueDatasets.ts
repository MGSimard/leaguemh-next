"use cache";
import { unstable_cacheLife as cacheLife } from "next/cache";

cacheLife({ stale: 3600, revalidate: 900, expire: 86400 });

/** As far as I understand it:
 * Stale: client-side cache duration
 * Revalidate: server-side cache refresh duration (if accessed again within limit, refreshes limit)
 * Expire: Maximum amount of time the server-side cache can be refreshed for before being forced to refetch
 */

export async function getLeagueDatasets() {
  /**
   * 1. DataDragon Version
   *  https://ddragon.leagueoflegends.com/api/versions.json
   *
   * 2. Champions Dataset
   *  https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/champion.json
   *
   * 3. Runes Dataset
   *  https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/runesReforged.json
   *
   * 4. Summoner Spells Dataset
   *  https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/summoner.json
   *
   * 5. Items Dataset
   *  https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/en_US/item.json
   *
   * 6. Gamemodes Dataset
   *  https://static.developer.riotgames.com/docs/lol/queues.json
   *
   * 7. Arena Dataset
   *  https://raw.communitydragon.org/latest/cdragon/arena/en_us.json
   *
   * // COMBINE PENDINGS, ERRORS, DATA RETURNS
   * IE: const anyDatasetErrors = isThingError || isThing2Error;
   * IE: const datasetErrors = [thingError?.message,thing2Error?.message].filter((message) => message !== undefined);
   */
}
