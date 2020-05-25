const Tenant = require("../models/Tenant");
const TenantService = require("../service/tenant");
const Apartment = require("../models/Apartment");

module.exports = {
  Query: {
    tenants: () => Tenant.find(),
    tenant: (_, { id }) => Tenant.findById(id),
    tenantByCpf: (_, { tenantCpf }) => Tenant.findOne({ cpf: tenantCpf }),
    tenantByAny: (_, { searchString }) =>
      Tenant.find({ $text: { $search: searchString } }),
    tenantByApartment: (_, { apNumber, apBlock }) => {
      return TenantService.tenantByApartment(apNumber, apBlock);
    },
  },

  Mutation: {
    createTenant: (
      _,
      { name, email, dateOfBirth, phone, cpf, apartmentIds }
    ) => {
      return TenantService.tenantRegister(
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentIds
      );
    },
    deleteTenantByCpf: (_, { tenantCpf }) => {
      return TenantService.deleteTenantByCpf(tenantCpf);
    },
    updateTenant: (
      _,
      {
        id,
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentIds,
        previousApartmentIds,
      }
    ) => {
      return TenantService.updateTenant(
        id,
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentIds,
        previousApartmentIds
      );
    },
  },
};
