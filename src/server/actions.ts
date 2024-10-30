"use server";

export async function serverTest() {
  console.log(`RIOT API KEY: ${process.env.RIOTAPIKEY}`);
  // try {
  //   const res = await fetch("");

  //   if (!res.ok) {
  //     throw new Error(`HTTP Error: ${res.status}`);
  //   }

  //   const data = await res.json();

  //   return { success: true, data, message: "SUCCESS" };
  // } catch (err: unknown) {
  //   return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  // }
}

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
