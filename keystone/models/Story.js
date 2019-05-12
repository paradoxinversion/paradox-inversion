const keystone = require("keystone");
var Types = keystone.Field.Types;

const Story = new keystone.List("Story", {
  autokey: { path: "slug", from: "title", unique: true },
  map: { name: "title" }
});

// Add fields to the Story model
// Each needs a type property
Story.add({
  title: { type: String, required: true },
  synopsis: { type: Types.Html, wysiwyg: true, height: 150 }
});

Story.defaultColumns = "title";

// Register the model so Keystone knows to use it
Story.register();
