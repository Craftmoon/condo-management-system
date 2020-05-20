const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const resolvers = require("./resolvers/index");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/node", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Authenticate user
const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  const permit = ctx.request.get("Authorization");

  if (!permit) {
    throw new Error("Unauthorized.");
  }

  const token = permit.split(" ")[1];

  if (!token || token === "") {
    throw new Error("Unauthorized.");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "omaewamoushindeirunaniiii");
  } catch (err) {
    throw new Error(err);
  }

  if (!decodedToken) {
    throw new Error("Unauthorized.");
  }

  return resolve();
};

// Permissions object
const permissions = {
  Query: {
    apartments: isLoggedIn,
    apartment: isLoggedIn,
    tenants: isLoggedIn,
    tenant: isLoggedIn,
    tenantByApartment: isLoggedIn,
    tenantByAny: isLoggedIn,
    operators: isLoggedIn,
    operator: isLoggedIn,
  },
  Mutation: {
    createApartment: isLoggedIn,
    updateApartment: isLoggedIn,
    deleteApartment: isLoggedIn,
    createTenant: isLoggedIn,
    updateTenant: isLoggedIn,
    deleteTenant: isLoggedIn,
  },
};

// Creates server
const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers,
  context: (req) => ({ ...req }),
  middlewares: [permissions],
});

server.start();
