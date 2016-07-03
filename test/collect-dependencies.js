import test from 'ava';
import CollectDependencies from '../source/collect-dependencies';
import importStatementsFixture from './fixtures/import-statements';
import requireStatementsFixture from './fixtures/require-statements';

test('when calling read-file with no arguments', t => {
	const actual = CollectDependencies;
	t.throws(actual, Error, 'it should throw an error');
});

test('when calling read-file with invalid arguments', t => {
    const actual = () => CollectDependencies(null);
    t.throws(actual, Error, 'it should throw an error');
});

test('when calling read-file with an AST that contains no imports', t => {
    const actual = CollectDependencies({ type: 'Program', body: [] });
    const expected = [];
    t.deepEqual(actual, expected, 'it should return an empty array');
});

test('when calling read-file with an AST that contains import statements', t => {
    const actual = CollectDependencies(importStatementsFixture);
    const expected = [
        { source: 'react', names: [{ '*': 'React' }] },
        { source: '../label', names: [{ 'default': 'Label' }] },
        { source: '../actions', names: [{ 'myAction': 'myAction' }] }
    ];

    t.deepEqual(actual, expected, 'it should return a list of the imports');
});

test('when calling read-file with an AST that contains require calls', t => {
    const actual = CollectDependencies(requireStatementsFixture);
    const expected = [
        { source: 'react' },
        { source: '../label' },
        { source: '../actions' }
    ];

    t.deepEqual(actual, expected, 'it should return a list of the dependencies');
});
