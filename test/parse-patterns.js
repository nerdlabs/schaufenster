import test from 'ava';
import parsePatters from '../source/parse-patterns';

test('when calling with no arguments', t => {
	const actual = parsePatters();
	t.throws(actual, Error, 'it should throw an Error');
});
