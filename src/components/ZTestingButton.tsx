"use client";
import { serverTest } from "@/server/actions";

const handleTest = async () => {
  const result = await serverTest();
  console.log(result);
};

export function ZTestingButton() {
  return <button onClick={handleTest}>Test Server Action</button>;
}
