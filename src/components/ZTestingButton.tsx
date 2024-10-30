"use client";
import { serverTest } from "@/server/actions";
import { getLeagueDatasets } from "@/lib/getLeagueDatasets";

const handleTest = async () => {
  const result = await serverTest();
  console.log("Server Test Result:", result);
};

export function ZTestingButton() {
  return <button onClick={handleTest}>Test Server Action</button>;
}
