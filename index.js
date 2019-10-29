// import necessary modules
const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { Text } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const TodosSchema = require("./lists/Todos.js");
const UsersSchema = require("./lists/Users");
keystone.createList("Todo", TodosSchema);
keystone.createList("User", UsersSchema);
const admin = new AdminUIApp({ authStrategy });
// create an instance of Keystone app
const keystone = new Keystone({
  name: "Paradox Inversion",
  adapter: new MongooseAdapter()
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identityField: "username",
    secretField: "password"
  }
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
