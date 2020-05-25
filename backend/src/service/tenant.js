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

    if (apartmentIds.length === 0)
      throw new Error(
        "Um morador não pode ser cadastrado no sistema caso não esteja vinculado a um apartamento."
      );

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
    apartmentIds.forEach(async (apartmentId) => {
      let apartment = await Apartment.findById(apartmentId);

      // Se o morador for o primeiro a ser cadastrado no apartamento, ele automaticamente vira representante
      // Caso contrário só cadastra ele no array de moradores do apartamento
      if (apartment.tenantIds.length === 0) {
        await Apartment.findByIdAndUpdate(apartmentId, {
          representativeTenantId: tenant.id,
          tenantIds: [tenant.id],
        });
      } else {
        // Caso não seja o primeiro morador a ser vinculado no apartamento, só insere o id dele no array existente e salva
        apartment.tenantIds.push(tenant.id);
        await Apartment.findByIdAndUpdate(apartmentId, {
          tenantIds: apartment.tenantIds,
        });
      }
    });

    return tenant;
  },
  deleteTenantByCpf: async (tenantCpf) => {
    const tenant = await Tenant.findOne({ cpf: tenantCpf });

    await module.exports.updateApTenantIdsAndRepresentative(tenant);

    return Tenant.findByIdAndDelete(tenant.id);
  },

  updateApTenantIdsAndRepresentative: async ({ id, apartmentIds }) => {
    // Verifica se o  morador é representante de algum ap, e se for, passa a representatividade

    apartmentIds.forEach(async (apartmentId) => {
      let apartment = await Apartment.findById(apartmentId);
      const newTenantIds = apartment.tenantIds.filter(
        (tenantId) => tenantId !== id
      );

      // Checa se é o representante, e se for substitui
      if (id === apartment.representativeTenantId) {
        const newRepresent = apartment.tenantIds.find(
          (tenantId) => tenantId !== id
        );
        await Apartment.findByIdAndUpdate(apartment.id, {
          representativeTenantId: newRepresent,
          tenantIds: newTenantIds,
        });
      } else {
        await Apartment.findByIdAndUpdate(apartment.id, {
          tenantIds: newTenantIds,
        });
      }
    });
  },

  tenantByApartment: async (apNumber, apBlock) => {
    // Busca o(s) morador(es) pelo numero e bloco de apartamento

    // Busca o apartamento
    const ap = await Apartment.findOne({ number: apNumber, block: apBlock });

    // Se não achar nenhum retorna null
    if (ap === null || ap === undefined) return null;
    if (ap.tenantIds.length === 0) return null;

    // Se achar algum, busca e retorna os moradores
    if (ap.tenantIds.length > 0) {
      const tenants = ap.tenantIds.map(async (tenantId) => {
        return await Tenant.findById(tenantId);
      });
      return tenants;
    }
  },

  updateTenant: async (
    id,
    name,
    email,
    dateOfBirth,
    phone,
    cpf,
    apartmentIds,
    previousApartmentIds
  ) => {
    apToUpdateRemoving = previousApartmentIds.filter(
      (apId) => !apartmentIds.includes(apId)
    );
    apToUpdateAdding = apartmentIds.filter(
      (apId) => !previousApartmentIds.includes(apId)
    );

    // Update aps removing tenantid
    await module.exports.updateApTenantIdsAndRepresentative({
      id,
      apartmentIds: apToUpdateRemoving,
    });

    // Update aps adding tenantid
    apToUpdateAdding.forEach(async (apId) => {
      let apartment = await Apartment.findById(apId);

      if (apartment.tenantIds.length === 0) {
        await Apartment.findByIdAndUpdate(apId, {
          representativeTenantId: id,
          tenantIds: [id],
        });
      } else {
        apartment.tenantIds.push(id);

        await Apartment.findByIdAndUpdate(apId, {
          tenantIds: apartment.tenantIds,
        });
      }
    });

    return await Tenant.findByIdAndUpdate(id, {
      name,
      email,
      dateOfBirth,
      phone,
      cpf,
      apartmentIds,
    });
  },
};
