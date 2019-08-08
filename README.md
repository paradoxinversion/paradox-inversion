# Paradox Inversion

The API is driven by Keystonejs.

This repo is largely for (Jedai's) personal use. It may or may not be well documented and will likely be messy.

## Building and Running

**start**: Run the bundled server in production mode. Environment variables are set, designating production status and pointing the api url to localhost.

**start-dev**: Watch the client and server

**build-client**: Bundles all client code to dist/client

**watch-client**: Starts a development server for the client at localhost:1234.

**build-server**: Bundles server code for server side rendering

**watch-server**: Runs server code without bundling

**build**: Runs build-server and build-client

## Developing

Ensure `mongod` is running and there is a built version of the server.

When working on the server, a new version will have to be built and tested when changes are made. Some of keystone's dependancies cause issues with Parcel. This may or may not be fixed in the future.

When working on the client, running `watch-client` shoud be fine.

## Server

Log into Linode vps

The server uses Screen to keep the instance alive (while making browsing the vps possible)

Use ctrl-a to reattach to the screen session

to disconnect from screen use

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
