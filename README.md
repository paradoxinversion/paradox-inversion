# Paradox Inversion

The API is driven by Keystonejs (for CMS functionality) and Nextjs (for React/SSR implementation).

This repo is largely for (Jedai's) personal use, but has reached a stage at which it might be useful for anyone trying to make a similar blog without having to do too much tweaking.

## Environment

Some PI configuration is handled via envrionment variables. The project uses dotenv, so a .env file should be present on machines running the software. Copy or create a new `.env.` file with the values from `.env.example`, replacing values with your own as necessary.

## Developing

Ensure MongoDB is running and Port 3000 is is not in use. To start developing, execute `yarn start:dev`. This will instantiate Keystone, connect to the database, and prepare GraphQL.

Restarting the server will be necessary when making any changes to Keystone (such has changing Keystone Lists). Changes to Keystone lists may break existing items unless changed values are properly handled (ie, migrated). See Keystone5 documentation for more details.

## Building and Running for Production

To build the site, run `yarn run build`. A `dist` directory will be created in the project root if there are no errors.

Run the project with `yarn start`.

### Remote Server Run

Ensure the machine has `forever.js` installed globally and that it is available to the user running the instance. Ensure that mongo is running and execute `forever start -c "yarn start" ./dist`.

## Scripts

**start**: Run the built Keystone isntance in production mode.

**start:dev**: Run the development server.

**build**: Build the project for production.

## Deployment (Manual)

SSH to remote machine, enter credentials

Navigate to remote paradox-inversion deployment folder.

`git pull` the latest version of the `deploy` branch. Ensure dependencies are up to date.

Build the project with `yarn run build`.

## Site Routes

`/`

Main page

`/:page`

A ‘top level’ page (ie, fiction, tech, etc)

`/series/:storyName`

The landing page for a series, containing all ordered parts

`/posts/:searchtype/:query`

Gets all posts matching a search type and query—
Search Types: [page, category, series, tag(ged?) ]

`/post/:year/:month/:day/:slug`

Returns a single post

## Keystone

(This section is under heavy construction)

### Access Control

For most lists, only a logged-in user can create, update, or delete entries. This setup also there is one user (me :)), who is also the administrator. You may want to tweak that if you intend to use this as a basis for a site with multiple account-holding users.

### Common Fields

#### Url

A sluggified version of the title or name of the item. Should be unique at certain levels, but doesn't matter as much for others. For instance, it matters for pages because the URLS would clash. For posts, the date posted matters more, as posts with different dates but matching names have different (complete) urls.

#### Title

Just a name. Might migrate instances of lists using `name` to this for consistency.

#### Social Media Brief

Text content that will be added to opengraph/twitter cards/etc on social media.

#### State

The 'post state' of the item-- Draft (working on it, not visible to public), Published (done, visible to public).

### Categories

#### Access

Logged In: C, U, D

All: R

#### Fields

- url
- name
- description

### Pages

Pages are the basic grouping mechanism of content. Pages have the following fields

- url
- title
- socialMediaBrief
- pageOrder
- content
- postSections
- state
- shownInNav

#### Name

The name of the page. This is also slugified

#### Page Order

The order (from left to right) in which the page should appear in the header, ascending.

#### Page Post Sections

A two-word string indicating what posts the page should pull. The first word is the type of of post to search for (page|category|series|tag(ged?)). The second word is the query. For values that are referenced from lists (such as category) the query must match a valid existing option.

#### Page Type

The type of page it is

### Posts

Posts are any content added to the site. Their sent from the server as HTML strings which are rendered via react.
