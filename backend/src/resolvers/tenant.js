const Tenant = require("../models/Tenant"),
  tenantService = require("../service/tenant");

module.exports = {
  Query: {
    tenants: () => Tenant.find(),
    tenant: (_, { id }) => Tenant.findById(id),

    tenantByApartment: (_, { apartmentNumber, apartmentBlock }) => {
      const ap = Apartment.findOne({ number, block });
      if (ap === null || ap === undefined) return null;
      if (ap.tenantIds.length === 0) return null;
      if (ap.tenantIds.length > 0) {
        let tenants = [];
        for (let i = 0; i < ap.tenantIds.length; i++) {
          tenants.push(Tenant.findById(ap.tenantIds[i]));
        }
        console.log("array tenants by apartment", tenants);
      }
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
      return await tenantService.tenantRegister(
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
    updateTenant: async (
      _,
      { id, name, email, dateOfBirth, phone, cpf, apartmentIds },
      req
    ) => {
      return await Tenant.findByIdAndUpdate(id, {
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentIds,
      });
    },
  },
};
