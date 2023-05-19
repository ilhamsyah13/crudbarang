import React from "react";
import * as jose from "jose";
import { Buffer } from "buffer";

export default function JWTButton(props) {
  const secret = Buffer.from(
    "62197fc8886bd3b739dd2cc8aa109d0be93acdea64c07b8908168b80daf1dc47",
    "hex"
  );

  const encryptedJwt = async () => {
    const signJwt = await new jose.SignJWT(props.store)
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("testsub")
      .setIssuedAt()
      .setIssuer("https://example.com")
      .setAudience("https://example.com/test")
      .setExpirationTime("1d")
      .sign(secret);
    props.setJwtToken(signJwt);
  };

  return (
    <button onClick={encryptedJwt} className="button button-jwt">
      JWT
    </button>
  );
}
