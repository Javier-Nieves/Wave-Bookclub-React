import axios from "axios";

import { SERVER_URL } from "../utils/config";

export async function login(data) {
  //   if (user === name) return;

  try {
    const res = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${SERVER_URL}api/v1/users/login`,
      data,
    });

    if (res.data.status === "success")
      return { user: res.data.data.user, jwt: res.data.token };
  } catch (err) {
    throw new Error(err.message);
  }
}

// export async function checkAuth() {
//   try {
//     // check LocalStarage for jwt token. In case of page refresh
//     // const savedJwt = localStorage.getItem("jwt");
//     // if (savedJwt) dispatch({ type: "restoreToken", payload: savedJwt });

//     const res = await axios({
//       method: "POST",
//       url: `${SERVER_URL}api/v1/users/logged-check`,
//       data: { token: jwt },
//     });
//     if (res.data.status === "success") {
//       //   dispatch({
//       //     type: "userIsAuthenticated",
//       //     payload: res.data,
//       //   });
//     }
//   } catch (err) {
//     // dispatch({
//     //   type: "rejected",
//     //   payload: `Error while checking login! ${err.message}`,
//     // });
//   }
// }
