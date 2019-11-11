const {
  Relationship,
  Integer,
  Select,
  Text,
  Slug
} = require("@keystonejs/fields");

const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");
const { DateTimeUtc } = require("@keystonejs/fields-datetime-utc");
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
    defaultColumns: "title,author",
    defaultSort: "title"
  },
  fields: {
    url: { type: Slug, from: "title" },
    title: { type: Text, isRequired: true },
    category: { type: Relationship, ref: "Category" },
    series: { type: Relationship, ref: "Serial.seriesPosts" },
    seriesOrder: { type: Integer },
    tags: { type: Relationship, ref: "Tag.posts", many: true },
    author: { type: Relationship, ref: "User", isRequired: true },
    page: { type: Relationship, ref: "Page" },
    publishDate: {
      type: DateTimeUtc
    },
    brief: {
      type: Wysiwyg
    },
    mainContent: {
      type: Wysiwyg
    },
    socialMediaBrief: {
      type: Text
    },
    state: {
      type: Select,
      options: "draft, published, archived",
      defaultValue: "draft"
    }
  },
  labelField: "title"
};

// TODO: There should be processing of publish date on save
