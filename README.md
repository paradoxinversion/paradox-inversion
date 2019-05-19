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

## posts

Posts have types-- General, or Story
