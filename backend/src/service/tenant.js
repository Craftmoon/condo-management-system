const Tenant = require("../models/Tenant"),
  Apartment = require("../models/Apartment");

module.exports = {
  tenantRegister: async (
    name,
    email,
    dateOfBirth,
    phone,
    cpf,
    apartmentIds
  ) => {
    // Cadastra o morador e vincula ele com o(s) apartamento(s)

    // Cadastra morador no banco
    let tenant = new Tenant({
      name,
      email,
      dateOfBirth,
      phone,
      cpf,
      apartmentIds,
    });
    await tenant.save();

    // Busca ele pelo cpf pra ter acesso ao id
    tenant = await Tenant.findOne({ cpf: cpf });

    // Loop no array de apartamentos do morador
    for (let i = 0; i < apartmentIds.length; i++) {
      let apartment = await Apartment.findById(apartmentIds[i]);

      // Se o morador for o primeiro a ser cadastrado no apartamento, ele automaticamente vira representante
      // Caso contrário só cadastra ele no array de moradores do apartamento
      if (apartment.tenantIds[i] == null) {
        await Apartment.findByIdAndUpdate(apartmentIds[i], {
          representativeTenantId: tenant.id,
          tenantIds: [tenant.id],
        });
      } else {
        // Caso não seja o primeiro morador a ser vinculado no apartamento, só insere o id dele no array existente e salva
        apartment.tenantIds.push(tenant.id);
        await Apartment.findByIdAndUpdate(apartmentIds[i], {
          tenantIds: apartment.tenantIds,
        });
      }
    }

    return tenant;
  },
};
