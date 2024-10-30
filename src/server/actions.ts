"use server";
import { getDDVersionResTypes } from "@/lib/types";

const APIKEY = process.env.RIOTAPIKEY;

// SUCCESS RETURN CONVENTION:
// return { success: true, data, message: "SUCCESS: Text" };
// ERROR RETURN CONVENTION
// return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
// API KEY: ${process.env.RIOTAPIKEY}

export async function serverTest() {}
