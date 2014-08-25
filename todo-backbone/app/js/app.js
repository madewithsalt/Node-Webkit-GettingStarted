/*global $ */
/*jshint unused:false */


var gui = require('nw.gui');

var menu = new gui.Menu();

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

var menubar = new gui.Menu({ type: 'menubar' });

menubar.append(new gui.MenuItem({ label: 'Submenu One', submenu: menu}));

var win = gui.Window.get();

win.menu = menubar;


var app = app || {};
var mainApp;
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	// kick things off by creating the `App`
	mainApp = new app.AppView();
});
