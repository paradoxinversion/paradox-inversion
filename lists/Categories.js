const { Text, Slug } = require("@keystonejs/fields");

module.exports = {
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
