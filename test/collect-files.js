import test from 'ava';
import mockFs from 'mock-fs';
import collectFiles from '../source/collect-files';

const mocks = {
	'no/components/here': {
		'.gitignore': '#foo',
		'package.json': '{}'
	},
	'nested/components': {
		'inputs': {
			'index.js': 'export default const foo = true;'
		},
		'button.js': 'export default const foo = true;',
		'image.js': 'export default const foo = true;'
	}
};

test.beforeEach(() => mockFs(mocks));
test.afterEach(mockFs.restore);

test('when calling collect-files with no arguments', t => {
	const actual = collectFiles();
	t.throws(actual, Error, 'it should throw an error');
});

test('when calling collect-files with an invalid argument', t => {
	const actual = collectFiles({include: []});
	t.throws(actual, Error, 'it should throw an error');
});

test('when no files are found with given glob', async t => {
	const actual = await collectFiles({include: './no/components/**/*.js'});
	t.deepEqual(actual, [], 'it should return an empty array');
});

test('when calling with a matching glob', async t => {
	const actual = await collectFiles({include: './nested/components/**/*.js'});
	const expected = [{
		filename: 'button.js',
		fullPath: './nested/components/button.js'
	}, {
		filename: 'image.js',
		fullPath: './nested/components/image.js'
	}, {
		filename: 'index.js',
		fullPath: './nested/components/inputs/index.js'
	}];
	const it = `
		it should return an object for each pattern consisting of "path",
		"filename" and "fullPath"
	`;
	t.deepEqual(actual, expected, it);
});

test('when calling with a matching glob + exclude glo', async t => {
	const actual = await collectFiles({
		include: './nested/components/**/*.js',
		exclude: './nested/components/inputs/**/*.js'
	});
	const expected = [{
		filename: 'button.js',
		fullPath: './nested/components/button.js'
	}, {
		filename: 'image.js',
		fullPath: './nested/components/image.js'
	}];
	const it = `
		it should return an object for each pattern consisting of "path",
		"filename" and "fullPath"
	`;
	t.deepEqual(actual, expected, it);
});
