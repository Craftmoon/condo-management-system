import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import TenantCard from "../../../components/tenantCard/tenantCard.jsx";
import { TenantService } from "../../../services/TenantService";

const SearchTenant = () => {
  const [searchType, setSearchType] = useState("one");
  const [tenants, setTenants] = useState([]);
  const {
    register: registerByAp,
    handleSubmit: handleSubmitByAp,
    errors: errorsByAp,
  } = useForm();
  const {
    register: registerByInfo,
    handleSubmit: handleSubmitByInfo,
    errors: errorsByInfo,
  } = useForm();

  const onSubmitByAp = ({ apNumber, apBlock }) => {
    TenantService.tenantByApartment({
      apNumber,
      apBlock,
    }).then(({ data, errors }) => {
      if (data.tenantByApartment == null)
        notify("Apartamento não cadastrado", "error");
      else {
        setTenants(data.tenantByApartment);
      }
    });
  };

  const onSubmitByInfo = ({ searchString }) => {
    TenantService.tenantByAny({ searchString }).then(({ data }) => {
      if (data.tenantByAny.length === 0)
        notify(
          "Morador não encontrado. Por favor, tente novamente com outra informação ou caso tenha inserido cpf, numero ou telefone, certifique-se de que não inseriu nada além de números (traços, parenteses, pontos, etc).",
          "error"
        );
      else setTenants(data.tenantByAny);
    });
  };

  // Recebe moradores e monta container com cards dos moradores
  const mountCards = (tenants) => {
    const tenantCards = tenants.map((tenant) => {
      return <TenantCard tenant={tenant} key={tenant.id} />;
    });

    const cardsContainer = <div className="cards-container">{tenantCards}</div>;
    return cardsContainer;
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Buscar Moradores</h1>
        <div className="field has-addons">
          <p className="control">
            <button
              className={"button " + (searchType === "one" ? "is-active" : "")}
              onClick={() => {
                setSearchType("one");
                setTenants([]);
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-building"></i>
              </span>
              <span>Buscar por número e bloco de apartamento</span>
            </button>
          </p>
          <p className="control">
            <button
              className={"button " + (searchType === "all" ? "is-active" : "")}
              onClick={() => {
                setSearchType("all");
                setTenants([]);
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-id-card"></i>
              </span>
              <span>Buscar por informação do morador</span>
            </button>
          </p>
        </div>
        {searchType === "one" && (
          <form onSubmit={handleSubmitByAp(onSubmitByAp)}>
            <div className="field">
              <label className="label">Número do apartamento</label>
              <div className="control">
                <input
                  name="apNumber"
                  className={
                    "input" + (errorsByAp.apNumber ? " is-danger" : "")
                  }
                  placeholder="Exemplo: 101"
                  ref={registerByAp({
                    required: true,
                    maxLength: 15,
                    pattern: /^[A-Za-z0-9 ]+$/,
                  })}
                />
                <ErrorMessage error={errorsByAp.apNumber} />
              </div>
            </div>
            <div className="field">
              <label className="label">Bloco</label>
              <div className="control">
                <input
                  name="apBlock"
                  className={"input" + (errorsByAp.apBlock ? " is-danger" : "")}
                  placeholder="Exemplo: a"
                  ref={registerByAp({
                    required: true,
                    maxLength: 15,
                    pattern: /^[A-Za-z0-9 ]+$/,
                  })}
                />
                <ErrorMessage error={errorsByAp.apBlock} />
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
        {searchType === "all" && (
          <form onSubmit={handleSubmitByInfo(onSubmitByInfo)}>
            <div className="field">
              <label className="label">
                Digite abaixo alguma informação do morador{" "}
              </label>
              <div className="control">
                <input
                  name="searchString"
                  className={
                    "input" + (errorsByInfo.searchString ? " is-danger" : "")
                  }
                  placeholder="Exemplo: joao@gmail.com, 15/02/1995, etc"
                  ref={registerByInfo({
                    required: true,
                  })}
                />
                <ErrorMessage error={errorsByInfo.searchString} />
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
        {tenants[0] && mountCards(tenants)}
      </div>
    </section>
  );
};

export default SearchTenant;
