const keystone = require("keystone");
var Types = keystone.Field.Types;
// Create a list of Categorys
const Category = new keystone.List("Category");

// Add fields to the Category model
// Each needs a type property
Category.add({
  name: { type: String },
  description: { type: Types.Text }
});

Category.defaultColumns = "name, description";

// Register the model so Keystone knows to use it
Category.register();
