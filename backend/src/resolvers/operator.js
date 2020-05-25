const Operator = require("../models/Operator"),
  OperatorService = require("../service/operator");

module.exports = {
  Query: {
    operators: () => Operator.find(),
    operator: (_, { id }) => Operator.findById(id),
    login: (_, { username, password }) => {
      return OperatorService.login(username, password);
    },
  },

  Mutation: {
    createOperator: (_, { username, password }, req) => {
      return OperatorService.createOperator(username, password);
    },
  },
};
