export function generateCodeChallenge(codeVerifier: string) {
  const utf8 = new TextEncoder().encode(codeVerifier);
  return btoa(String.fromCharCode(...utf8));
}
