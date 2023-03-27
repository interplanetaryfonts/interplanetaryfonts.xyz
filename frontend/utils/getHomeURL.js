import replaceSubdomain from "./replaceSubdomain";

export default function getHomeOrigin(url) {
  // With vercel preview urls we can't use subdomains
  // since the preview url will have a dynamic subdomain
  // which matches the branch name. Therefore
  // app pages are served under the root path while
  // home/content pages are served under /home
  if (process.env.VERCEL_ENV === "preview") {
    return new URL("/home", url);
  }

  return replaceSubdomain(url, "");
}
