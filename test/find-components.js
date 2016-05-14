import test from 'ava';
import findComponents from '../source/find-components';


test('calling find-components with no arguments', t => {
	const actual = () => findComponents();
	t.throws(actual, Error, 'it should throw an error');
});

test('calling find-components with an invalid argument', t => {
	const actual = () => findComponents(1);
	t.throws(actual, Error, 'it should throw an error');
});

test('calling find-components with an empty string', t => {
	const actual = findComponents('');
	t.deepEqual(actual, [], 'it should return an empty array');
});

test('calling find-components with unparseable code', t => {
	const code = `
		function }
	`;
	const actual = () => findComponents(code);
	t.throws(actual, Error, 'it should throw an error');
});

test('calling find-components with source code that contains no exports', t => {
	const code = `
		const a = 1;
	`;
	const actual = findComponents(code);
	t.deepEqual(actual, [], 'it should return an empty array');
});

test('calling find-components with code that does not export a react component', t => {
	const code = `
		import * as React from 'react';
		export const a = 1;
	`;
	const actual = findComponents(code);
	t.deepEqual(actual, [], 'it should return an empty array');
});

test('calling find-components with code that does not import react', t => {
	const code = `
		export default class A extends React.Copmonent {
			render() {
				return (<b />);
			}
		};
	`;
	const actual = findComponents(code);
	t.deepEqual(actual, [], 'it should return an empty array');
});

test('calling find-components with a default exported react component', t => {
	const code = `
		import * as React from 'react';
		export default class A extends React.Copmonent {
			render() {
				return (<b />);
			}
		};
	`;
	const [actual] = findComponents(code);
	const expected = {
		displayName: 'A',
		export: {
			name: 'default',
			type: 'default',
			node: {
				/* AST node of export statement */
			}
		},
		node: {
			/* AST node of component declaration */
		}
	};
	t.is(actual.displayName, expected.displayName, 'it should find the component name');
	t.is(actual.export.name, expected.export.name, 'it should find the exported name');
	t.is(actual.export.type, expected.export.type, 'it should find the exported type');
	t.deepEqual(actual.node, actual.export.node, 'it should have the same nodes for export and declaration');
});

test('calling find-components with a default exported react component', t => {
	const code = `
		import * as React from 'react';
		const A = function () {
			return (<b />);
		};
		export default A;
	`;
	const [actual] = findComponents(code);
	const expected = {
		displayName: 'A',
		export: {
			name: 'default',
			type: 'default',
			node: {
				/* AST node of export statement */
			}
		},
		node: {
			/* AST node of component declaration */
		}
	};
	t.is(actual.displayName, expected.displayName, 'it should find the component name');
	t.is(actual.export.name, expected.export.name, 'it should find the exported name');
	t.is(actual.export.type, expected.export.type, 'it should find the exported type');
	t.notDeepEqual(actual.node, actual.export.node, 'it should not have the same nodes for export and declaration');
});

test('calling find-components with an exported react component', t => {
	const code = `
		import * as React from 'react';
		function B () {
			return (<b />);
		}
		export {B};
	`;
	const [actual] = findComponents(code);
	const expected = {
		displayName: 'B',
		export: {
			name: 'B',
			type: 'named',
			node: {
				/* AST node of export statement */
			}
		},
		node: {
			/* AST node of component declaration */
		}
	};
	t.is(actual.displayName, expected.displayName, 'it should find the component name');
	t.is(actual.export.name, expected.export.name, 'it should find the exported name');
	t.is(actual.export.type, expected.export.type, 'it should find the exported type');
	t.notDeepEqual(actual.node, actual.export.node, 'it should not have the same nodes for export and declaration');
});
