const keystone = require("keystone");
var Types = keystone.Field.Types;

const Series = new keystone.List("Series", {
  autokey: { path: "slug", from: "title", unique: true },
  map: { name: "title" }
});

// Add fields to the Series model
// Each needs a type property
Series.add({
  title: { type: String, required: true },
  synopsis: { type: Types.Html, wysiwyg: true, height: 150 }
});

Series.defaultColumns = "title";

// Register the model so Keystone knows to use it
Series.register();
