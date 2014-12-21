# Run in Browser

A simple script that will allow you to run code in a browser and then send back a payload of data.

RunInBrowser is a function that is a constructor essentially creating a number of differnt run is browser instances each with their own server. It takes one argument a options object that will be passed to either the server created for messaging between browser windows or passed to `browser-launcher`.

```javascript
var RunInBrowser = require( 'run-in-browser' ),
    browser = new RunInBrowser( { port: 9999, browser: 'chrome' } );
```

### RunInBrowser::require

RunInBrowser::require is a function that takes a string argument of a file to run in a browser. This is sort of like the relation ship between a web worker. That will open up a browser window ( even a headless browser ). Then it will browserify the code given and run it on the browser.

```
browser.require( './client' ); // opens browser
```

When another `browser.require` happens the first window will exit. ( This is temporary hopefully it will be able to manage multiple windows )

##RunInBrowser::on

Event emitter on method that listens for events from the browser.

## RunInBrowser::emit

Send an event to the browser.

## RunInBrowser::kill

Kill the browser that is open.

# In Browser

## Server

So once some code is ran in the browser there is an module that can be required communicate back to the server 

```javascript
var server = require( 'server' );
```

Server is a basic event emitter that is built to communicate between a browser and the server that opened the browser.

## Server::on

Bind to an event that will come from the server

## Server::emit

Send an event to the server, there are some limitations on payload, just about anything will work except funcitions and DOM stuff.
