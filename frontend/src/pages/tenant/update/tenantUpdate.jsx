import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import { TenantService } from "../../../services/TenantService";
import { ApartmentService } from "../../../services/ApartmentService";
import LinkApModal from "../linkApModal/linkApModal.jsx";
import TagList from "../../../components/tagList/tagList.jsx";

const UpdateTenant = () => {
  const [tenant, setTenant] = useState(null);
  const [linkedApArray, setLinkedApArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    errors: errorsSearch,
    reset: resetSearch,
  } = useForm();
  const { register, handleSubmit, errors, reset } = useForm();

  // Desvincula aplicativo do morador
  const unlinkAp = (idToRemove) => {
    const newApArray = linkedApArray.filter((ap) => {
      return ap.id !== idToRemove;
    });

    setLinkedApArray(newApArray);
  };

  // Monta um array só de ids em string pra ser usado nas requisições
  const mountIdOnlyArray = () => {
    const apIdArray = linkedApArray.map((ap) => `"${ap.id}"`);
    return apIdArray;
  };

  // Busca e seta os apartamentos recebidos como vinculados ao morador sendo atualizado
  const updateTenantLinkedAp = async (idArray) => {
    const apes = await idArray.reduce(async (array, value) => {
      const collection = await array;
      const { data } = await ApartmentService.findApartmentById({
        apId: value,
      });
      await collection.push(data.apartment);
      return collection;
    }, Promise.resolve([]));
    setLinkedApArray(apes);
  };

  // Submit do formulario de busca de morador (só cpf)
  const onSubmitSearch = ({ tenantCpf }) => {
    TenantService.tenantByCpf({ tenantCpf }).then(({ data }) => {
      if (data.tenantByCpf == null)
        notify(
          "Não existem moradores cadastrados com o CPF digitado. Por favor, consulte o CPF do morador que deseja atualizar.",
          "error"
        );
      else {
        setTenant(data.tenantByCpf);
        updateTenantLinkedAp(data.tenantByCpf.apartmentIds);
      }
    });
  };

  // Submit do formulario de update
  const onSubmit = ({
    tenantName,
    tenantEmail,
    tenantDateOfBirth,
    tenantPhone,
    tenantCpf,
  }) => {
    const apartmentIds = mountIdOnlyArray();
    const tenantId = tenant.id;
    const previousApartmentIds = tenant.apartmentIds.map(
      (apartmentId) => `"${apartmentId}"`
    );

    TenantService.updateTenant({
      tenantId,
      tenantName,
      tenantEmail,
      tenantDateOfBirth,
      tenantPhone,
      tenantCpf,
      apartmentIds,
      previousApartmentIds,
    }).then(({ data, errors }) => {
      if (data.updateTenant == null) notify(errors[0].message, "error");
      else {
        notify(
          `As informações do antigo morador ${data.updateTenant.name} foram atualizadas com sucesso`,
          "success"
        );
        resetUpdate();
      }
    });
  };

  // Reseta info dos forms, seta morador null e aps vinculados vazio
  const resetUpdate = () => {
    reset({
      tenantName: "",
      tenantEmail: "",
      tenantDateOfBirth: "",
      tenantPhone: "",
      tenantCpf: "",
      linkedApArray: "",
    });
    resetSearch({
      tenantCpf: "",
    });
    setTenant(null);
    setLinkedApArray([]);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Atualizar Morador</h1>
        {!tenant && (
          <form onSubmit={handleSubmitSearch(onSubmitSearch)}>
            <div className="field">
              <label className="label">Insira o CPF do morador</label>
              <div className="control">
                <input
                  name="tenantCpf"
                  className={
                    "input" + (errorsSearch.tenantCpf ? " is-danger" : "")
                  }
                  placeholder="Exemplo: 07137948596"
                  ref={registerSearch({
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
                {errorsSearch.tenantCpf && (
                  <p className="help is-danger">
                    {errorsSearch.tenantCpf.message}
                  </p>
                )}{" "}
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-success">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        )}
        {tenant && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              Modifique as informações a serem atualizadas
            </label>
            <div className="half-form-container">
              <div>
                <div className="field ">
                  <label className="label">Nome</label>
                  <div className="control">
                    <input
                      defaultValue={tenant.name}
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
                      defaultValue={tenant.email}
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
                <div className="field">
                  <label className="label">Data de Nascimento</label>
                  <div className="control">
                    <input
                      defaultValue={tenant.dateOfBirth}
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
                      defaultValue={tenant.phone}
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
                  defaultValue={tenant.cpf}
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
              title={"Apartamentos vinculados"}
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
                  Atualizar
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

              <div className="control">
                <button
                  type="button"
                  className="button is-danger"
                  onClick={() => {
                    resetUpdate();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}
        <LinkApModal
          showModal={showModal}
          setShowModal={setShowModal}
          linkedApArray={linkedApArray}
          setLinkedApArray={setLinkedApArray}
          unlinkAp={unlinkAp}
        />
      </div>
    </section>
  );
};

export default UpdateTenant;
