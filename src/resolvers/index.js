const operatorResolver = require("./operator");
const tenantResolver = require("./tenant");

const rootResolver = {
  Query: { ...operatorResolver.Query, ...tenantResolver.Query },
  Mutation: { ...operatorResolver.Mutation, ...tenantResolver.Mutation },
};

module.exports = rootResolver;
