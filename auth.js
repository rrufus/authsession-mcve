import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";

export const auth0ClientId = "457TeVRcN7KONqOtTxiVLDZvjomQGz4h";

export const auth0Domain = "https://dev-b-6vvbfx.eu.auth0.com";

const toQueryString = (params) => {
  const entries = Object.entries(params);
  return entries.length > 0
    ? "?" +
        Object.entries(params)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
    : "";
};

async function login() {
  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });

  // Structure the auth parameters and URL
  const queryParams = toQueryString({
    client_id: auth0ClientId,
    redirect_uri: redirectUrl,
    response_type: "id_token", // id_token will return a JWT token
    scope: "openid profile", // retrieve the user's profile
    nonce: "nonce", // ideally, this will be a random value
  });
  const authUrl = `${auth0Domain}/authorize` + queryParams;

  // Perform the authentication
  return AuthSession.startAsync({
    authUrl,
  });
}

async function logout() {
  // If we are in expo, dont redirect back to the real version of the app
  const logoutUrl = `${auth0Domain}/v2/logout?federated&client_id=${auth0ClientId}`;

  // todo fix the redirectTo so we re-open the app after logging out
  // instead of leaving the user in a browser
  return Linking.openURL(logoutUrl);
}

export { login, logout };
