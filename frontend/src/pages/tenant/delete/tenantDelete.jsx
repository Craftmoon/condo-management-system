import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import { TenantService } from "../../../services/TenantService";

const DeleteTenant = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = ({ tenantCpf }) => {
    TenantService.deleteByCpf({
      tenantCpf,
    }).then(({ data }) => {
      if (data.deleteTenantByCpf == null)
        notify("Morador não encontrado", "error");
      else {
        notify(
          `Morador ${data.deleteTenantByCpf.name} foi removido com sucesso `,
          "success"
        );
        reset({
          tenantCpf: "",
        });
      }
    });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Remover morador</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">CPF do morador</label>
            <div className="control">
              <input
                name="tenantCpf"
                className={"input" + (errors.tenantCpf ? " is-danger" : "")}
                placeholder="Exemplo: 101"
                ref={register({
                  required: true,
                  minLength: {
                    value: 11,
                    message: "O CPF deve possuir 11 numeros",
                  },
                  maxLength: {
                    value: 11,
                    message: "O CPF deve possuir 11 numeros",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "O CPF deve possuir somente numeros.",
                  },
                })}
              />
              {errors.tenantCpf && (
                <p className="help is-danger">{errors.tenantCpf.message}</p>
              )}
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
export default DeleteTenant;
