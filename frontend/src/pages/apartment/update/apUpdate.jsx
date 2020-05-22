import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import fetchBody from "../../../utils/fetchUtils";
import UpdateInfoModal from "./updateInfoModal/updateInfoModal.jsx";

const UpdateApartment = ({ token }) => {
  const [apartment, setApartment] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = ({ apNumber, apBlock }) => {
    const requestBody = {
      query: `
          query{
            apartmentByNumberBlock(number:"${apNumber}",block:"${apBlock}"){
              id
              number
              block
              tenantIds
              representativeTenantId
            }
          }
        `,
    };

    fetch("http://localhost:4000", fetchBody(requestBody, token))
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed.");
        }
        return res.json();
      })
      .then(({ data, errors }) => {
        if (data.apartmentByNumberBlock == null)
          notify("Apartamento não cadastrado", "error");
        else {
          setApartment(data.apartmentByNumberBlock);
          setShowModal(true);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Atualizar Apartamento</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">
              Número do apartamento a ser atualizado
            </label>
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
            <label className="label">
              Bloco do apartamento a ser atualizado
            </label>
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
        <UpdateInfoModal
          apartment={apartment}
          showModal={showModal}
          setShowModal={setShowModal}
          token={token}
          resetPreviousForm={reset}
        />
      </div>
    </section>
  );
};

export default UpdateApartment;
