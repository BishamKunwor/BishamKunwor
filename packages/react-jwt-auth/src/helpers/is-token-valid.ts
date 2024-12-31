export default function isTokenValid(token: string) {
  // A valid JWT has three parts separated by dots
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  try {
    // Decode and parse the header and payload to ensure they are valid JSON
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    // Basic checks on the header and payload
    if (typeof header !== "object" || typeof payload !== "object") {
      return false;
    }

    // Optional: Check if the token has expired
    if (payload.exp && typeof payload.exp === "number") {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > payload.exp) {
        return false;
      }
    }

    // If we reach here, the token structure is valid
    return true;
  } catch (error) {
    // If any error occurs during parsing, the token is invalid
    // console.error("Invalid token structure:", error.message);
    return false;
  }
}
