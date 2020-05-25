import React from "react";
import Modal from "react-modal";
import TagList from "../../../components/tagList/tagList.jsx";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../utils/ErrorMessage";
import notify from "../../../utils/toast";
import { ApartmentService } from "../../../services/ApartmentService";

Modal.setAppElement("#root");

const LinkApModal = ({
  showModal,
  setShowModal,
  linkedApArray,
  setLinkedApArray,
  unlinkAp,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const verifyDuplicateApLink = (apToBeLinkedId) => {
    const list = linkedApArray.filter((ap) => {
      return apToBeLinkedId === ap.id;
    });

    if (list.length > 0) return true;
    else return false;
  };

  const onSubmit = ({ apNumber, apBlock }) => {
    ApartmentService.findApartmentByNumberBlock({ apNumber, apBlock }).then(
      ({ data }) => {
        if (data.apartmentByNumberBlock == null)
          notify("Apartamento não cadastrado", "error");
        else {
          if (verifyDuplicateApLink(data.apartmentByNumberBlock.id))
            notify("Apartamento já inserido", "error");
          else {
            setLinkedApArray([...linkedApArray, data.apartmentByNumberBlock]);
            reset({
              apNumber: "",
              apBlock: "",
            });
          }
        }
      }
    );
  };

  return (
    <Modal
      isOpen={showModal}
      contentLabel="Apartment Link Modal"
      className="Modal"
      overlayClassName="modal-overlay"
    >
      <div className=" container">
        <div className="modal-header">
          <h4 className="title is-4">Vincular Apartamento</h4>
        </div>
        <div className="modal-body">
          <TagList
            title={"Apartamentos a serem vinculados"}
            apArray={linkedApArray}
            deleteFunction={unlinkAp}
          />

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
                  Adicionar
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-success"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Concluir
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LinkApModal;
