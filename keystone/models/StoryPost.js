var keystone = require("keystone");
var Types = keystone.Field.Types;

var StoryPost = new keystone.List("StoryPost", {
  autokey: { path: "slug", from: "title", unique: true },
  map: { name: "title" },
  sortable: true
});

StoryPost.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select,
    options: "draft, published, archived",
    default: "draft"
  },
  story: { type: Types.Relationship, ref: "Story" },
  tags: { type: Types.TextArray },
  author: { type: Types.Relationship, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  publishedAt: Date,
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  partNumber: { type: Number }
});
StoryPost.schema.pre("save", async function(next) {
  this.tags = this.tags.map(category => {
    return category
      .toLowerCase()
      .split(" ")
      .join("-");
  });

  if (this.state === "published" && !this.publishedAt) {
    this.publishedAt = Date.now();
  }

  next();
});
StoryPost.defaultColumns = "title, state|20%, author, publishedAt|15%, story";
StoryPost.register();
