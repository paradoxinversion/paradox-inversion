var keystone = require("keystone");
var Types = keystone.Field.Types;

const Page = new keystone.List("Page", {
  autokey: { path: "slug", from: "title", unique: true },
  map: { name: "title" }
});

Page.add({
  title: { type: String, required: true },
  socialMediaBrief: { type: Types.Text },
  content: { type: Types.Html, wysiwyg: true, height: 150 },
  pageOrder: { type: Number },
  isIndex: { type: Boolean },
  pagePostSections: { type: Types.TextArray },
  pageType: { type: Types.Select, options: "General, Article, Story, Index" }
});

Page.defaultColumns = "title, pageOrder";

// Register the model so Keystone knows to use it
Page.register();
