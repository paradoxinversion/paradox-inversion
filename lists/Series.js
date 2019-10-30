const { Text, Slug } = require("@keystonejs/fields");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");

module.exports = {
  adminConfig: {
    defaultSort: "title"
  },
  fields: {
    url: { type: Slug, from: "title" },
    title: { type: Text, isRequired: true },
    synopsis: { type: Wysiwyg }
  },
  labelField: "title"
};
