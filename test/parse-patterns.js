import test from 'ava';
import unindent from 'unindent';
import parsePatters from '../source/parse-patterns';

test('when calling with no arguments', t => {
	const actual = parsePatters();
	t.throws(actual, Error, 'it should throw an Error');
});

test('when calling with an empty array', async t => {
	const actual = await parsePatters([]);
	t.same(actual, [], 'it should return an empty array');
});

test('find dependencies', async t => {
	const entry = unindent(`
		import Text from '../text';
		export default (props) => {
			return (<button><Text /></button>);
		};
	`);
	const actual = await parsePatters([{entry}]);
	const expected = [{
		entry,
		dependencies: ['../text']
	}];
	t.same(actual, expected, 'it should parse entry file and find file dependencies');
});
