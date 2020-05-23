import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import TagList from "../../../components/tagList/tagList.jsx";
import LinkApModal from "./linkApModal/linkApModal.jsx";
import notify from "../../../utils/toast";
import { TenantService } from "../../../services/TenantService";

const RegisterTenant = ({ token }) => {
  const [linkedApArray, setLinkedApArray] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const unlinkAp = (idToRemove) => {
    const newApArray = linkedApArray.filter((ap) => {
      return ap.id !== idToRemove;
    });

    setLinkedApArray(newApArray);
  };

  const mountIdOnlyArray = () => {
    const apIdArray = linkedApArray.map((ap) => `"${ap.id}"`);
    return apIdArray;
  };

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = ({
    tenantName,
    tenantEmail,
    tenantDateOfBirth,
    tenantPhone,
    tenantCpf,
  }) => {
    const apartmentIds = mountIdOnlyArray();

    TenantService.createTenant({
      tenantName,
      tenantEmail,
      tenantDateOfBirth,
      tenantPhone,
      tenantCpf,
      apartmentIds,
    }).then(({ data, errors }) => {
      if (data.createTenant == null) notify(errors[0].message, "error");
      else {
        notify(
          `Morador ${data.createTenant.name} foi cadastrado com sucesso`,
          "success"
        );
        reset({
          tenantName: "",
          tenantEmail: "",
          tenantDateOfBirth: "",
          tenantPhone: "",
          tenantCpf: "",
          linkedApArray: "",
        });
        setLinkedApArray([]);
      }
    });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Cadastrar Morador</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="half-form-container">
            <div>
              <div className="field ">
                <label className="label">Nome</label>
                <div className="control">
                  <input
                    name="tenantName"
                    className={
                      "input" + (errors.tenantName ? " is-danger" : "")
                    }
                    placeholder="Exemplo: João das Neves"
                    ref={register({
                      required: true,
                      pattern: /^[A-Za-z0-9 ]+$/,
                    })}
                  />
                  <ErrorMessage error={errors.tenantName} />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    name="tenantEmail"
                    className={
                      "input" + (errors.tenantEmail ? " is-danger" : "")
                    }
                    placeholder="Exemplo: joãoneves@gmail.com"
                    ref={register({
                      required: {
                        value: true,
                        message: "Este campo é obrigatório.",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        message: "O e-mail informado é inválido.",
                      },
                    })}
                  />
                  {errors.tenantEmail && (
                    <p className="help is-danger">
                      {errors.tenantEmail.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div className="field">
                <label className="label">Data de Nascimento</label>
                <div className="control">
                  <input
                    name="tenantDateOfBirth"
                    className={
                      "input" + (errors.tenantDateOfBirth ? " is-danger" : "")
                    }
                    placeholder="Exemplo: 05/10/1990"
                    ref={register({
                      required: {
                        value: true,
                        message: "Este campo é obrigatório.",
                      },
                      pattern: {
                        value: /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/,
                        message: "Data de nascimento inválida",
                      },
                    })}
                  />
                  {errors.tenantDateOfBirth && (
                    <p className="help is-danger">
                      {errors.tenantDateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Número de Telefone</label>
                <div className="control">
                  <input
                    name="tenantPhone"
                    className={
                      "input" + (errors.tenantPhone ? " is-danger" : "")
                    }
                    placeholder="Exemplo: 48982513611"
                    ref={register({
                      required: {
                        value: true,
                        message: "Este campo é obrigatório.",
                      },
                      maxLength: {
                        value: 11,
                        message:
                          "Digite o DDD e em seguida o número, sem espaços ou parenteses.",
                      },
                      minLength: {
                        value: 11,
                        message:
                          "Digite o DDD e em seguida o número, sem espaços ou parenteses.",
                      },
                    })}
                  />
                  {errors.tenantPhone && (
                    <p className="help is-danger">
                      {errors.tenantPhone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">CPF (Cadastro de Pessoa Física)</label>
            <div className="control">
              <input
                name="tenantCpf"
                className={"input" + (errors.tenantCpf ? " is-danger" : "")}
                placeholder="Exemplo: 99999999999"
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo é obrigatório.",
                  },
                  maxLength: {
                    value: 11,
                    message:
                      "O CPF deve conter 11 dígitos, sem pontos nem traços.",
                  },
                  minLength: {
                    value: 11,
                    message:
                      "O CPF deve conter 11 dígitos, sem pontos nem traços.",
                  },
                })}
              />
              {errors.tenantCpf && (
                <p className="help is-danger">{errors.tenantCpf.message}</p>
              )}
            </div>
          </div>

          <TagList
            title={"Apartamentos a serem vinculados"}
            apArray={linkedApArray}
            deleteFunction={unlinkAp}
          />
          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className="button is-success"
                disabled={linkedApArray.length === 0}
              >
                Cadastrar
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="button is-success"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Vincular apartamento
              </button>
            </div>
          </div>
        </form>
        <LinkApModal
          showModal={showModal}
          setShowModal={setShowModal}
          token={token}
          linkedApArray={linkedApArray}
          setLinkedApArray={setLinkedApArray}
        />
      </div>
    </section>
  );
};

export default RegisterTenant;
