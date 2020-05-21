export default function (requestBody, token) {
  return {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
}
