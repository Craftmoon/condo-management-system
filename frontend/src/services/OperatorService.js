import fetchBody from "../utils/fetchUtils";

class OperatorService {
  createOperator = ({ username, password }) => {
    const requestBody = {
      query: `
          mutation{
            createOperator(username:"${username}",password:"${password}"){
              id
              username
            }
          }
        `,
    };

    return fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  };

  login = ({ username, password }) => {
    const requestBody = {
      query: `
        query{
            login(username:"${username}", password:"${password}"){
                operatorId
                token
                tokenExpiration
            }
        }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  };
}

const instance = new OperatorService();

export { instance as OperatorService };
