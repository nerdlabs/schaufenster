import invariant from 'invariant';
import {VISITOR_KEYS} from 'babel-types';

const isFunction = (node = {}) => {
	return node.type === 'FunctionDeclaration' ||
		node.type === 'FunctionExpression' ||
		node.type === 'ArrowFunctionExpression';
};

const isClass = (node = {}) => {
	return node.type === 'ClassDeclaration' || node.type === 'ClassExpression';
};

const getBody = ({body = {body: []}}) => body.body;

const hasReturnStatement = (node = {}) => {
	const isArrowFunction = node.type === 'ArrowFunctionExpression';
	const hasBody = node.body.type === 'BlockExpression';
	// TODO: improve this by not only checking the direct body of the function
	// but recursively check all block / control flow statements
	return (isArrowFunction && !hasBody) ||
		getBody(node).some(({type}) => type === 'ReturnStatement');
};

const classExtends = (path = [], {superClass}) => {
	return superClass ? isIdOrMember(path, superClass) : false;
};

const getClassMethod = (method, node = {}) => {
	return isClass(node) && getBody(node).find(({key}) => key.name === method);
};

const isIdOrMember = (path, {type, name, property = {}, object = {}}) => {
	const head = path[0];
	const last = path[path.length -1];
	const init = path.slice(0, -1);

	return init.length === 0 ?
		name === head :
		property.name === last && isIdOrMember(init, object);
};

const isCallExpression = (path = [], node = {}) => {
	return node.type === 'CallExpression' && isIdOrMember(path, node.callee);
};

const isJSX = (pragma, node = {}) => {
	return node.type === 'JSXElement' || isCallExpression(pragma, node);
};

const containsJSX = (pragma, node = {}) => {
	const containsJSXWithPragma = containsJSX.bind(null, pragma);
	const keys = VISITOR_KEYS[node.type] || [];
	return isJSX(pragma, node) ||
		keys.some(key => {
			return Array.isArray(node[key]) ?
				node[key].some(containsJSXWithPragma) :
				node[key] && containsJSXWithPragma(node[key]);
		});
};

const extendsReact = node => {
	// TODO: take an array of names which were destructured from react (if any)
	// and check those instead of assuming that `Component` relates to react.
	return classExtends(['React', 'Component'], node) ||
		classExtends(['Component'], node);
};

const isCreateClass = node => {
	// TODO: take an array of names which were destructured from react (if any)
	// and check those instead of assuming that `createClass` relates to react.
	return isCallExpression(['React', 'createClass'], node) ||
		isCallExpression(['createClass'], node);
};

export default (node, pragma = ['React', 'createElement']) => {
	invariant(
		node && typeof node === 'object',
		'Argument "node" should be of type object. Instead got"%s"',
		typeof node
	);

	invariant(
		Array.isArray(pragma),
		'Argument "pragma" must be of type Array. Instead got "%s"',
		typeof pragma
	);

	const renderMethod = isClass(node) && getClassMethod('render', node);

	const isReactClass = isCreateClass(node) ||
		isClass(node) && extendsReact(node) && renderMethod !== undefined;

	const isStatelessFunction = isFunction(node) &&
		hasReturnStatement(node) && containsJSX(pragma, node);

	const isStatelessClass = isClass(node) && containsJSX(pragma, renderMethod);

	return isReactClass || isStatelessFunction || isStatelessClass;
};
