import { writeFile } from 'fs';
import { resolve as resolvePath, dirname } from 'path';
import { flatten } from 'lodash';
import collectFiles from './collect-files';
import readFile from './read-file';
import collectDependencies from './collect-dependencies';
import extractComponents from './extract-components';
import generateEntryFile from './generate-entryfile';

async function main(config = {}) {
    const files = await collectFiles({
        include: config.include,
        exclude: config.exclude
    });
    const components = flatten(await Promise.all(files.map(async (file) => {
        const { content, ast } = await readFile(file.fullPath);
        const fileImports = collectDependencies(ast);
        const components = extractComponents(ast);

        const dependencies = fileImports
            .filter(({ source }) => source.startsWith('.'))
            .map(({ source }) => resolvePath(dirname(file.fullPath), source))
            .map((path) => require.resolve(path));

        return components.map((component) => {
            return {
                ...component,
                ...file,
                content,
                fileImports,
                dependencies
            };
        });
    })));

    writeFile('./entry.js', generateEntryFile(components), (error) => {
        console.error(error);
    });

    console.log(JSON.stringify(components, null, 2));
}

main({
    include: '../costadigital/seetours-next/src/components/**/*.js'
});


process.on('unhandledRejection', console.error.bind(console));
process.on('uncaughtException', console.error.bind(console));
