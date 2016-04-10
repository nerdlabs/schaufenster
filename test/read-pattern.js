import test from 'ava';
import mockFs from 'mock-fs';
import readPatterns from '../source/read-patterns';

test('when calling with no arguments', t => {
	const actual = readPatterns();
	t.throws(actual, Error, 'it should throw an Error');
});

test('when calling with an empty array', async t => {
	const actual = await readPatterns([]);
	t.same(actual, [], 'it should return an empty array');
});

test(`when calling with valid pattern folders`, async t => {
	mockFs({
		'components/button': {
			'package.json': '{"name":"button","version":"0.1.0","main":"button.js"}',
			'button.js': 'blub'
		}
	});
	const actual = await readPatterns([{path: './components/button'}]);
	const expected = [{
		path: './components/button',
		files: ['button.js', 'package.json']
	}];
	t.same(actual, expected, 'it should read the directory contents');
	mockFs.restore();
});
