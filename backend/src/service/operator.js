const Operator = require("../models/Operator"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

module.exports = {
  createOperator: async (username, password) => {
    // Verifica se já não existe um operador com mesmo usuário e senha no banco
    const operator = await Operator.findOne({ username: username });
    if (operator) {
      throw new Error("Operador já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    // Caso não tenha, instancia e cadastra
    let newOperator = new Operator({
      username,
      password,
    });

    return await newOperator.save();
  },
  login: async (username, password) => {
    // Procura um operador com o username (único) no sistema
    const operator = await Operator.findOne({ username });
    if (!operator) {
      throw new Error("Operador não cadastrado.");
    }

    //Compara as senhas
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
};
