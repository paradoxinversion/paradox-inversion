const { Text, Slug, Relationship, Select } = require("@keystonejs/fields");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");

module.exports = {
  access: {
    create: ({ authentication: { item } }) => !!item && item.isAdmin,
    read: ({ authentication: { item } }) => {
      if (item) {
        return {};
      }
      return {
        state: "published"
      };
    },
    update: ({ authentication: { item } }) => !!item && item.isAdmin,
    delete: ({ authentication: { item } }) => !!item && item.isAdmin
  },
  adminConfig: {
    defaultSort: "title"
  },
  fields: {
    url: { type: Slug, from: "title" },
    title: { type: Text, isRequired: true },
    synopsis: { type: Wysiwyg },
    seriesPosts: {
      type: Relationship,
      ref: "Post",
      many: true
    },
    state: {
      type: Select,
      options: "draft, published, archived",
      defaultValue: "draft"
    }
  },
  labelField: "title"
};
