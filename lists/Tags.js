const { Text, Slug, Relationship } = require("@keystonejs/fields");

module.exports = {
  adminConfig: {
    defaultSort: "tag"
  },
  fields: {
    url: {
      type: Slug,
      from: "tag"
    },
    tag: {
      type: Text,
      isRequired: true
    },
    posts: { type: Relationship, ref: "Post.tags", many: true }
  },
  labelField: "tag"
};
