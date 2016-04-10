# pattern / dependency tree

##initial structure
This is how the graph looks like after `find-patterns` and `read-patterns` have  
created the initial graph.
```json
{
  "atoms": {
    "logo": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "atoms/logo",
      "package": "{\"name\":\"logo\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/atoms/logo",
      "readme": "this is the readme.md file content"
    },
    "button": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "atoms/button",
      "package": "{\"name\":\"button\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/atoms/button",
      "readme": "this is the readme.md file content"
    },
    "form-inputs": {
      "search-input": {
        "entry": "this is the entry file content",
        "files": ["index.js", "package.json", "readme.md"],
        "id": "atoms/form-inputs/search-input",
        "package": "{\"name\":\"search-input\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
        "path": "./components/atoms/form-inputs/search-input",
        "readme": "this is the readme.md file content"
      }
    },
  },
  "molecules": {
    "search-form": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "molecules/search-form",
      "package": "{\"name\":\"search-form\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/molecules/search-form",
      "readme": "this is the readme.md file content"
    }
  },
  "organisms": {
    "header": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "organisms/header",
      "package": "{\"name\":\"header\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/organisms/header",
      "readme": "this is the readme.md file content"
    }
  }
}
```

## after adding dependencies / dependents
This is basically a bidirectional graph where a few helper methods  
(namely `addDependency` and `removeDependency`) add / remove edges (dependencies)  
between the `Pattern` nodes.
```json
{
  "atoms": {
    "logo": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "atoms/logo",
      "package": "{\"name\":\"logo\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/atoms/logo",
      "readme": "this is the readme.md file content",
      "dependencies": [],
      "dependents": ["organisms/header"]
    },
    "button": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "atoms/button",
      "package": "{\"name\":\"button\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/atoms/button",
      "readme": "this is the readme.md file content",
      "dependencies": [],
      "dependents": ["molecules/search-form"]
    },
    "form-inputs": {
      "search-input": {
        "entry": "this is the entry file content",
        "files": ["index.js", "package.json", "readme.md"],
        "id": "atoms/form-inputs/search-input",
        "package": "{\"name\":\"search-input\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
        "path": "./components/atoms/form-inputs/search-input",
        "readme": "this is the readme.md file content",
        "dependencies": [],
        "dependents": ["molecules/search-form"]
      }
    },
  },
  "molecules": {
    "search-form": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "molecules/search-form",
      "package": "{\"name\":\"search-form\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/molecules/search-form",
      "readme": "this is the readme.md file content",
      "dependencies": ["atoms/button", "atoms/form-inputs/search-input"],
      "dependents": ["organisms/header"]
    }
  },
  "organisms": {
    "header": {
      "entry": "this is the entry file content",
      "files": ["index.js", "package.json", "readme.md"],
      "id": "organisms/header",
      "package": "{\"name\":\"header\",\"version\":\"0.1.0\",\"main\":\"index.js\"}",
      "path": "./components/organisms/header",
      "readme": "this is the readme.md file content",
      "dependencies": ["atoms/logo", "molecules/search-form"],
      "dependents": []
    }
  }
}
```

## methods to read / manipulate tree

### getPattern
Finds a pattern by `patternId` (e.x.: `atoms/logo`) and returns it.
```haskell
getPattern(tree:PatternTree, patternId:String) -> Pattern
```
### addPattern
Reads the `patternId` from `pattern.id` and adds it to the graph.  
Returns a new `PatternTree`.
```haskell
addPattern(tree:PatternTree, pattern:Pattern) -> PatternTree
```
### removePattern
Finds a pattern via `patternId` and removes it from the graph.  
Also takes care of removing it from other patterns `dependencies` / `dependents`  
arrays.
```haskell
removePattern(tree:PatternTree, patternId:String) -> PatternTree
```
### addDependency
Finds a pattern via `patternId` and adds the pattern with `dependencyId` to its  
`dependencies`.  
Also updates the pattern found via `dependencyId` and adds `patternId` to its  
`dependents`.
```haskell
addDependency(tree:PatternTree, patternId:String, dependencyId:String) -> PatternTree
```
### removeDependency
Finds a pattern via `patternId` and removes `dependencyId` from its `dependencies`.
```haskell
removeDependency(tree:PatternTree, patternId:String, dependencyId:String) -> PatternTree
```

## Usage
Use `getPattern` to get a `Pattern` object.  
Read its `dependencies` or `dependents` and recursively call `getPattern` to get  
to the next pattern.

When a pattern file has been changed (chokidar watcher), re-parse the changed  
files and use `addDependency` / `removeDependency` to update the graph accordingly.  
This means updating the graph in both directions (dependencies and dependents).

Read the top-level keys to create the navigation (or nth-level keys for subnavigation). 
