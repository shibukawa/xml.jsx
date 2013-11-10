xml.jsx
===========================================

[![Build Status](https://travis-ci.org/shibukawa/xml.jsx.png)](https://travis-ci.org/shibukawa/xml.jsx)

Synopsis
---------------

XML DOM/SAX implementation in JSX. Current version supports only limited API's.
It doesn't include namespace support.

Code Example
--------------

### DOM

```js
import "dom.jsx";
import "console.jsx";

class _Main
{
    static function main (argv : string[])
    {
        var dom = DOMParser.parseFromString('<Hello>World</Hello>');
        var root = dom.documentElement();
        console.log(root.tagName()); // -> 'Hello'
        console.log(root.firstChild().data()); // -> 'World'

        console.log(XMLSerializer.serializeToString(dom));
        // -> '<Hello>World</Hello>'
    }
}
```

### SAX

```js
import "sax.jsx";
import "console.jsx";

class Hanlder extends SAXHandler
{
    override function onopentag (tagname : string, attributes : Map.<string>) : void
    {
        console.log(tagname);
    }
}

class _Main
{
    static function main (argv : string[])
    {
        var handler = new Handler();
        var parser = SAXParser(handler);
        parser.parse('<Hello><World/></Hello>');
        // -> Hello
        // -> World
    }
}
```

Motivation
---------------

It provides the feature parsing XML/HTML fragments. SAX was implemented for search engine [Oktavia](http://oktavia.info/)'s HTML indexer. DOM was implemented for jsduck2jsx.

Installation
---------------

```sh
$ npm install xml.jsx
```

If you want to use this library from other JSX project, install like the following:

```sh
$ npm install xml.jsx --save-dev
```

or add like these lines to your parent project's `package.json`:

```js
   devDependencies: {
       "xml.jsx": "~0.2.0"
   },
   peerDepenencies: {
       "xml.jsx": "~0.2.0"
   }
```

And add `node_modules/xml.jsx/src` as a search path.
You should add to `peerDepenencies` if your product is library.

API Reference
------------------

See doc folder. Refer [W3C DOM spec](http://www.w3.org/TR/dom/) to know detail methods/attributes description.

This library modifies API like this:

* No attributes. All attributes become methods (e.g. `length` becomes `length()` method);
* No variable argument

Development
-------------

## Repository

* Repository: git://github.com/shibukawa/xml.jsx.git
* Issues: https://github.com/shibukawa/xml.jsx/issues

## Run Test

```sh
$ grunt test
```

## Build

```sh
# Generate API reference
$ grunt doc
```

Author
---------

* shibukawa / yoshiki@shibu.jp

License
------------

MIT

Complete license is written in `LICENSE.md`.
