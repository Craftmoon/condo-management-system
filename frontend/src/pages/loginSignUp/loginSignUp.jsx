import React, { useState, Fragment } from "react";
import { ReactComponent as KiperLogo } from "../../assets/images/logo_kiper.svg";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../utils/ErrorMessage";
import notify from "../../utils/toast";
import { OperatorService } from "../../services/OperatorService";

const LoginSignUp = ({ storeToken }) => {
  const [isSignUpPage, setisSignUpPage] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ username, password }) => {
    if (isSignUpPage) {
      OperatorService.createOperator({ username, password }).then(
        ({ errors }) => {
          if (errors != undefined) notify(errors[0].message, "error");
          else {
            notify("Operador cadastrado com sucesso", "success");
            setisSignUpPage(false);
          }
        }
      );
    } else {
      OperatorService.login({ username, password }).then(({ data, errors }) => {
        if (errors != undefined) notify(errors[0].message, "error");
        else {
          storeToken(data.login.token, data.login.operatorId);
        }
      });
    }
  };

  return (
    <section>
      <div className="login-signup-screen">
        <div className="box">
          <div className="has-text-centered is-size-3">
            {isSignUpPage === false ? (
              <Fragment>
                <KiperLogo></KiperLogo>
                <p>Gestão de Condominio</p>
              </Fragment>
            ) : (
              <p>Cadastro de Operador</p>
            )}
          </div>
          <form
            className="form-horizontal signup-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset>
              <div className="field">
                <div className="form-control control has-icons-left has-icons-right">
                  <input
                    className={"input" + (errors.username ? " is-danger" : "")}
                    type="text"
                    placeholder="Usuário"
                    id="username"
                    name="username"
                    ref={register({
                      required: true,
                      maxLength: 15,
                      pattern: /^[A-Za-z0-9 ]+$/,
                    })}
                  />
                  <ErrorMessage error={errors.username} />

                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <div className="form-control control has-icons-left">
                  <input
                    className={"input" + (errors.password ? " is-danger" : "")}
                    type="password"
                    placeholder="Senha"
                    id="password"
                    name="password"
                    ref={register({
                      required: true,
                    })}
                  />
                  <ErrorMessage error={errors.password} />

                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  {isSignUpPage === false ? (
                    <button
                      className="button is-success is-light"
                      type="submit"
                    >
                      Entrar
                    </button>
                  ) : (
                    <button
                      className="button is-success is-light"
                      to="/login"
                      type="submit"
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
