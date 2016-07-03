import test from 'ava';
import extractComponents from '../source/extract-components';
import directDefaultExport from './fixtures/direct-default-export';
import referencedDefaultExport from './fixtures/referenced-default-export';
import anonymousDefaultExport from './fixtures/anonymous-default-export';
import directNamedExport from './fixtures/direct-named-export';
import referencedNamedExport from './fixtures/referenced-named-export';
import anonymousNamedExport from './fixtures/anonymous-named-export';

test('when calling extract-components with no arguments', t => {
    const actual = extractComponents;
    t.throws(actual, Error, 'it should throw an exception')
});

test('when calling extract-components with invalid arguments', t => {
    const actual = () => extractComponents(null);
    t.throws(actual, Error, 'it should throw an exception');
});

test('extract-components: direct default export component', t => {
    const actual = extractComponents(directDefaultExport);
    const expected = [{
        displayName: 'Button',
        export: { name: 'default', type: 'default' }
    }];
    t.deepEqual(actual, expected, 'it should find the export type and name');
});

test('extract-components: referenced default export component', t => {
    const actual = extractComponents(referencedDefaultExport);
    const expected = [{
        displayName: 'Button',
        export: { name: 'default', type: 'default' }
    }];
    t.deepEqual(actual, expected, 'it should find the export type and name');
});

test('extract-components: anonymous default export component', t => {
    const actual = extractComponents(anonymousDefaultExport);
    const expected = [{
        displayName: null,
        export: { name: 'default', type: 'default' }
    }];
    t.deepEqual(actual, expected, 'it should set the displayName to null');
});

test('extract-components: direct export named component', t => {
    const actual = extractComponents(directNamedExport);
    const expected = [{
        displayName: 'Button',
        export: { name: 'Button', type: 'named' }
    }];
    t.deepEqual(actual, expected, 'it should find the export type and name');
});

test('extract-components: referenced export named component', t => {
    const actual = extractComponents(referencedNamedExport);
    const expected = [{
        displayName: 'Button',
        export: { name: 'Button', type: 'named' }
    }];
    t.deepEqual(actual, expected, 'it should find the export type and name');
});

test('extract-components: anonymous named export component', t => {
    const actual = extractComponents(anonymousNamedExport);
    const expected = [{
        displayName: 'Button',
        export: { name: 'Button', type: 'named' }
    }];
    t.deepEqual(actual, expected, 'it should use exported name as displayName');
});
