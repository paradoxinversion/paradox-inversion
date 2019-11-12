module.exports = {
  User: [
    {
      username: process.env.INITIAL_USERNAME,
      displayName: process.env.INITIAL_DISPLAY_NAME,
      password: process.env.INITIAL_PASSWORD,
      isAdmin: true
    }
  ],
  Page: [
    {
      url: "home",
      title: "Home",
      content: "<p>Welcome to Paradox Inversion. Content is forthcoming.</p>",
      socialMediaBrief: "Online home of Jedai Saboteur",
      state: "published"
    }
  ]
};
