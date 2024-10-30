"use client";
import { serverTest } from "@/server/actions";
import { getLeagueDatasets } from "@/lib/getLeagueDatasets";

const handleTest = async () => {
  await getLeagueDatasets();
};

export function ZTestingButton() {
  return <button onClick={handleTest}>Test Server Action</button>;
}
