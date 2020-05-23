import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import { ApartmentService } from "../../../services/ApartmentService";

const DeleteApartment = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = ({ apNumber, apBlock }) => {
    ApartmentService.deleteApartmentByNumberBlock({
      apNumber,
      apBlock,
    }).then(({ errors }) => {
      if (errors != undefined) notify(errors[0].message, "error");
      else {
        notify(
          `Apartamento número ${apNumber}, bloco ${apBlock} removido com sucesso`,
          "success"
        );
        reset({
          apNumber: "",
          apBlock: "",
        });
      }
    });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Remover Apartamento</h1>

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
              <button type="submit" className="button is-danger">
                Remover
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default DeleteApartment;
