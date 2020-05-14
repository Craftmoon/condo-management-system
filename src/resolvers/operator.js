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
        throw new Error("Operator does not exist");
      }
      const isEqual = await bcrypt.compare(password, operator.password);

      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }

      const token = jwt.sign(
        { operatorId: operator.id, username: operator.username },
        "omaewamoushindeirunaniiii",
        {
          expiresIn: "1h",
        }
      );

      return { operatorId: operator.id, token: token, tokenExpiration: 1 };
    },
  },

  Mutation: {
    createOperator: async (_, { username, password }, req) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const operator = new Operator({
        username: username,
        password: hashedPassword,
      });

      return await operator.save();
    },
  },
};
