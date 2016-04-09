import test from 'ava';
import readPatterns from '../source/read-patterns';

test('when calling with no arguments', t => {
	const actual = readPatterns();
	t.throws(actual, Error, 'it should throw an Error');
});

test('when calling with an empty array', async t => {
	const actual = await readPatterns([]);
	t.same(actual, [], 'it should return an empty array');
});
