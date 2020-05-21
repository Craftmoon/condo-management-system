import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";

const RegisterApartment = ({ token }) => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = ({ apNumber, apBlock }) => {
    const requestBody = {
      query: `
          mutation{
            createApartment(number:"${apNumber}",block:"${apBlock}"){
              id
              number
              block
            }
          }
        `,
    };

    fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed.");
        }
        return res.json();
      })
      .then(({ data, errors }) => {
        if (data.createApartment == null) notify(errors[0].message, "error");
        else {
          notify(
            `Apartamento número ${data.createApartment.number}, bloco ${data.createApartment.block} cadastrado com sucesso`,
            "success"
          );
          reset({
            apNumber: "",
            apBlock: "",
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Cadastro de Apartamento</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Número do apartamento</label>
            <div className="control">
              <input
                name="apNumber"
                className={"input" + (errors.apNumber ? " is-danger" : "")}
                placeholder="Exemplo: 101"
                ref={register({
                  required: true,
                  maxLength: 15,
                  pattern: /^[A-Za-z0-9 ]+$/,
                })}
              />
              <ErrorMessage error={errors.apNumber} />
            </div>
          </div>

          <div className="field">
            <label className="label">Bloco</label>
            <div className="control">
              <input
                name="apBlock"
                className={"input" + (errors.apBlock ? " is-danger" : "")}
                placeholder="Exemplo: A"
                ref={register({
                  required: true,
                  maxLength: 15,
                  pattern: /^[A-Za-z0-9 ]+$/,
                })}
              />
              <ErrorMessage error={errors.apBlock} />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-success">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterApartment;
