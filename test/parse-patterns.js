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
	const [{dependencies: actual}] = await parsePatters([{entry}]);
	const expected = ['../text'];
	t.same(actual, expected, 'it should parse entry file and find file dependencies');
});

test('try to parse propTypes with react-docgen', async t => {
	const entry = unindent(`
		import * as React from 'react';
		export default function Button({text}) {
			return (<button>{text}</button>);
		};
		Button.propTypes = {
			/**
			 * Description of prop "text" which is required
			 */
			text: React.PropTypes.string.isRequired
		};
	`);
	const [{propTypes: actual}] = await parsePatters([{entry}]);
	t.ok(typeof actual === 'object', 'it should parse propTypes and run react-docgen');
});
