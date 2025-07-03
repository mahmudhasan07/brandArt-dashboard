export async function verifyJwt(token: string, secret: string) {
  const [headerB64, payloadB64, signatureB64] = token.split(".");
  if (!headerB64 || !payloadB64 || !signatureB64) {
    throw new Error("Invalid JWT format");
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    encoder.encode(`${headerB64}.${payloadB64}`),
    base64urlToBuffer(signatureB64)
  );

  if (!isValid) throw new Error("Invalid token signature");

  const payloadJson = atob(payloadB64);
  const payload = JSON.parse(payloadJson);

  // Check expiration manually
  const currentTime = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < currentTime) {
    throw new Error("Token expired");
  }

  return payload;
}

function base64urlToBuffer(base64url: string) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}
