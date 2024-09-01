import { auth } from "@clerk/nextjs/server";
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";

export async function getUserData() {
  const user = auth();
  // see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#preventing-sensitive-data-from-being-exposed-to-the-client
  experimental_taintObjectReference("user", user);
  if (user.userId) {
    experimental_taintUniqueValue("userId", user, user.userId);
  }
  if (user.sessionId) {
    experimental_taintUniqueValue("sessionId", user, user.sessionId);
  }
  if (user.sessionClaims) {
    experimental_taintUniqueValue(
      "sessionClaims",
      user,
      JSON.stringify(user.sessionClaims),
    );
  }
  return user;
}

/* user structure
 user: {
  actor: undefined,
  sessionClaims: {
    azp: 'http://localhost:3000',
    exp: 1725159748,
    iat: 1725159688,
    iss: 'https://expert-mink-54.clerk.accounts.dev',
    nbf: 1725159678,
    sid: 'sess_2lS2CxADg6sGXFKLm98D0OsvM80',
    sub: 'user_2lNA3nIsfAE0oRqbbcgdmt8NVCO'
  },
  sessionId: 'sess_2lS2CxADg6sGXFKLm98D0OsvM80',
  userId: 'user_2lNA3nIsfAE0oRqbbcgdmt8NVCO',
  orgId: undefined,
  orgRole: undefined,
  orgSlug: undefined,
  orgPermissions: undefined,
  getToken: [AsyncFunction (anonymous)],
  has: [Function (anonymous)],
  debug: [Function (anonymous)],
  protect: [Function (anonymous)],
  redirectToSignIn: [Function: redirectToSignIn]
}
*/
