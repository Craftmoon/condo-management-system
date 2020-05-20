import React, { useState, Fragment } from "react";
import { ReactComponent as KiperLogo } from "../../assets/images/logo_kiper.svg";

const LoginSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpPage, setisSignUpPage] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    // Valida o username/password

    let requestBody = {
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

    if (isSignUpPage) {
      requestBody = {
        query: `
          mutation{
            createOperator(username:"${username}",password:"${password}"){
              id
              username
            }
          }
        `,
      };
    }

    fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="login-signup-screen">
        <div className="box">
          <div className="has-text-centered is-size-3">
            {isSignUpPage === false ? (
              <Fragment>
                <KiperLogo></KiperLogo>
                <p>Gestão de Condominios</p>
              </Fragment>
            ) : (
              <p>Cadastro de Operador</p>
            )}
          </div>
          <form
            className="form-horizontal signup-form"
            onSubmit={submitHandler}
          >
            <fieldset>
              <div className="field">
                <div className="form-control control has-icons-left has-icons-right">
                  <input
                    className="input" // is-success"
                    type="text"
                    placeholder="Usuário"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    // value=""
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <div className="form-control control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Senha"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  {isSignUpPage === false ? (
                    <button className="button is-success is-light">
                      Entrar
                    </button>
                  ) : (
                    <button
                      className="button is-success is-light"
                      to="/login"
                      onClick={() => setisSignUpPage(true)}
                    >
                      Confirmar cadastro
                    </button>
                  )}
                </div>
                <div className="control">
                  {isSignUpPage === false ? (
                    <button
                      type="button"
                      className="button is-light"
                      onClick={() => {
                        setisSignUpPage(true);
                      }}
                    >
                      Cadastrar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button is-light"
                      onClick={() => {
                        setisSignUpPage(false);
                      }}
                    >
                      Voltar
                    </button>
                  )}
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginSignUp;
