import * as jwtEncrypt from "jwt-token-encrypt";

const publicData = {
  role: "user",
};

// Data that will only be available to users who know encryption details.
const privateData = {
  email: "user",
  bank: "HSBC",
  pin: "1234",
};

// Encryption settings
const encryption = {
  key: "AAAAAAAAAAAAAA",
  algorithm: "aes-256-cbc",
};

// JWT Settings
const jwtDetails = {
  secret: "1234567890", // to sign the token
  // Default values that will be automatically applied unless specified.
  // algorithm: 'HS256',
  // expiresIn: '12h',
  // notBefore: '0s',
  // Other optional values
  key: "ThisIsMyAppISS", // is used as ISS but can be named iss too
};

const token = await jwtEncrypt.generateJWT(
  jwtDetails,
  publicData,
  encryption,
  privateData
);

export default token;
