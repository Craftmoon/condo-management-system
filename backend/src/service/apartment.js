const Apartment = require("../models/Apartment"),
  Tenant = require("../models/Tenant");

module.exports = {
  verifyIsApartmentNumberBlockRepeated: async (number, block, apartmentId) => {
    // Verifica se já existe apartamento com mesmo numero/bloco

    const sameNumberBlockAp = await Apartment.findOne({ number, block });

    // se tiver cadastrando e achar apartamento com mesmo numero/block
    if (apartmentId == null && sameNumberBlockAp)
      throw new Error(
        "Um apartmento com o mesmo numero e do mesmo bloco já existe."
      );

    // se tiver no update e o id do apartamento com mesmo numbero/bloco for diferente
    if (sameNumberBlockAp)
      if (sameNumberBlockAp.id !== apartmentId)
        throw new Error(
          "Um apartmento com o mesmo numero e do mesmo bloco já existe."
        );
  },
  // verifyIsRepresentativePresent: async (tenantIds, representativeTenantId) => {
  //   // Verifica se tenants estão sendo cadastrados, e caso estejam, se pelo menos um deles é representante

  //   // Se nenhum tenant estiver sendo cadastrado e nenhum representante também, sem problemas
  //   if (tenantIds == null && representativeTenantId == null) return;

  //   // Caso um representante esteja sendo cadastrado sem um tenant estar sendo cadastrado, erro
  //   if (representativeTenantId != null && tenantIds == null)
  //     throw new Error(
  //       "O representante do apartamento deve ser morador do apartamento."
  //     );

  //   // Verifica se o morador único vinculado não é o representante
  //   if (tenantIds.length === 1 && tenantIds[0] !== representativeTenantId)
  //     throw new Error(
  //       "Apartamentos habitados devem possuir ao menos um representante morador do apartamento."
  //     );

  //   // Verifica se algum dos moradores cadastrados é o representante
  //   for (let i = 0; i < tenantIds.length; i++) {
  //     if (tenantIds[i] === representativeTenantId) return;
  //   }

  //   // Se nenhum dos cadastrados for representante, erro
  //   throw new Error(
  //     "Apartamentos habitados devem possuir ao menos um representante morador do apartamento."
  //   );
  // },
  verifyTenantPresence: async (apartmentId, tenantIds) => {
    // Verifica se algum dos moradores sendo vinculados já estão no apartamento
    const apartment = await Apartment.findById(apartmentId);

    for (let i = 0; i < tenantIds.length; i++) {
      for (let j = 0; j < Ap.tenantIds.length; j++) {
        if (tenantIds[i] === Ap.tenantIds[i])
          throw new Error("O morador já está vinculado ao apartamento");
      }
    }
  },
  registerApartment: async (
    number,
    block,
    tenantIds,
    representativeTenantId
  ) => {
    // Cadastra a apartamento e (opcional) e vincula ele com o(s) morador(es)

    // Cadastra apartamento no banco
    let apartment = new Apartment({
      number,
      block,
      tenantIds,
      representativeTenantId,
    });
    await apartment.save();

    // Busca ele pelo numero/bloco
    apartment = await Apartment.findOne({ number, block });

    // Caso moradores estiverem sendo cadastrados, loop no array de moradores do apartamento
    if (tenantIds != null)
      for (let i = 0; i < tenantIds.length; i++) {
        let tenant = await Tenant.findById(tenantIds[i]);

        // Insere id do apartamento no aparmentIds do morador
        tenant.apartmentIds.push(apartment.id);

        // Update no apartmentIds do morador com array atualizado
        await Tenant.findByIdAndUpdate(tenantIds[i], {
          apartmentIds: tenant.apartmentIds,
        });
      }

    return apartment;
  },
  verifyTenantExistenceEligibility: async (apartmentId, newTenantIds) => {
    // if (newTenantIds == null) return " significa que é delete";

    const apartment = await Apartment.findById(apartmentId);

    // Passa pelo array de moradores do apartamento
    for (let i = 0; i < apartment.tenantIds.length; i++) {
      console.log("i", i);
      // Pega o morador do apartamento
      let tenant = await Tenant.findById(apartment.tenantIds[i]);
      console.log("tenant", tenant);

      // Se for maior que um, da update no apartmentIds dele retirando o id do apartamento
      if (tenant.apartmentIds.length > 1) {
        // Cria um array de apartamentId sem o id do apartamento sendo deletado
        updatedApartmentIds = tenant.apartmentIds.filter(function (tenantApId) {
          return tenantApId !== apartmentId;
        });

        console.log("updatedApartmentIds", updatedApartmentIds);

        // Atualiza o campo de ids de apartamento do morador
        await Tenant.findByIdAndUpdate(tenant.id, {
          apartmentIds: updatedApartmentIds,
        });
        //return;
      } else {
        console.log("o tenant da vez só mora nesse apartamento (pulou o if)");
        //Deleta o morador se ele só morar nesse apartamento (tenant.apartmentIds.length não for maior que um )
        await Tenant.findByIdAndDelete(tenant.id);
      }
    }

    await Apartment.findByIdAndDelete(apartmentId);
    console.log("chegou no fim do verifyTenantExistenceEligibility");

    // . . . [complete] delete routine
    // procura apartamento no banco
    // pega o tenantIds
    // busca os tenants e joga num for
    // se apartamento for >1 -> da update no apartmentIds dele retirando o id do apartamento
    // se apartamentIds for 1, ou seja, ele só mora naquele apartamento -> deleta ele
    // deleta apartamento
    //
    // update routine
    // . procura apartamento no banco
    // pega tenantIds antes (do banco) e atual (que veio do update)
    // compara eles pra ver se tem alguem(s) saindo
    // caso esteja, busca os tenants e joga num for
    // se apartamentIds for 1, ou seja, ele só mora naquele apartamento -> deleta ele
    // se apartamento for >1 -> da update no tenantId dele e retira o id do apartamento
    // deleta apartamento
  },
};
