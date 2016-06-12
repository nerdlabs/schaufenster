# schaufenster
stay tuned




Ziele
* Komponenten in Isolation anzeigen
* Ordnerstrutkur wird für hierarchische Navigation / IDs verwendet
* Komponenten sind self-contained
* Komponenten können mit jedem Build-Tool verwendet werden
* Informationen zum Pattern:
  * Rendering der Komponte mit Styling, Assets, Behaviour
  * Name                                                    (1)
  * Pfad (zur main file)                                    (1)
  * Props (falls vorhanden, react-docgen)                   (1)
  * Readme (gerendertes md)                                 (1)
  * Dependency Tree (depending, dependents)                 (1)
* Nice to have: Linter für Abhängigkeiten                   (1)

Umsetzung
* patterns sind: ordner mit package.json
* entry file folgt den node konventionen
* import ist unverändert im vgl. zu node
* Readme: wenn im pattern folder readme.md, anzeigen/rendern

# Architektur
----------  
| 1 core | ---- fs comprehension, js parsing, markdown parsing (jsx demo)  
----------  
     |  
---------------  
| ui-renderer |  ---- rendering navigation, documentation, dependency tree, demos  
---------------  ---- erzeugt browser-kompatiblen output  
	- benutzt zentrale build-bundles vom fs (muss konfiguriert werden)  
	- schreibt zentrale entry-file auf fs (hängt exports in global)  
	- user provided html-grundgerüst  
	- user konfiguriert publicRoot (fs-path)  
	- user konfiguriert bundlePaths, werden eingebunden  
	- patterns werden über eindeutige id referenziert  


# Application life cycle
- configuration lesen
- patterns finden
- patterns parsen

#Roadmap / ToDos
* [x] Use substack/node-resolve in `read-patterns` to find entry-files
* ~~[x] Build up initial [pattern tree](tree.md)~~ abandoned in favor of a flat array of components
* ~~[ ] Implement functions to read patterns from tree~~
* [x] Build basic UI to display navigation, name, path and readme
* [X] Generate "entry-file" which exports/exposes all patterns
* [x] Extend the UI to be able to render pattern demos *spiked in nerdlabs/schaufenster-ui#poc-rendering*
* [ ] Code massage / clean up rename variables, make tests more robust, etc 
* [ ] Improve create-entryfile.js (allow for es6 module syntax, commonjs, globals, etc)
* [ ] Use react-markdown to extract JSX code blocks from readme file (used to render demo of pattern)
* [ ] Use react-docgen to create propTypes documentation
* [ ] Revisit pattern format (in anticipation of the changes in find-patterns we want to have a more general
format to describe patterns)
* [ ] Re-implement find-patterns to parse source files and search for react components in the AST (to find patterns more reliably)
* [ ] Parse JS files to find relative dependencies to other patterns and add this information to patterns
* [ ] Add chokidar to watch all pattern folders and update patterns when files are added/removed
* [ ] Parse CSS files to find relative dependencies to other patterns
* [ ] Investigate analyzing JSX `className` attributes to find CSS dependencies (if no CSS modules are being used)

# Inspiration / similar projects
* [React Toolbox](http://react-toolbox.com/#/components/button)
* [React Style Guide](http://react-styleguidist.js.org/#Button)
* [React Atelier](http://scup.github.io/atellier/material-ui-atellier/)
* [React Storybook](https://github.com/kadirahq/react-storybook)
* [Patternplate](https://github.com/sinnerschrader/patternplate)
* [Pattern Lab](http://demo.patternlab.io/)




* collect-files => globs for **/*.js files
  * read-fle => read a file and parse it to an AST
    * collect-dependencies => find all import statements
    * extract-components => find all exports and run the following scripts:
      * is-component => checks whether an ast node is a react component
      * parse-comments => to find docblock comments (@schaufenster use|ignore, @example, @description)
      * find-displayname => function/class/variable/export name, file name or last part of path
      * find-proptypes => uses react-docgen to extract information about propTypes
    * find-usages => cross-reference all components and their dependencies to find usages


Some examples for how the docblock integration could work:
https://astexplorer.net/#/WmLmTJTRGq

What do we do with a README.md file? Should we display it?
Could it contain example code? How to find out if it belongs to a single component
or to all components in its folder.


**data format (file-based)**
```json
{
  "path": "./components/atoms/button",
  "fileName": "index.js",
  "fullPath": "./components/atoms/button/index.js",
  "content": "import * as React from 'react';\nexport default () => (<button></button>);",
  "ast": {...},
  "fileImports": [{
    "source": "react",
    "names": [{ "*": "React" }]
  }],
  "components": [{
    "displayName": "Button",
    "export": {
      "name": "default",
      "type": "default"
    },
    "examples": [
      "<Button />"
    ],
    "propTypes": {}
  }]
}
```

**or possibly component based**
```json
{
  "displayName": "Button",
  "fileName": "index.js",
  "fullPath": "./components/atoms/button/index.js",
  "content": "import * as React from 'react';\nexport default () => (<button></button>);",
  "ast": {...},
  "fileImports": [{
    "source": "react",
    "names": [{ "*": "React" }]
  }, {
    "source": "../label/index.js",
    "names": [{ "Label": "Label" }]
  }, {
    "source": "../../../redux/myaction.js",
    "names": [{ "doMyAction": "doMyAction" }]
  }, {
    "source": "./styles.css",
    "names": [{ "styles": "styles" }]
  }],
  "export": {
    "name": "default",
    "type": "default"
  },
  "dependencies": [
    $ref({...}),
  ],
  "dependents": [
    $ref({...}),
  ],
  "propTypes": {},
  "examples": [
    "<Button />"
  ],
}
```
