var docgen = require('react-docgen');
var importsHandler = require('react-docgen-imports-handler').default;
var exportsHandler = require('react-docgen-exports-handler').default;
var { createDisplayNameHandler } = require('react-docgen-displayname-handler');

var fs = require('fs');

var filePath = '/home/zaubernerd/workspace/costadigital/seetours-next/src/components/atoms/button/index.js';

var source = fs.readFileSync(filePath);

var handlers = [
	docgen.handlers.componentDocblockHandler,
	docgen.handlers.defaultPropsHandler,
	docgen.handlers.propTypeHandler,
	docgen.handlers.propTypeCompositionHandler,
	docgen.handlers.propDocBlockHandler,
	docgen.handlers.flowTypeHandler,
	docgen.handlers.flowTypeDocBlockHandler,
	importsHandler,
	exportsHandler,
	createDisplayNameHandler(filePath),
];
console.log(handlers);

var documentation = docgen.parse(source, docgen.resolver.findAllExportedComponentDefinitions, handlers);
console.log(documentation);
