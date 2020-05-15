const Apartment = require("../models/Apartment");

module.exports = {
  Query: {
    apartments: () => Apartment.find(),
    apartment: (_, { id }) => Apartment.findById(id),
  },

  Mutation: {
    createApartment: async (_, { block, tenantId }, req) => {
      const apartment = new Apartment({
        block,
        tenantId,
      });

      return await apartment.save();
    },
    deleteApartment: async (_, { id }, req) => {
      return await Apartment.findByIdAndRemove(id);
    },
    updateApartment: async (_, { id, block, tenantId }, req) => {
      return await Apartment.findByIdAndUpdate(id, {
        block,
        tenantId,
      });
    },
  },
};
