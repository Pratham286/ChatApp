// jwtUtils.js
import jwt from "jsonwebtoken";

/*
 * Decode & verify a JWT string.
 * @param {string} token  The raw JWT (e.g. from a cookie or header).
 * @returns {object}      The decoded payload (e.g. { userId, name, ... }).
 * @throws                If token is missing, invalid, or expired.
 */
export function decodeTokenFromString(token) {
  if (!token) {
    throw new Error("No token provided");
  }
  return jwt.verify(token, process.env.SECRET_KEY);
}
