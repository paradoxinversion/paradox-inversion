var keystone = require("keystone");
var Types = keystone.Field.Types;

var Post = new keystone.List("Post", {
  autokey: { path: "slug", from: "title", unique: true },
  map: { name: "title" },
  defaultSort: "-createdAt"
});

Post.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select,
    options: "draft, published, archived",
    default: "draft"
  },
  category: { type: Types.Relationship, ref: "Category" },
  tags: { type: Types.TextArray },
  author: { type: Types.Relationship, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  publishedAt: Date,
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  page: { type: Types.Relationship, ref: "Page" }
});
Post.schema.pre("save", async function(next) {
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
Post.defaultColumns = "title, state|20%, author, publishedAt|15%, category";
Post.register();
