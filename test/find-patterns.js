import test from 'ava';
import mockFs from 'mock-fs';
import findPatterns from '../source/find-patterns';

const mocks = {
	'unrelated/components/unrelated.js': 'blah',
	'single/components/atoms/text': {
		'package.json': '{"name":"text","version":"0.1.0","main":"index.js"}',
		'index.js': 'export default const foo = true;'
	}
};

test.beforeEach(() => mockFs(mocks));
test.afterEach(mockFs.restore);

test('when calling find-patterns with no arguments', t => {
	const actual = findPatterns();
	t.throws(actual, Error, 'it should throw a Error');
});

test('when calling find-patterns with a non-existing path', t => {
	const actual = findPatterns('./something/very/unlikely');
	t.throws(actual, RangeError, 'it should throw a RangeError');
});

test('when no patterns are found in given directory', async t => {
	const actual = await findPatterns('./unrelated/components');
	t.deepEqual(actual, [], 'it should return an empty array');
});

test('when calling find-patterns with a file path', t => {
	const actual = findPatterns('./unrelated/components/unrelated.js');
	t.throws(actual, RangeError, 'it should throw a RangeError');
});

test('when calling with a valid patterns directory', async t => {
	const actual = await findPatterns('./single/components');
	const expected = [{
		id: 'atoms/text',
		path: './single/components/atoms/text'
	}];
	const it = `
		it should return an object for each pattern consisting of "id" and "path"
	`;
	t.deepEqual(actual, expected, it);
});
