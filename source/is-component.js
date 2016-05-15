import invariant from 'invariant';
import {VISITOR_KEYS} from 'babel-types';

const isClass = (node = {}) => node.type === 'ClassDeclaration' ||
	node.type === 'ClassExpression';

const getClassMethods = (node = {}) => isClass(node) ? node.body.body : null;

const getObjectName = ({type = 'Identifier', name, object}) => {
	return type === 'Identifier' ? name : getObjectName(object);
};

const classExtends = (supers = [], {superClass}) => {
	const hasSuperClass = superClass != null; // check against null|undefined
	return hasSuperClass ? supers.includes(getObjectName(superClass)) : false;
};

const getMethod = (method, methods = []) => {
	return Array.isArray(methods) ?
		methods.find(({key}) => key.name === method) :
		null;
};

const isJSX = (node = {}) => {
	const isJSXElement = node.type === 'JSXElement';
	const isCreateElement = node.type === 'CallExpression' &&
		node.callee.type === 'MemberExpression' &&
		node.callee.object.name === 'React' &&
		node.callee.property.name === 'createElement';
	return isJSXElement || isCreateElement;
};

const containsJSX = (node = {}) => {
	const keys = VISITOR_KEYS[node.type] || [];
	return isJSX(node) || keys.some(key => Array.isArray(node[key]) ?
		node[key].some(containsJSX) :
		containsJSX(node[key]));
};

const isCreateClass = (node = {}) => {
	return node.type === 'CallExpression' &&
		node.callee.type === 'MemberExpression' &&
		node.callee.object.name === 'React' &&
		node.callee.property.name === 'createClass';
};

const isFunction = (node = {}) => {
	return node.type === 'FunctionDeclaration' ||
		node.type === 'FunctionExpression' ||
		node.type === 'ArrowFunctionExpression';
};

const hasReturnStatement = ({body: {body = []}}) => {
	return body.some(({type}) => type === 'ReturnStatement');
};

export default node => {
	invariant(
		node && typeof node === 'object',
		'Argument should be of type object. Instead got"%s"',
		typeof node
	);

	const extendsReact = classExtends(['React', 'Component'], node);
	const renderMethod = getMethod('render', getClassMethods(node));
	const hasRenderMethod = renderMethod != null; // check against null|undefined
	const renderContainsJSX = hasRenderMethod && containsJSX(renderMethod);

	const isReactClass = isClass(node) &&
		((extendsReact && hasRenderMethod) || renderContainsJSX) ||
		isCreateClass(node);

	const isStatelessFunctionalComponent = isFunction(node) &&
		hasReturnStatement(node) &&
		containsJSX(node);

	return isReactClass || isStatelessFunctionalComponent;
};
