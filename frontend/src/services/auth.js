import { authEndpoints } from "./Api/auth";

export async function register(userToAuthenticate) {
  const response = await authEndpoints
    .register(userToAuthenticate)
    .catch((error) => {
      if (error?.response) {
        console.log(response);
        return;
      }
    });
  return response.data;
}

export async function login(userCredentials) {
  const response = await authEndpoints
    .login(userCredentials?.username, userCredentials?.password)
    .catch((error) => {
      if (error?.response) {
        console.log(response.status);
        return;
      }
    });
  return response.data;
}

export async function refreshAccessToken(refreshAccessToken) {
    const response = await authEndpoints.singleByRefreshToken(refreshAccessToken).catch((error) => {
        if(error?.response){
            console.log(response);
            return;
        }
    });
    return response.data;
}
