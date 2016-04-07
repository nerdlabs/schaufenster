import test from 'ava';
import mockFs from 'mock-fs';
import findPatterns from '../source/find-patterns';

test('when calling find-patterns with no arguments', t => {
	const actual = findPatterns();
	t.throws(actual, TypeError, 'it should throw a TypeError');
});

test('when calling find-patterns with a non-existing path', t => {
	const actual = findPatterns('./something/very/unlikely');
	t.throws(actual, RangeError, 'it should throw a RangeError');
});

test('when no patterns are found in given directory', async t => {
	mockFs({
		'components': {
			'unrelated.js': 'blah'
		}
	});
	const actual = await findPatterns('./components');
	t.same(actual, [], 'it should return an empty array');
});
