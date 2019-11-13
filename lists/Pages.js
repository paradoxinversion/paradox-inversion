const { Integer, Select, Text, Slug, Checkbox } = require("@keystonejs/fields");

const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");
// TODO: Figure out how much slate I need to know to utilize this effectively
const { Content } = require("@keystonejs/field-content");

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
    defaultColumns: "title,pageOrder",
    defaultSort: "pageOrder"
  },
  fields: {
    url: { type: Slug, from: "title" },
    title: { type: Text, isRequired: true },
    socialMediaBrief: { type: Text },
    pageOrder: { type: Integer },
    content: {
      type: Wysiwyg
    },
    postSections: {
      type: Text
    },
    state: {
      type: Select,
      options: "draft, published, archived",
      defaultValue: "draft"
    },
    shownInNav: {
      type: Checkbox,
      defaultValue: false
    }
  },
  labelField: "title"
};
