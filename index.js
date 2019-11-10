// import necessary modules
const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { NextApp } = require("@keystonejs/app-next");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const TodosSchema = require("./lists/Todos.js");
const UsersSchema = require("./lists/Users");
const CategoriesSchema = require("./lists/Categories");
const SeriesSchema = require("./lists/Series");
const PostsShema = require("./lists/Posts");
const TagsSchema = require("./lists/Tags");
const PagesSchema = require("./lists/Pages");
// create an instance of Keystone app
const keystone = new Keystone({
  name: "Paradox Inversion",
  adapter: new MongooseAdapter()
});

keystone.createList("User", UsersSchema);
keystone.createList("Todo", TodosSchema);
keystone.createList("Category", CategoriesSchema);
keystone.createList("Serial", SeriesSchema);
keystone.createList("Tag", TagsSchema);
keystone.createList("Post", PostsShema);
keystone.createList("Page", PagesSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identityField: "username",
    secretField: "password"
  }
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ authStrategy }),
    new NextApp({ dir: "./" })
  ]
};
