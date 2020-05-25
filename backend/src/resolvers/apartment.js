const Apartment = require("../models/Apartment"),
  ApartmentService = require("../service/apartment");

module.exports = {
  Query: {
    apartments: () => Apartment.find(),
    apartment: (_, { id }) => Apartment.findById(id),
    apartmentByNumberBlock: (_, { number, block }) =>
      Apartment.findOne({ number, block }),
  },

  Mutation: {
    createApartment: (
      _,
      { number, block, tenantIds, representativeTenantId }
    ) => {
      return ApartmentService.registerApartment(
        number,
        block,
        tenantIds,
        representativeTenantId
      );
    },
    deleteApartmentByNumberBlock: (_, { number, block }, req) => {
      return ApartmentService.deleteApartmentByNumberBlock(number, block);
    },
    updateApartment: (
      _,
      { id, number, block, tenantIds, representativeTenantId }
    ) => {
      return ApartmentService.updateApartment(
        id,
        number,
        block,
        tenantIds,
        representativeTenantId
      );
    },
  },
};
