import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({ "Content-Type": "application/json" });

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    //GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options).then((response) =>
    response
      .json()
      .then((json) => {
        if (!response.ok) {
          // response.ok 가 true 이면 정상적인 응답을 받은 것이고 아니면 에러를 받은 것임.
          return Promise.reject(json);
        }
        return json;
      })
      .catch((error) => {
        console.log(error.state);
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      })
  );
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.token) {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        window.location.href = "/";
      }
    })
    .catch((error) => {
      alert("아이디와 비밀번호를 확인해주세요.");
    });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/";
}
