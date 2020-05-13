const Operator = require("../models/Operator");

module.exports = {
  Query: {
    operators: () => Operator.find(),
    operator: (_, { id }) => Operator.findById(id),
  },

  Mutation: {
    createOperator: (_, { username, password }) =>
      Operator.create({ username, password }),
  },
};
