const { Text, Checkbox, CalendarDay } = require("@keystonejs/fields");

module.exports = {
  fields: {
    description: {
      type: Text,
      isRequired: true
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false
    },
    deadline: {
      type: CalendarDay,
      format: "Do MMMM YYYY",
      yearRangeFrom: "2019",
      yearRangeTo: "2029",
      isRequired: false,
      defaultValue: Date.now()
    },
    assignee: {
      type: "Text",
      isRequired: true
    }
  }
};
