import test from 'ava';
import mockFs from 'mock-fs';
import readPatterns from '../source/read-patterns';

const mocks = {
	'jsonerr/components/button': {
		'package.json': '{name":"button","version":"0.1.0","main":"button.js"}'
	},
	'noentry/components/button': {
		'package.json': '{"name":"button","version":"0.1.0","main":"button.js"}'
	},
	'noindex/components/button': {
		'package.json': '{"name":"button","version":"0.1.0"}'
	},
	'valid/components/button': {
		'button.js': 'foo',
		'index.js': 'blub',
		'package.json': '{"name":"button","version":"0.1.0","main":"button.js"}',
		'readme.md': 'blah'
	}
};

test.beforeEach(() => mockFs(mocks));
test.afterEach(mockFs.restore);

test('when calling with no arguments', t => {
	const actual = readPatterns();
	t.throws(actual, Error, 'it should throw an Error');
});

test('when calling with an empty array', async t => {
	const actual = await readPatterns([]);
	t.deepEqual(actual, [], 'it should return an empty array');
});

test(`when package.json->main does not exist`, t => {
	const actual = readPatterns([{path: './noentry/components/button'}]);
	t.throws(actual, Error, 'it should throw an Error');
	mockFs.restore();
});

test(`when package.json->main is unspecified and no index.js exists`, t => {
	const actual = readPatterns([{path: './noindex/components/button'}]);
	t.throws(actual, Error, 'it should throw an Error');
	mockFs.restore();
});

test(`when calling with valid pattern folders`, async t => {
	const actual = await readPatterns([{path: './valid/components/button'}]);
	const expected = [{
		path: './valid/components/button',
		files: ['button.js', 'index.js', 'package.json', 'readme.md'],
		package: {name: 'button', version: '0.1.0', main: 'button.js'},
		entry: 'button.js',
		readme: 'blah'
	}];
	t.deepEqual(actual, expected, 'it should find readme, package.json and entry files');
	mockFs.restore();
});
