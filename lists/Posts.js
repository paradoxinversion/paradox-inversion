const {
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

// TODO: There should be processing of tags and publish date on save
