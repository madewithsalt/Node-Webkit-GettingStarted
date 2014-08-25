# A Brief Intro to Creating Apps with Node-Webkit

This demo will cover how to get started developing native apps with node-webkit using a mac, that you can then package and deploy to Mac, Windows, or Linux. It will cover a few key features and some great tools you can use to quickly get started, and show off some of node-webkit's capabilities with ToDo MVC's Backbone example.

### Prerequisites:
- A basic understanding of NodeJS 
    * how require and module.exports function
    * basic familiarity with core modules such as `path` or `fs` will help
    * how to use and install node packages with `npm install`
- Node and NPM installed on your development machine and available in the command line
- Comfort using the command line to install packages and execute tasks

## Node Webkit App Anatomy
At the very minimum, a node-webkit app only needs 2 files:
- An index.html file at the root level
- And a package.json file at the root.

**The index.html file**  
This is the starting point for you app, and the file that will be displayed when the app is first launched.

**The package.json file.**  
This at minumum must contain the name of your app and the filename of the main file (in our case, index.html)

## Installing the Binary Files

In order to run and test your app, you will also need the node-webkit binaries. 

There's two ways you can get them:
- Download from the Github Repo
- Use the convenient `nodewebkit` node package

### Using the NPM's NodeWebkit (recommended)

The easiest way to get up and running with nodewebkit is to use the npm installer:  
` npm install nodewebkit`  

This can and should be done at the app-level in case you have or want to use different versions of nodewebkit in different apps

### Using the Binaries (Mac OSX)
- Download the files from here based on your OS: https://github.com/rogerwang/node-webkit#downloads
- Unzip the files 
- There should be 3 files in the zip:
    * credits.html
    * node-webkit.nw
    * nwsnapshot

What is not clearly explained is how to take these files make it available for use on the command line. The actual binary is located inside the Package Contents of `node-webkit.nw`:
- Right (or Ctrl) click `node-webkit.nw` and "Show Package Contents"
- Locate the `node-webkit` exec file inside `Contents > MacOS`
- Copy this file into your local user `bin` directory, or some other directory where you keep local executables, configured in your `.bash_profile`


## Our first ‘Hello World’ App

- Create a directory for our app
- Install nodewebkit locally for testing: npm install nodewebkit
- Create a basic html file with Hello World
- Create a package.json with the following:

``` 
{
    "name": "hello-world",
    "main": "./index.html",
    "scripts": {
        "start": "nodewebkit"
    }
} 
```

Test that everything is working ok by starting the app in the command line:

From inside the directory: `npm start`

## The Todo MVC demo, node-webkit style

To quickly demo how easy it is to create a node-webkit app from an existing webapp, I've taken the Backbone Architecture example from TodoMVC and converted it to a desktop app.

I've created a simple menu item using the node-webkit `gui` api, and bound it to the `app.todos.create` method:

``` js
    // link to the gui api
    var gui = require('nw.gui');

    // create an instance of the menu
    var menu = new gui.Menu();

    // add a menu item that triggers a new todo on click
    menu.append(new gui.MenuItem({
        label: 'New ToDo Item',
        click: function() {
            app.todos.create({
                title: 'New ToDo Item',
                order: app.todos.nextOrder(),
                completed: false
            });
        }
    }));

    // create a new menubar (required for window menus)
    var menubar = new gui.Menu({ type: 'menubar' });

    // add the new menu to the menubar
    menubar.append(new gui.MenuItem({ label: 'Submenu One', submenu: menu}));

    // grab a reference to the active window
    var win = gui.Window.get();

    // attach the menubar to the window. Done!
    win.menu = menubar;

```

### Persisting Data

Out of the box, node-webkit supports using LocalStorage (amoung others).

Since the ToDo MVC demo uses `Backbone.LocalStorage`, it's aready set up to save data between sessions - Node-Webkit seamlessly supports the same behavior without any additional configuration!

### Other forms of storing data

You can use Web SQL Database, embedded databases, Web Storage or Application Cache without headaches of any extra dependencies.

Of all these, the recommended choices are LocalStorage and IndexedDB. If you decide to use IndexedDB, you have the additional perk of extending to something like CouchDB (or PouchDB) if you want to store data online and sync across multiple devices! Super cool if you create an app that has a desktop and a mobile version (using Cordova perhaps?)


## Packaging the App for Distribution

The fastest and easiest way to get rolling with packaging is to use the node-webkit builder tools created for node. I like using the grunt utility for this to quickly and easily build the apps with pre-set configuations.

- Move all of your files (except the node_modules folder) to a subfolder called `app`
- Create a new package.json file and Gruntfile.js in the root
- Add a basic config to your gruntfile, like so:

``` js
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodewebkit: {
      options: {
          platforms: ['win','osx'],
          buildDir: './webkitbuilds', // Where the build version of my node-webkit app is saved
      },
      src: ['./app/**/*'] // Your node-webkit app
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default task.
  grunt.registerTask('default', ['nodewebkit']);

};
```

- Sidenote: You will have to re-install nodewebkit in the `app` directory to run the app for development.

Run `grunt`, and your app will automagically get compiled and built into mac and windows versions!

### Other Tutorials and Resources:
- [Creating Desktop Applications with Node-Webkit](http://strongloop.com/strongblog/creating-desktop-applications-with-node-webkit/)
- [Getting Started with Node-Webkit](https://github.com/rogerwang/node-webkit/wiki/Getting-Started-with-node-webkit)
- [Persisting Data in Node-Webkit](https://github.com/rogerwang/node-webkit/wiki/Save-persistent-data-in-app)
    * [IndexedDB Api](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
    * [About PouchDB](http://pouchdb.com/)
- [How to Package and Distribute Your Apps](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps)
    * [Grunt Node-Webkit Builder](https://github.com/mllrsohn/grunt-node-webkit-builder)

