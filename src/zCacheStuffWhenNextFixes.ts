// "use cache";
// import { unstable_cacheLife as cacheLife } from "next/cache";

// cacheLife("hours");
/** cacheLife:
 * cacheLife({ stale: N, revalidate: N, expire: N }) N = SECONDS.
 * Stale:.......Cache may be stale on clients for N seconds before refetching from server.
 * Revalidate:..If the server receives a new request after N seconds, start revalidating new values in the background.
 * Expire:......If this entry has no traffic for N seconds it will expire. The next request will recompute it.
 */
// cacheLife outside fn is currently bugged (or docs wrong?): https://github.com/vercel/next.js/issues/71900
