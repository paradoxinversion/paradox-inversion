const keystone = require("keystone");
var Types = keystone.Field.Types;

// Create a list of Users
const Page = new keystone.List("Page", {
  autokey: { path: "slug", from: "title", unique: true },
  map: { name: "title" }
});

// Add fields to the Page model
// Each needs a type property
Page.add({
  title: { type: String, required: true },
  content: { type: Types.Html, wysiwyg: true, height: 150 }
});

Page.defaultColumns = "title";

// Register the model so Keystone knows to use it
Page.register();
