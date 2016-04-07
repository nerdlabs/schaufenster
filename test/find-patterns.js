import test from 'ava';
import findPatterns from '../source/find-patterns';

test('when calling find-patterns with no arguments', t => {
	const actual = findPatterns();
	t.throws(actual, TypeError, 'it should throw a TypeError');
});
