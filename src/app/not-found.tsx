import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeagueMH - 404",
};

export default function NotFound() {
  return (
    <main className="notFoundContainer">
      <h1>Page Not Found.</h1>
      <h2>Sorry, an unexpected error has occured.</h2>
      {/* <p className="notFoundStatus">Error Message: </p> */}
      <Link href="/" className="returnLink">
        Return Home
      </Link>
    </main>
  );
}
