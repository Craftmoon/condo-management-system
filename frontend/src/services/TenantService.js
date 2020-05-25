import fetchBody from "../utils/fetchUtils";

class TenantService {
  createTenant = ({
    tenantName,
    tenantEmail,
    tenantDateOfBirth,
    tenantPhone,
    tenantCpf,
    apartmentIds,
  }) => {
    const requestBody = {
      query: `
          mutation{
            createTenant(name:"${tenantName}",email:"${tenantEmail}",dateOfBirth:"${tenantDateOfBirth}",phone:"${tenantPhone}",cpf:"${tenantCpf}",apartmentIds:[${apartmentIds}]){
              id
              name
              email
              dateOfBirth
              phone
              cpf
              apartmentIds
            }
          }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log("error", err);
      });
  };

  tenantByApartment = ({ apNumber, apBlock }) => {
    const requestBody = {
      query: `
          query{
            tenantByApartment(apNumber:"${apNumber}",apBlock:"${apBlock}"){
                id
                name
                email
                dateOfBirth
                phone
                cpf
                apartmentIds
            }
          }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log("error", err);
      });
  };

  tenantByAny = ({ searchString }) => {
    const requestBody = {
      query: `
          query{
            tenantByAny(searchString:"${searchString}"){
                id
                name
                email
                dateOfBirth
                phone
                cpf
                apartmentIds
            }
          }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log("error", err);
      });
  };

  tenantByCpf = ({ tenantCpf }) => {
    const requestBody = {
      query: `
          query{
            tenantByCpf(tenantCpf:"${tenantCpf}"){
                id
                name
                email
                dateOfBirth
                phone
                cpf
                apartmentIds
            }
          }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log("error", err);
      });
  };

  deleteByCpf = ({ tenantCpf }) => {
    const requestBody = {
      query: `
          mutation{
            deleteTenantByCpf(tenantCpf:"${tenantCpf}"){
                id
                name
                apartmentIds
            }
          }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log("error", err);
      });
  };

  updateTenant = ({
    tenantId,
    tenantName,
    tenantEmail,
    tenantDateOfBirth,
    tenantPhone,
    tenantCpf,
    apartmentIds,
    previousApartmentIds,
  }) => {
    const requestBody = {
      query: `
          mutation{
            updateTenant(id:"${tenantId}",
            name:"${tenantName}",email:"${tenantEmail}",dateOfBirth:"${tenantDateOfBirth}",phone:"${tenantPhone}",cpf:"${tenantCpf}",
            apartmentIds:[${apartmentIds}],previousApartmentIds:[${previousApartmentIds}]){
                id
                name
                email
                dateOfBirth
                phone
                cpf
                apartmentIds
                
            }
          }
        `,
    };

    return fetch("http://localhost:4000", fetchBody(requestBody))
      .then((res) => res.json())
      .catch((err) => {
        console.log("error", err);
      });
  };
}

const instance = new TenantService();

export { instance as TenantService };
