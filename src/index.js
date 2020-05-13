const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const resolvers = require("./resolvers/operatorResolvers");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers,
});

server.start();
