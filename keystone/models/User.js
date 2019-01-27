const keystone = require("keystone");

// Create a list of Users
const User = new keystone.List("User", {
  autokey: { path: "slug", from: "displayName" },
  map: { name: "displayName" }
});

// Add fields to the User model
// Each needs a type property
User.add({
  displayName: { type: String },
  password: { type: keystone.Field.Types.Password },
  email: { type: keystone.Field.Types.Email, unique: true }
});

// canAccessKeystone signifies that the model is used for
// logging into the Admin UI.
User.schema.virtual("canAccessKeystone").get(function() {
  return true;
});

User.defaultColumns = "id, displayName, email";

// Register the model so Keystone knows to use it
User.register();
