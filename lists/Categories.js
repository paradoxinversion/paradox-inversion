const { Text, Slug } = require("@keystonejs/fields");

module.exports = {
  access: {
    create: ({ authentication: { item } }) => !!item,
    update: ({ authentication: { item } }) => !!item,
    delete: ({ authentication: { item } }) => !!item
  },
  adminConfig: {
    defaultColumns: "name,description",
    defaultSort: "name"
  },
  fields: {
    url: { type: Slug, from: "name" },
    name: { type: Text },
    description: { type: Text }
  },
  labelField: "name"
};
