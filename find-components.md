# Strategy to find React components in ES6 code
- parse input file
- abort if file does not contain any export statements
- abort if file does not import from 'react' / does not have `React` in scope
- find all export statements and check if:
	- they export a class that inherits from React.Component
	- they export a CallExpression of React.createClass
	- they export a class that contains a render method that contains/returns JSX
	- they export a function that contains/returns JSX

* JSX means either an JSXExpression or a CallExpression to React.createElement
* also follow references (e.g. `export default MyComponent` should find MyComponent)
* also check if React has been destructured (e.g. `class A extends Component`, etc)

## caveats
- **connected or otherwise wrapped / decorated components**
	- in these cases the original component needs to be exported standalone and
	should have sensible defaultProps set
- **components that use a different JSX pragma**
	- investigate feasibility of parsing JSX pragma directive or make it configurable
- **components that are not exported**
	- are not going to be displayed
- **classes / functions that contain/return JSX but are actually no React Components**
	- either fail at rendering or allow the user to blacklist them

### not yet of concern
- **commonjs**
	- will be implemented later as a different module with a similar strategy
- **other module formats (AMD/UMD) or not module format at all (globals)**
	- might be implemented later as a different module
- **performance**
	- is of no concern for now because there are countless options to optimize this later. e.g.:
		- incremental parsing
		- caching strategy
		- run babylon in parallel in a worker pool
		- use `traverse.cheap` and other more performance oriented APIs

## configuration
- component root folder
- globbing patterns to include/exclude files
- component blacklist for individual components
- JSX pragma (if it cannot be parsed)

## other ideas
- parse the leading comments of a component (which babylon provides us with)
for schaufenster annotations (might be blacklists or expressions that help render the component)
