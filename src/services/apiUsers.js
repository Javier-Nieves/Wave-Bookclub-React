import axios from "axios";

import { SERVER_URL } from "../utils/config";

export async function login(data) {
  if (!data) return {};
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

export async function checkAuth() {
  try {
    // check LocalStarage for jwt token. In case of page refresh
    const savedJwt = localStorage.getItem("jwt");
    if (!savedJwt) return false;

    const res = await axios({
      method: "POST",
      url: `${SERVER_URL}api/v1/users/logged-check`,
      data: { token: savedJwt },
    });
    if (res.data.status === "success") {
      // user object:
      return res.data.data.currentUser;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logout() {
  localStorage.removeItem("jwt");
}

export async function register(data) {
  //  structure: data = {name,password,passwordConfirm };
  if (!data.name || !data.password || !data.passwordConfirm) return;

  try {
    const res = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${SERVER_URL}api/v1/users`,
      data,
    });

    if (res.data.status === "success")
      return { user: res.data.data.user, jwt: res.data.token };
  } catch (err) {
    throw new Error(err.message);
  }
}
