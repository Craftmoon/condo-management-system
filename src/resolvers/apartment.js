const Apartment = require("../models/Apartment");

module.exports = {
  Query: {
    apartments: () => Apartment.find(),
    apartment: (_, { id }) => Apartment.findById(id),
  },

  Mutation: {
    createApartment: async (_, { number, block, tenantIds }, req) => {
      const apartment = new Apartment({
        number,
        block,
        tenantIds,
      });

      return await apartment.save();
    },
    deleteApartment: async (_, { id }, req) => {
      return await Apartment.findByIdAndRemove(id);
    },
    updateApartment: async (_, { id, number, block, tenantIds }, req) => {
      return await Apartment.findByIdAndUpdate(id, {
        number,
        block,
        tenantIds,
      });
    },
  },
};
