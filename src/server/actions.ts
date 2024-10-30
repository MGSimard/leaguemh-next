"use server";

// SUCCESS RETURN CONVENTION:
// return { success: true, data, message: "SUCCESS: Text" };

// ERROR RETURN CONVENTION
// return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };

// API KEY: ${process.env.RIOTAPIKEY}

export async function serverTest() {
  try {
    const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    if (!res.ok) throw new Error("There was an issue fetching the latest Data Dragon version.");
    const result = await res.json();
    const data = result[0];
    return { success: true, data, message: "SUCCESS: Text" };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
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
