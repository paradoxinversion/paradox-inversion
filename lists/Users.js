const { Text, Password, Checkbox } = require("@keystonejs/fields");
module.exports = {
  access: {
    create: ({ authentication: { item } }) => !!item && item.isAdmin,
    update: ({ authentication: { item } }) => !!item && item.isAdmin,
    delete: ({ authentication: { item } }) => !!item && item.isAdmin
  },
  fields: {
    username: {
      type: Text,
      isRequired: true,
      access: {
        read: ({ authentication: { item } }) => !!item && item.isAdmin,
        update: ({ authentication: { item } }) =>
          !!item ? item.isAdmin || existingItem.id === item.id : false
      }
    },
    password: {
      type: Password,
      isRequired: true,
      access: {
        update: ({ existingItem, authentication: { item } }) =>
          !!item ? item.isAdmin || existingItem.id === item.id : false
      }
    },
    displayName: {
      type: Text,
      access: {
        update: ({ authentication: { item } }) =>
          !!item ? item.isAdmin || existingItem.id === item.id : false
      }
    },
    isAdmin: {
      access: {
        update: ({ authentication: { item } }) => !!item && item.isAdmin
      },
      type: Checkbox,
      defaultValue: false
    }
  },
  labelField: "displayName"
};
