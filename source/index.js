import 'babel-polyfill';
import { resolver, handlers as allHandlers, parse } from 'react-docgen';
import importsHandler from 'react-docgen-imports-handler';
import exportsHandler from 'react-docgen-exports-handler';
import { createDisplayNameHandler } from 'react-docgen-displayname-handler';
import collectFiles from './collect-files';
import { tryReadFile } from './lib/fs';
import generateExample from './generate-examples';
import generateEntryFile from './generate-entryfile';

const findComponents = resolver.findAllExportedComponentDefinitions;
const handlers = [
	allHandlers.componentDocblockHandler,
	allHandlers.defaultPropsHandler,
	allHandlers.propTypeHandler,
	allHandlers.propTypeCompositionHandler,
	allHandlers.propDocBlockHandler,
	allHandlers.flowTypeHandler,
	allHandlers.flowTypeDocBlockHandler,
	importsHandler,
	exportsHandler,
];

async function main() {
	const files = await collectFiles({
		include: '/home/zaubernerd/workspace/costadigital/seetours-next/src/components/**/*.js',
		exclude: '/home/zaubernerd/workspace/costadigital/seetours-next/src/components/**/*.spec.js'
	});
	const contents = await Promise.all(files.map(async (file) => {
		return {
			absolutePath: file,
			content: await tryReadFile(file, 'utf-8'),
		};
	}));

	const components = contents.reduce((components, { absolutePath, content }) => {
		const displayNameHandler = createDisplayNameHandler(absolutePath);
		return [
			...components,
			...parse(content, findComponents, handlers.concat(displayNameHandler))
				.map(documentation => ({ ...documentation, absolutePath })),
		];
	}, []);
	// console.log(require('util').inspect(components, { colors: true }));
	// console.log(generateExample(components[0], components[0].props));
	console.log(generateEntryFile(components));
}

main().catch(error => {
	setTimeout(function () {
		throw error;
	}, 0);
});
