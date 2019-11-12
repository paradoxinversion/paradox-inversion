const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { NextApp } = require("@keystonejs/app-next");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const UsersSchema = require("./lists/Users");
const CategoriesSchema = require("./lists/Categories");
const SeriesSchema = require("./lists/Series");
const PostsShema = require("./lists/Posts");
const TagsSchema = require("./lists/Tags");
const PagesSchema = require("./lists/Pages");

const keystone = new Keystone({
  name: "Paradox Inversion",
  adapter: new MongooseAdapter(),
  cookieSecret: process.env.COOKIE_SECRET,
  onConnect: async () => {
    const users = await keystone.lists.User.adapter.findAll();
    if (!users.length) {
      const initialData = require("./initialData");
      await keystone.createItems(initialData);
    }
  }
});

keystone.createList("User", UsersSchema);
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
