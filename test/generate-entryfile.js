import test from 'ava';
import mockFs from 'mock-fs';
import { readFileSync } from 'fs';
import generateEntryFile from '../source/generate-entryfile';

const mocks = {
    '/button/index.js': 'export default function () {}'
};

test.beforeEach(() => mockFs(mocks));
test.afterEach(mockFs.restore);

test('when calling generate-entryfile without argument', t => {
    const actual = generateEntryFile();
    const expected = 'global.__schaufenster__ = {};';
    t.is(actual, expected, 'it should import nothing');
});

test('when calling generate-entryfile with invalid arguments', t => {
    const actual = () => generateEntryFile(null);
    t.throws(actual, Error, 'it should throw an error');
});

test('when calling generate-entryfile with an empty array', t => {
    const actual = generateEntryFile([]);
    const expected = 'global.__schaufenster__ = {};';
    t.is(actual, expected, 'it should import nothing');
});

test('calling generate-entryfile with a default exported component', t => {
    const components = [{
        displayName: 'Button',
        fullPath: '/button/index.js',
        export: { name: 'default', type: 'default' }
    }];
    const actual = generateEntryFile(components);
    const expected = 'import { default as default_0 } from "/button/index.js";'
        + '\nglobal.__schaufenster__ = {\n  "/button/index.js": default_0\n};';
    t.is(actual, expected, 'it should import and expose the component');
});

test('calling generate-entryfile with a named exported component', t => {
    const components = [{
        displayName: 'Button',
        fullPath: '/button/index.js',
        export: { name: 'Button', type: 'named' }
    }];
    const actual = generateEntryFile(components);
    const expected = 'import { Button as Button_0 } from "/button/index.js";'
        + '\nglobal.__schaufenster__ = {\n  "/button/index.js": Button_0\n};';
    t.is(actual, expected, 'it should import and expose the component');
});
