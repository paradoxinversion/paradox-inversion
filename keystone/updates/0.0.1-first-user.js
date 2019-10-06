exports.create = {
  User: [
    {
      displayName: "Test",
      email: "test@test.test",
      password: "test"
    }
  ],
  Page: [
    {
      title: "Home",
      content: "<p>Welcome to Paradox Inversion!</p>",
      isIndex: true
    },
    {
      title: "About Jedai",
      content: `
      <p>
        Paradox Inversion is the digital entity created by Jedai Saboteur.
      </p>`
    }
  ],
  Category: [
    {
      name: "Announcements",
      description: "General announcements"
    }
  ]
};
