import test from 'ava';
import mockFs from 'mock-fs';
import readFile from '../source/read-file';

const mocks = {
    'components/button.js': 'export default 1;'
};

test.beforeEach(() => mockFs(mocks));
test.afterEach(mockFs.restore);

test('when calling read-file with no arguments', t => {
	const actual = readFile();
	t.throws(actual, Error, 'it should throw an error');
});

test('when calling read-file with a non-existant filePath', t => {
    const actual = readFile('./non-existant/file.js');
    t.throws(actual, Error, 'it should throw an error');
});

test('when calling read-file with an actual filePath', async t => {
    const actual = await readFile('./components/button.js');
    const expected = {
        content: 'export default 1;',
        ast: {}
    };

    t.deepEqual(Object.keys(actual), ['content', 'ast'], 'it should return an object');
    t.is(actual.content, expected.content, 'it should read the file content');
    t.is(typeof actual.ast, 'object', 'it should parse the file to an AST');
});
