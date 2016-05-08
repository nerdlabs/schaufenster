import test from 'ava';
import createEntryFile from '../source/create-entryfile';

const atomsButton = {
	id: 'atoms/button',
	path: './components/atoms/button',
	entry: 'index.js'
};

const patterns = [{
	id: 'atoms/button',
	path: './components/atoms/button',
	entry: 'index.js'
}, {
	id: 'atoms/input',
	path: './components/atoms/input',
	entry: 'index.js'
}];

test('when calling createEntryFile with no arguments', t => {
	const actual = createEntryFile;
	t.throws(actual, Error, 'it should throw an error');
});

test('when calling createEntryFile with an empty array', t => {
	const actual = createEntryFile([]).trim();
	const expected = 'window.__schaufenster__ = {};';
	t.is(actual, expected, 'it should export no patterns');
});

test('when calling createEntryFile with one pattern', t => {
	const actual = createEntryFile([atomsButton]).trim();
	const expected = 'window.__schaufenster__ = {};\n'
		+ 'window.__schaufenster__[\'atoms/button\'] = require(\'./components/atoms/button/index.js\');';
	t.is(actual, expected, 'it should export the pattern under its id');
});

test('when calling createEntryFile with multiple patterns', t => {
	const actual = createEntryFile(patterns).trim();
	const expected = 'window.__schaufenster__ = {};\n'
		+ 'window.__schaufenster__[\'atoms/button\'] = require(\'./components/atoms/button/index.js\');\n'
		+ 'window.__schaufenster__[\'atoms/input\'] = require(\'./components/atoms/input/index.js\');';
	t.is(actual, expected, 'it should export the pattern under its id');
});
