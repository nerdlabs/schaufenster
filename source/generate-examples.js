import generate from 'babel-generator';
import * as t from 'babel-types';

export default function(componentName, props) {
	const requiredProps = Object.entries(props)
		.filter(([_, {required}]) => required)
		.map(([name, propDefinition]) => ({name, ...propDefinition}));

	const {children, ...attributes} = requiredProps.reduce((attributes, prop) => {
		return {
			...attributes,
			[prop.name]: exampleValue(prop.type)
		};
	}, {});

	return generateJSX(componentName, attributes, [children]);
}

function exampleValue(propDefinition = {}) {
	const value = propDefinition.value;
	switch (propDefinition.name) {
  	case 'array':
			return [];
  	case 'bool':
			return false;
  	case 'func':
			return () => {};
  	case 'number':
			return 1;
  	case 'object':
			return {};
  	case 'string':
			return 'lorem ipsum';
  	case 'element':
			// TODO
			return '<div />';
  	case 'node':
			return 'children';
		case 'arrayOf':
			return [exampleValue(value)];
		case 'union':
			return value.map(exampleValue).filter(x => x != null)[0];
		case 'enum':
			const first = value.filter(({ computed }) => !computed)[0] || {};
			return eval(first.value);
		case 'shape':
			return Object.entries(value)
				.reduce((values, [key, value]) => {
					const amendment = value.required ? {[key]: exampleValue(value)} : {};
					return {
						...values,
						...amendment
					};
				}, {})
  	case 'any':
		case 'instanceOf':
			return null;
		default:
			return 'custom';
	}
	return undefined;
}

function getValueExpression(value) {
	switch (typeof value) {
		case 'string':
			return t.stringLiteral(value);
		case 'number':
			return t.numericLiteral(value);
		case 'boolean':
			return t.booleanLiteral(value);
		case 'function':
			return t.arrowFunctionExpression([], t.blockStatement([]));
		case 'object':
			if (value === null) {
				return t.nullLiteral();
			} else if (Array.isArray(value)) {
				return t.arrayExpression(value.map(getValueExpression));
			} else if (Object.getPrototypeOf(value) === Object.prototype) {
				return t.objectExpression(Object.entries(value).map(([key, value]) => {
					return t.objectProperty(
						t.stringLiteral(key),
						getValueExpression(value)
					);
				}));
			} else {
				throw new Error(
					'Unknown object type: ' + Object.prototype.toString.call(value)
				);
			}
		default:
			throw new Error('Unexpected type for property value: ' + typeof value);
	}
}

function generateJSXAttribute(key, value) {
	return t.jSXAttribute(
		t.jSXIdentifier(key),
		typeof value === 'string' ?
			t.stringLiteral(value) :
			t.jSXExpressionContainer(getValueExpression(value))
	);
}

function generateJSXChildren(children) {
	return children.map(child => t.jSXText(child));
}

function generateJSX(componentName, attributes, children = []) {
	const ast = t.program([
		t.expressionStatement(
			t.jSXElement(
				t.jSXOpeningElement(
			    t.jSXIdentifier(componentName),
					Object.entries(attributes)
						.map(([key, value]) => generateJSXAttribute(key, value)),
			    children.length === 0
			  ),
				t.jSXClosingElement(t.jSXIdentifier(componentName)),
				generateJSXChildren(children)
			)
		)
	]);

	return generate(ast).code;
}
