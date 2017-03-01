# schaufenster
stay tuned

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


**or possibly component based**
```json
{
  "displayName": "Button",
  "fullPath": "./components/atoms/button/index.js",
  "content": "import * as React from 'react';\nexport default () => (<button></button>);",
  "summary": "A short summary of the purpose of this component.",
  "description": "A lengthy description explaining usage and other stuff...",
  "imports": [
    "react",
    "../label/index.js",
    "../../../redux/myaction.js",
    "./styles.css",
  ],
  "exports": {
    "format": "ES2015",
    "type": "default"
  },
  "dependencies": [
    $ref({...}),
  ],
  "dependents": [
    $ref({...}),
  ],
  "props": {},
  "examples": [{
    "caption": "A big red button",
    "code": "<Button size=\"big\" color=\"red\" />",
  }],
}
```

ideas for custom react-docgen handlers:
- resolve imported PropTypes / resolve spreaded child component PropTypes
- find component usages
  - search for components that are used inside other components
  - search for components that are used inside unit tests
- generate examples
  - generate dummy data from PropType documentation
    - show variations of enums
    - show variations of unions
    - show variations of booleans
  - generate examples from component docblock
    - each example is it's own variation
    - examples can have captions (i.e. @example big button\n<Button size="big" />)
  - generate examples from PropType docblock
    - show variations if multiple examples are specified
  - generate examples from fenced code blocks in readme
    - each code block is it's own variation
  - generate examples from component usage inside other components
    - collect all usages and filter for unique variations
  - generate examples from component usage inside unit tests
    - use unit test title as variation caption
  - generate examples via carte-blanche?
- find component dependencies inside jsx

todos:
  - react-docgen-imports-handler should also find imported & local name
  - Investigate if react-docgen can handle jsxmemberexpression
  - Investigate jsxnamespacedname
  - Investigate jsxspreadattribute
  - cleanup & tests for "generate-examples.js" -> create custom docgen handler
  - add symbol proptype to react-docgen propTypeHandler
  - fix issues with babel presets (object destructuring rest/spread should be stage-x not es2015)
