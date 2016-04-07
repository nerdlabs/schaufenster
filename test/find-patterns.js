import test from 'ava';
import findPatterns from '../source/find-patterns';

test('when calling find-patterns', t => {
	const actual = findPatterns();
	t.ok(typeof actual.then === 'function', 'it should return a promise');
});

test('when calling with no arguments', t => {
	const actual = findPatterns();
	t.throws(actual, TypeError, 'it should throw a TypeError');
});
