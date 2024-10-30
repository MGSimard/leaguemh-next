"use client";
import { serverTest } from "@/server/actions";
import { getDDVersion } from "@/server/actions";

const handleTest = async () => {
  await serverTest();
};

export function ZTestingButton() {
  return <button onClick={handleTest}>Test Server Action</button>;
}
