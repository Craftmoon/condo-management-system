const token = window.localStorage.getItem("token");

export default function (requestBody) {
  return {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
}
