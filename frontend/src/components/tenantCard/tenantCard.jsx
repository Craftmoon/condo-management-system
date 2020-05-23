import React from "react";

const TenantCard = ({ tenant }) => {
  return (
    <div className="card tenant-card box ">
      <div className="card-icon">
        <div className="icon is-large">
          <span className="fa-stack fa-2x">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="card-content is-paddingless">
        <div>Name: {tenant.name}</div>
        <div>E-mail {tenant.email}</div>
        <div>Data de nascimento: {tenant.dateOfBirth}</div>
        <div>Número de telefone: {tenant.phone}</div>
        <div>CPF: {tenant.cpf}</div>
        <div>Vinculado aos apartamentos:</div>
        <div>{tenant.apartmentIds}</div>
        <div>Representante dos apartamentos: </div>
        <div>{tenant.block}</div>
      </div>
    </div>
  );
};

export default TenantCard;
