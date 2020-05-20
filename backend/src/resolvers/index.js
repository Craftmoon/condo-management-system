const operatorResolver = require("./operator");
const tenantResolver = require("./tenant");
const apartmentResolver = require("./apartment");

const rootResolver = {
  Query: {
    ...operatorResolver.Query,
    ...tenantResolver.Query,
    ...apartmentResolver.Query,
  },
  Mutation: {
    ...operatorResolver.Mutation,
    ...tenantResolver.Mutation,
    ...apartmentResolver.Mutation,
  },
};

module.exports = rootResolver;
