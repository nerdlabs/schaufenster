import test from 'ava';
import mockFs from 'mock-fs';
import findPatterns from '../source/find-patterns';

const mocks = {
	unrelated: {
		'components/unrelated.js': 'blah'
		}
	}
};

test.after(() => {
	mockFs.restore();
});

test('when calling find-patterns with no arguments', t => {
	const actual = findPatterns();
	t.throws(actual, Error, 'it should throw a Error');
});

test('when calling find-patterns with a non-existing path', t => {
	const actual = findPatterns('./something/very/unlikely');
	t.throws(actual, RangeError, 'it should throw a RangeError');
});

test('when no patterns are found in given directory', async t => {
	mockFs(mocks.unrelated);
	const actual = await findPatterns('./components');
	t.same(actual, [], 'it should return an empty array');
});

test('when calling find-patterns with a file path', t => {
	mockFs(mocks.unrelated);
	const actual = findPatterns('./components/unrelated.js');
	t.throws(actual, RangeError, 'it should throw a RangeError');
});
