// import necessary modules
const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { Text } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");

// create an instance of Keystone app
const keystone = new Keystone({
  name: "Paradox Inversion",
  adapter: new MongooseAdapter()
});

keystone.createList("Todo", {
  fields: {
    name: { type: Text }
  }
});

module.exports = {
  keystone,
  apps: [new GraphQLApp()]
};
