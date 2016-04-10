import invariant from 'invariant';
import * as babylon from 'babylon';
import astDependencies from 'babylon-ast-dependencies';
import * as docGen from 'react-docgen';

const babylonOptions = {
	sourceType: 'module',
	plugins: [
		'jsx',
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

export default async (patterns) => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	return patterns.map(pattern => {
		const ast = babylon.parse(pattern.entry, babylonOptions);
		const dependencies = astDependencies(ast);

		return {
			...pattern,
			dependencies: dependencies.map(dependency => dependency.source),
			propTypes: docGen.parse(pattern.entry)
		};
	});
};
