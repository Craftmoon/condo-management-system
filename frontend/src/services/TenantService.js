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
}

const instance = new TenantService();

export { instance as TenantService };
