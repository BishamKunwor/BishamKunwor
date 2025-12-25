export function generateCodeChallenge(codeVerifier: string) {
  const utf8 = new TextEncoder().encode(codeVerifier);
  return btoa(String.fromCharCode(...utf8));
}

export function getHostname() {
  const hostname = window.location.hostname;
  const splittedHostName = hostname.split(".");
  return splittedHostName.includes("www")
    ? splittedHostName.filter((_, index) => index !== 0).join(".")
    : hostname;
}
