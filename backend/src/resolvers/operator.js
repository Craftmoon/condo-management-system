const Operator = require("../models/Operator"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    operators: () => Operator.find(),
    operator: (_, { id }) => Operator.findById(id),
    login: async (_, { username, password }) => {
      const operator = await Operator.findOne({ username });
      if (!operator) {
        throw new Error("Operador não cadastrado.");
      }
      const isEqual = await bcrypt.compare(password, operator.password);

      if (!isEqual) {
        throw new Error("Senha incorreta.");
      }

      const token = jwt.sign(
        { operatorId: operator.id, username: operator.username },
        "omaewamoushindeirunaniiii",
        {
          expiresIn: "6h",
        }
      );

      return { operatorId: operator.id, token: token, tokenExpiration: 6 };
    },
  },

  Mutation: {
    createOperator: async (_, { username, password }, req) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;

      const operator = new Operator({
        username,
        password,
      });

      return await operator.save();
    },
  },
};
