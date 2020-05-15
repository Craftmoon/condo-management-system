const Tenant = require("../models/Tenant");

module.exports = {
  Query: {
    tenants: () => Tenant.find(),
    tenant: (_, { id }) => Tenant.findById(id),

    tenantByApartment: (_, { apartmentNumber }) =>
      Tenant.find({ apartmentNumber: apartmentNumber }),

    tenantByAny: (_, { searchString }) =>
      Tenant.find({ $text: { $search: searchString } }),
  },

  Mutation: {
    createTenant: async (
      _,
      { name, email, dateOfBirth, phone, cpf, apartmentNumber, representative },
      req
    ) => {
      const tenant = new Tenant({
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentNumber,
        representative,
      });

      return await tenant.save();
    },
    deleteTenant: async (_, { id }, req) => {
      return await Tenant.findByIdAndRemove(id);
    },
    updateTenant: async (
      _,
      {
        id,
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentNumber,
        representative,
      },
      req
    ) => {
      return await Tenant.findByIdAndUpdate(id, {
        name,
        email,
        dateOfBirth,
        phone,
        cpf,
        apartmentNumber,
        representative,
      });
    },
  },
};
