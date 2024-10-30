"use client";
import { serverTest } from "@/server/actions";

export function ZTestingButton() {
  return <button onClick={serverTest}>Test Server Action</button>;
}
