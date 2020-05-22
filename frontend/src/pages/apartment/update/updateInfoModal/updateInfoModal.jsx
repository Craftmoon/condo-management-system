import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../../utils/ErrorMessage";
import notify from "../../../../utils/toast";
import fetchBody from "../../../../utils/fetchUtils";

Modal.setAppElement("#root");

const UpdateInfoModal = ({
  apartment,
  token,
  showModal,
  setShowModal,
  resetPreviousForm,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const mountTenantIds = () => {
    const tenantIdStringArray = apartment.tenantIds.map(
      (tenantId) => `"${tenantId}"`
    );
    return tenantIdStringArray;
  };

  const onSubmit = ({ apNumber, apBlock }) => {
    console.log("apartment", apartment);
    const requestBody = {
      query: `
            mutation{
                updateApartment(id:"${
                  apartment.id
                }",number:"${apNumber}",block:"${apBlock}", tenantIds:[${mountTenantIds()}], representativeTenantId:"${
        apartment.representativeTenantId
      }"){
                id
                number
                block
              }
            }
          `,
    };

    console.log("requestBody", requestBody);

    fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    fetch("http://localhost:4000", fetchBody(requestBody, token))
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed.");
        }
        return res.json();
      })
      .then(({ data, errors }) => {
        if (errors != undefined) notify(errors[0].message, "error");
        else {
          notify("Apartamento atualizado com sucesso", "success");
          reset({
            apNumber: "",
            apBlock: "",
          });
          resetPreviousForm({ apNumber: "", apBlock: "" });
          setShowModal(false);
        }

        console.log("data", data);
        console.log("error", errors);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Modal
      isOpen={showModal}
      contentLabel="Apartment Update Modal"
      className="Modal"
      overlayClassName="modal-overlay"
    >
      <div className=" container">
        <div className="modal-header">
          <h4 className="title is-4">Atualizar Apartamento</h4>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Número atualizado</label>
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
              <label className="label">Bloco atualizado</label>
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
                  Atualizar
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="button is-danger"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateInfoModal;
