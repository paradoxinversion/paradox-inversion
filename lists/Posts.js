const {
  DateTime,
  Relationship,
  Integer,
  Select,
  Text,
  Slug
} = require("@keystonejs/fields");

const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");

module.exports = {
  adminConfig: {
    defaultColumns: "title,author",
    defaultSort: "title"
  },
  fields: {
    url: { type: Slug, from: "title" },
    title: { type: Text, isRequired: true },
    category: { type: Relationship, ref: "Category" },
    series: { type: Relationship, ref: "Serial" },
    seriesOrder: { type: Integer },
    tags: { type: Relationship, ref: "Tag.posts", many: true },
    author: { type: Relationship, ref: "User" },
    page: { type: Relationship, ref: "Page" },
    publishDate: {
      type: DateTime,
      format: "MM/DD/YYYY",
      yearPickerType: "auto"
    },
    brief: {
      type: Wysiwyg
    },
    mainContent: {
      type: Wysiwyg
    },
    socialMediaBrief: {
      type: Wysiwyg
    },
    state: {
      type: Select,
      options: "draft, published, archived",
      default: "draft"
    }
  },
  labelField: "title"
};

// TODO: There should be processing of publish date on save
