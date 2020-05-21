const Apartment = require("../models/Apartment"),
  apartmentService = require("../service/apartment");

module.exports = {
  Query: {
    apartments: () => Apartment.find(),
    apartment: (_, { id }) => Apartment.findById(id),
    apartmentByNumberBlock: (_, { number, block }) =>
      Apartment.findOne({ number, block }),
  },

  Mutation: {
    createApartment: async (
      _,
      { number, block, tenantIds, representativeTenantId },
      req
    ) => {
      // Verifica regras de negócio
      await Promise.all([
        apartmentService.verifyIsApartmentNumberBlockRepeated(number, block),
        // apartmentService.verifyIsRepresentativePresent(
        //   tenantIds,
        //   representativeTenantId
        // ),
      ]);
      return await apartmentService.registerApartment(
        number,
        block,
        tenantIds,
        representativeTenantId
      );
    },
    deleteApartment: async (_, { id }, req) => {
      await apartmentService.verifyTenantExistenceEligibility(id);

      return await Apartment.findByIdAndDelete(id);
    },
    updateApartment: async (
      _,
      { id, number, block, tenantIds, representativeTenantId },
      req
    ) => {
      // Verifica regras de negócio
      await Promise.all([
        apartmentService.verifyIsApartmentNumberBlockRepeated(
          number,
          block,
          id
        ),
        // apartmentService.verifyIsRepresentativePresent(
        //   tenantIds,
        //   representativeTenantId
        // ),
      ]);
      console.log("passou nas regras de negócio");

      return await Apartment.findByIdAndUpdate(id, {
        number,
        block,
        tenantIds,
        representativeTenantId,
      });
    },
  },
};
