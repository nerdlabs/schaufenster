import invariant from 'invariant';
import {parse} from 'babylon';
import traverse from 'babel-traverse';
import isComponent from './is-component';

const babylonOptions = {
	sourceType: 'module',
	plugins: [
		'jsx',
		'flow',
		'asyncFunctions',
		'classConstructorCall',
		'doExpressions',
		'trailingFunctionCommas',
		'objectRestSpread',
		'decorators',
		'classProperties',
		'exportExtensions',
		'exponentiationOperator',
		'asyncGenerators',
		'functionBind',
		'functionSent'
	]
};

const isReactImport = ({type, source}) => {
	return type === 'ImportDeclaration' && source.value === 'react';
};

const isExport = ({type}) => {
	return type === 'ExportNamedDeclaration' ||
		type === 'ExportDefaultDeclaration';
};

const findDeclaration = (body, node) => {
	switch (node.type) {
		case 'ArrowFunctionExpression':
		case 'FunctionExpression':
		case 'ClassDeclaration':
		case 'ClassExpression':
		case 'CallExpression':
			return node;
		case 'VariableDeclarator':
			return node.init;
		case 'Identifier':
			const isMatch = ({id}) => id && id.name === node.name;

			return body.reduce((declaration, currentNode) => {
				const {id, declarations = []} = currentNode;
				if (declaration) {
					return declaration;
				} else if (isMatch(currentNode)) {
					return currentNode;
				} else {
					const declarator = declarations.find(isMatch);
					return declarator ? declarator.init : null;
				}
			}, null);
		default:
			console.warn('Could not find a declaration for', node.type);
			return null;
	}
};

export default code => {
	invariant(
		typeof code === 'string',
		'Argument must be of type string, instead got "%s"',
		typeof code
	);

	const {program: {body}} = parse(code, babylonOptions);

	const reactImports = body.filter(isReactImport)
		.reduce((imports, {specifiers = []}) => {
			return imports.concat(specifiers.map(({local}) => local.name));
		}, []);

	if (reactImports.length === 0) {
		return [];
	}

	const exports = body.filter(isExport)
		.reduce((exports, {type, declaration = {}, specifiers = []}) => {
			const declarations = declaration ?
				declaration.declarations || [declaration] :
				[];
			const nodes = declarations.concat(specifiers).map(node => {
				const {local, name, id = {}, exported = {}} = node;

				return {
					name: name || id.name || exported.name,
					node: local || node,
					type: type === 'ExportNamedDeclaration' ? 'named': 'default'
				};
			});

			return exports.concat(nodes);
		}, []);

	return exports.map(({name, node, type}) => {
		return {
			displayName: name,
			export: {
				name: type === 'default' ? 'default': name,
				node,
				type
			},
			node: findDeclaration(body, node)
		};
	}).filter(({node}) => node && isComponent(node));
};
