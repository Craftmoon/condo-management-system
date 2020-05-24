const Tenant = require("../models/Tenant");
const TenantService = require("../service/tenant");
const Apartment = require("../models/Apartment");

module.exports = {
  Query: {
    tenants: () => Tenant.find(),
    tenant: (_, { id }) => Tenant.findById(id),

    tenantByApartment: (_, { apNumber, apBlock }) => {
      return TenantService.tenantByApartment(apNumber, apBlock);
    },
    tenantByCpf: async (_, { tenantCpf }, req) => {
      return await Tenant.findOne({ cpf: tenantCpf });
    },

    tenantByAny: (_, { searchString }) =>
      Tenant.find({ $text: { $search: searchString } }),
  },

  Mutation: {
    createTenant: async (
      _,
      { name, email, dateOfBirth, phone, cpf, apartmentIds },
      req
    ) => {
      return await TenantService.tenantRegister(
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentIds
      );
    },
    deleteTenant: async (_, { id }, req) => {
      return await Tenant.findByIdAndRemove(id);
    },
    deleteTenantByCpf: async (_, { tenantCpf }, req) => {
      return await Tenant.findOneAndDelete({ cpf: tenantCpf });
    },
    updateTenant: (
      _,
      { id, name, email, dateOfBirth, phone, cpf, apartmentIds },
      req
    ) => {
      return TenantService.updateTenant(
        id,
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentIds
      );
    },
  },
};
