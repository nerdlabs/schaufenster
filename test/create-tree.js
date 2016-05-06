import test from 'ava';
import createTree from '../source/create-tree';

const atomsButton = {
	id: 'atoms/button',
	path: './components/atoms/button',
	files: ['index.js', 'package.json', 'readme.md'],
	package: {name: 'button'},
	entry: 'index.js',
	readme: 'text'
};

const atomsInputsInput = {
	id: 'atoms/inputs/input',
	path: './components/atoms/inputs/input',
	files: ['index.js', 'package.json', 'readme.md'],
	package: {name: 'input'},
	entry: 'index.js',
	readme: 'text'
};

test('when calling create-tree with no arguments', t => {
	t.throws(createTree, Error, 'it should throw an Error');
});

test('when calling create-tree with an empty array', t => {
	const actual = createTree([]);
	t.deepEqual(actual.constructor.name, 'Map', 'it should return an empty Map');
});

test('when calling create-tree with an array of patterns', t => {
	const actual = createTree([atomsButton, atomsInputsInput]);
	t.deepEqual(actual.get('atoms').get('button'), atomsButton,
		'it should be able to keep old patterns');
	t.deepEqual(actual.get('atoms').get('inputs').get('input'), atomsInputsInput,
		'it should nest arbitrarily deep');
});
