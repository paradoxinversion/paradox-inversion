# Paradox Inversion

The API is driven by Keystonejs (for CMS functionality) and Nextjs (for React/SSR implementation).

This repo is largely for (Jedai's) personal use. It may or may not be well documented and will likely be messy.

## Environment

Some PI configuration is handled via envrionment variables. The project uses dotenv, so a .env file should be present on executing machines with the following:

```env
API_URL=http(s)://...
GOOGLE_ANALYTICS_TRACKING_ID=UA-...
```

## Developing

Ensure `mongod` is running beginning. To start developing, execute `yarn run dev`. This will create a Nextjs server with hot reloading.

## Building and Running for Production

On the production machine, ensure that mongo is running and execute `yarn run build && yarn start`.

## Scripts

**start**: Run the bundled server in production mode. Environment variables are set, designating production status and pointing the api url to localhost.

**dev**: Starts the Nextjs server and Keystone. Remember to have mongo running or it will fail.

**build**: Runs build-server and build-client

## Server

Log into Linode vps

The server uses Screen to keep the instance alive (while making browsing the vps possible)

Use ctrl-a to reattach to the screen session

to disconnect from screen use

## Deployment (Manual)

SSH to remote machine, enter pass

Navigate to remote paradox-inversion folder

git pull the latest version of the `deploy` branch

build the project with `yarn run build`.

## API Routes

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

### Pages

Pages are the basic grouping mechanism of content. Pages have the following fields

#### Name

The name of the page. This is also slugified

#### Page Order

The order (from left to right) in which the page should appear in the header, ascending.

#### Is Index (may be deprecated)

Indicates the page is THE index page of the site. Likely deprecated

#### Page Post Sections

A two-word string indicating what posts the page should pull. The first word is the type of of post to search for (page|category|series|tag(ged?)). The second word is the query. For values that are referenced from lists (such as category) the query must match a valid existing option.

#### Page Type

The type of page it is

### Posts

Posts are any content added to the site. Their sent from the server as HTML strings which are rendered via react.
