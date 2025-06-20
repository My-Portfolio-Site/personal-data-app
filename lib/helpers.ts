
export function getCurrentUrl(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("host") || headers.get("x-forwarded-host") || "localhost";
  console.log(protocol, host)

  return `${protocol}://${host}`;
}