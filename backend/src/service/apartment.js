const Apartment = require("../models/Apartment"),
  Tenant = require("../models/Tenant");

module.exports = {
  registerApartment: async (
    number,
    block,
    tenantIds,
    representativeTenantId
  ) => {
    await module.exports.verifyIsApartmentNumberBlockRepeated(number, block);

    let apartment = new Apartment({
      number,
      block,
      tenantIds,
      representativeTenantId,
    });
    return await apartment.save();
  },

  updateApartment: async (
    id,
    number,
    block,
    tenantIds,
    representativeTenantId
  ) => {
    await module.exports.verifyIsApartmentNumberBlockRepeated(
      number,
      block,
      id
    );

    return Apartment.findByIdAndUpdate(id, {
      number,
      block,
      tenantIds,
      representativeTenantId,
    });
  },

  deleteApartmentByNumberBlock: async (number, block) => {
    const ap = await Apartment.findOne({ number, block });
    if (ap === null) throw new Error("Apartamento não encontrado.");
    await module.exports.verifyTenantExistenceEligibility(ap.id);
    return await Apartment.findByIdAndDelete(ap.id);
  },

  verifyIsApartmentNumberBlockRepeated: async (number, block, apartmentId) => {
    // Verifica se já existe apartamento com mesmo numero/bloco

    const sameNumberBlockAp = await Apartment.findOne({ number, block });

    // Se tiver cadastrando e achar apartamento com mesmo numero/block
    if (apartmentId == null && sameNumberBlockAp)
      throw new Error(
        "Um apartmento com o mesmo numero e do mesmo bloco já existe."
      );

    // Se tiver no update e o id do apartamento com mesmo numbero/bloco for diferente
    if (sameNumberBlockAp)
      if (sameNumberBlockAp.id !== apartmentId)
        throw new Error(
          "Um apartmento com o mesmo numero e do mesmo bloco já existe."
        );
  },

  verifyTenantExistenceEligibility: async (apartmentId, newTenantIds) => {
    //Verifica se o tenant ainda pode continuar cadastrado no sistema (se ele ainda mora em algum apartamento)

    const apartment = await Apartment.findById(apartmentId);

    // Passa pelo array de moradores do apartamento
    apartment.tenantIds.forEach(async (tenantId) => {
      // Pega o morador do apartamento
      let tenant = await Tenant.findById(tenantId);

      // Se for maior que um, da update no apartmentIds dele retirando o id do apartamento
      if (tenant.apartmentIds.length > 1) {
        // Cria um array de apartamentId sem o id do apartamento sendo deletado
        updatedApartmentIds = tenant.apartmentIds.filter(function (tenantApId) {
          return tenantApId !== apartmentId;
        });

        // Atualiza o campo de ids de apartamento do morador
        await Tenant.findByIdAndUpdate(tenant.id, {
          apartmentIds: updatedApartmentIds,
        });
        //return;
      } else {
        //Deleta o morador se ele só morar nesse apartamento (tenant.apartmentIds.length não for maior que um )
        await Tenant.findByIdAndDelete(tenant.id);
      }
    });

    await Apartment.findByIdAndDelete(apartmentId);
  },
};
