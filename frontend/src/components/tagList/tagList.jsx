import React from "react";

const TagList = ({ title, apArray, deleteFunction }) => {
  console.log(apArray);

  return (
    <div className="field ">
      <label className="label">{title}</label>

      {apArray.length === 0 ? <p style={{ color: "gray" }}>Vazio</p> : ""}
      <div className="tags-container">
        {apArray.map((ap) => {
          return (
            <div className="tags has-addons" key={ap.id}>
              <p className="tag is-link">{`Ap. nº${ap.number} bloco ${ap.block}`}</p>
              <a
                className="tag is-delete"
                onClick={() => {
                  deleteFunction(ap.id);
                }}
              ></a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagList;
