## Creating an App Menu

Let's make the app a little more interesting and dig into some of the api's features with an app menu.

Create a script block inside the `index.html` file and include the gui library:

``` html
    <script type="text/javascript">
        var gui = require('nw.gui');

    </script>
```

Create a new empty menu:

``` js
    var menu = new gui.Menu({ type: 'menubar' });
```

Add some items with label

``` js
    menu.append(new gui.MenuItem({ label: 'Menu Item One' }));
    menu.append(new gui.MenuItem({ label: 'Menu Item Two' }));
    menu.append(new gui.MenuItem({ label: 'Menu Item Three' }));
```

Create a new Menubar to hold our menu:
``` js
var menubar = new gui.Menu({ type: 'menubar' });
```

Append the menu to the menubar list:
``` js
    menubar.append(new gui.MenuItem({ label: 'Submenu One', submenu: menu}));
```

Grab a reference to the current window:
``` js
    var win = gui.Window.get();
```

Assign our new menu to the window:
``` js
    win.menu = menu;
```

Ok let's see what we have so far: `npm start`

There's also separator menu items we can add:
``` js
    menu.append(new gui.MenuItem({ type: 'separator' }));
```

## Including Node Packages

For the most part, including a node package in your app is no different than any other node app:

``` js
var os = require('os')
document.write('Our computer is: ', os.platform())

```
