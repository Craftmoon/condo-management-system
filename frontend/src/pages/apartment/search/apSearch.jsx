import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import ApCard from "../../../components/apCard/apCard.jsx";
import { ApartmentService } from "../../../services/ApartmentService";

const SearchApartment = () => {
  const [searchType, setSearchType] = useState("one");
  const [apartments, setApartments] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ apNumber, apBlock }) => {
    ApartmentService.findApartmentByNumberBlock({
      apNumber,
      apBlock,
    }).then(({ data }) => {
      data.apartmentByNumberBlock == null
        ? notify("Apartamento não cadastrado", "error")
        : setApartments([data.apartmentByNumberBlock]);
    });
  };

  const fetchAll = () => {
    ApartmentService.fetchAllApartments().then(({ data, errors }) => {
      if (!data.apartments[0]) notify(errors[0].message, "error");
      setApartments(data.apartments);
    });
  };

  const mountCards = (apartments) => {
    const apCards = apartments.map((apartment) => {
      return (
        <ApCard
          apartment={apartment}
          key={apartment.number + apartment.block}
        />
      );
    });
    const cardsContainer = <div className="cards-container">{apCards}</div>;
    return cardsContainer;
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Buscar Apartamento</h1>
        <div className="field has-addons">
          <p className="control">
            <button
              className={"button " + (searchType === "one" ? "is-active" : "")}
              onClick={() => {
                setSearchType("one");
                setApartments([]);
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-building"></i>
              </span>
              <span>Buscar por número e bloco</span>
            </button>
          </p>
          <p className="control">
            <button
              className={"button " + (searchType === "all" ? "is-active" : "")}
              onClick={() => {
                setSearchType("all");
                fetchAll();
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-city"></i>
              </span>
              <span>Buscar todos</span>
            </button>
          </p>
        </div>
        {searchType === "one" && (
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
                  Buscar
                </button>
              </div>
            </div>
          </form>
        )}
        {apartments[0] && mountCards(apartments)}
      </div>
    </section>
  );
};

export default SearchApartment;
