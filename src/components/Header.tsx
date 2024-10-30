import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1>
        <Link href="/">LOLMH.NEXT</Link>
      </h1>
      <div className="header-divider"></div>
    </header>
  );
}
