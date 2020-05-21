import React from "react";

const Card = ({ apartment }) => {
  return (
    <div className="apartment-card box">
      <div className="card-icon">
        <div className="icon is-large">
          <span className="fa-stack fa-2x">
            <i className="fas fa-building"></i>
          </span>
        </div>
      </div>
      <div className="card-content is-paddingless">
        <div>Número {apartment.number}</div>
        <div>Bloco {apartment.block}</div>
      </div>
    </div>
  );
};

export default Card;
