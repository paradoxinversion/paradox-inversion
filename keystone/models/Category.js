const keystone = require("keystone");
var Types = keystone.Field.Types;
const Category = new keystone.List("Category", {
  autokey: { path: "slug", from: "name", unique: true }
});

Category.add({
  name: { type: String },
  description: { type: Types.Text }
});

Category.defaultColumns = "name, description";

Category.register();
