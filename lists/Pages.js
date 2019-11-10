const {
  Relationship,
  Integer,
  Select,
  Text,
  Slug,
  Checkbox
} = require("@keystonejs/fields");

const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");
const { Content } = require("@keystonejs/field-content");

module.exports = {
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
    isIndex: { type: Checkbox },
    state: {
      type: Select,
      options: "draft, published, archived",
      default: "draft"
    }
  },
  labelField: "title"
};
