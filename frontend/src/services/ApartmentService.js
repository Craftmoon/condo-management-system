import fetchBody from "../utils/fetchUtils";

class ApartmentService {
  findApartmentByNumberBlock = ({ apNumber, apBlock }) => {
    const requestBody = {
      query: `
        query{
          apartmentByNumberBlock(number:"${apNumber}",block:"${apBlock}"){
          id
          number
          block
          tenantIds
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

  findApartmentById = ({ apId }) => {
    const requestBody = {
      query: `
        query{
          apartment(id:"${apId}"){
          id
          number
          block
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

  fetchAllApartments = () => {
    const requestBody = {
      query: `
          query{
            apartments{
              id
              number
              block
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

  createApartment = ({ apNumber, apBlock }) => {
    const requestBody = {
      query: `
          mutation{
            createApartment(number:"${apNumber}",block:"${apBlock}"){
              id
              number
              block
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

  deleteApartmentByNumberBlock = ({ apNumber, apBlock }) => {
    const requestBody = {
      query: `
          mutation{
            deleteApartmentByNumberBlock(number:"${apNumber}",block:"${apBlock}"){
              number
              block
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

  updateApartment = ({
    apId,
    apNumber,
    apBlock,
    tenantIds,
    representativeTenantId,
  }) => {
    const requestBody = {
      query: `
          mutation{
            updateApartment(id:"${apId}",number:"${apNumber}",block:"${apBlock}", tenantIds:[${tenantIds}], representativeTenantId:"${representativeTenantId}"){
              id
              number
              block
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

const instance = new ApartmentService();

export { instance as ApartmentService };
