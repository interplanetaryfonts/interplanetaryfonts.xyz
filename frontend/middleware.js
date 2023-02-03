import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req) {
  // If in preview environment perform no rewrites
  // since preview URLs have dynamic subdomains.
  // Therefore to access app pages you will need
  // to navigate to /app/<page route here>
  // or /home/<page route here> for content pages
  if (process.env.VERCEL_ENV === "preview") {
    return NextResponse.next();
  }

  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get("host") || "interplanetaryfonts.xyz";

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.interplanetaryfonts.xyz`, "")
          .replace(`.ipfonts.xyz`, "")
          .replace(`.app-interplanetaryfonts.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "");

  // rewrites for app pages
  if (currentHost == "app") {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === "app-interplanetaryfonts.vercel.app" ||
    hostname === "interplanetaryfonts.xyz" ||
    hostname === "ipfonts.xyz"
  ) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }

  // Enable if we decide to use a CMS to create static content pages like in
  // https://github.com/vercel/platforms/tree/60136482d84acd31e60d7004f3cfe20ab05070fb/pages/_sites/%5Bsite%5D
  // rewrite everything else to `/_sites/[site] dynamic route
  // return NextResponse.rewrite(
  //   new URL(`/_sites/${currentHost}${path}`, req.url)
  // );
}
