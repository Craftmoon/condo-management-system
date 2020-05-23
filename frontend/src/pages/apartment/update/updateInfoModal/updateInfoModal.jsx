import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../../utils/ErrorMessage";
import notify from "../../../../utils/toast";
import { ApartmentService } from "../../../../services/ApartmentService";

Modal.setAppElement("#root");

const UpdateInfoModal = ({
  apartment,
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
    const apId = apartment.id;
    const representativeTenantId = apartment.representativeTenantId;
    const tenantIds = mountTenantIds();

    ApartmentService.updateApartment({
      apId,
      apNumber,
      apBlock,
      tenantIds,
      representativeTenantId,
    }).then(({ errors }) => {
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
