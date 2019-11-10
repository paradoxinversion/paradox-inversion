const { Text, Slug, Relationship } = require("@keystonejs/fields");

module.exports = {
  access: {
    create: ({ authentication: { item } }) => !!item && item.isAdmin,
    update: ({ authentication: { item } }) => !!item && item.isAdmin,
    delete: ({ authentication: { item } }) => !!item && item.isAdmin
  },
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
