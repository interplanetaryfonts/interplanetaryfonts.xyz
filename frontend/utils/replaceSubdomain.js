export default function replaceSubdomain(url, newSubdomain) {
  const parsedUrl = new URL(url);
  const subdomains = parsedUrl.hostname.split(".");

  const tld = subdomains.at(-1);

  let partsCount = subdomains.length;

  if (tld === "localhost") {
    partsCount = partsCount + 1;
  }

  if (partsCount < 3) {
    subdomains.unshift(newSubdomain);
  } else {
    subdomains[0] = newSubdomain;
  }

  if (!subdomains[0]) {
    subdomains.shift();
  }

  parsedUrl.hostname = subdomains.join(".");
  return parsedUrl.toString();
}
