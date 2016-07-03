import invariant from 'invariant';
import { tryReadFile } from './lib/fs';
import {parse} from 'babylon';

const babylonOptions = {
	sourceType: 'module',
	plugins: [
		'jsx',
		'flow',
		'asyncFunctions',
		'classConstructorCall',
		'doExpressions',
		'trailingFunctionCommas',
		'objectRestSpread',
		'decorators',
		'classProperties',
		'exportExtensions',
		'exponentiationOperator',
		'asyncGenerators',
		'functionBind',
		'functionSent'
	]
};

export default async (filePath) => {
    invariant(
		typeof filePath === 'string',
		'Argument "filePath" must be of type string. Instead got "%s"',
		typeof filePath
	);

    const fileBuffer = await tryReadFile(filePath);
    if (!fileBuffer) {
        throw new Error(`File (${filePath}) does not exist!`);
    }

    const content = fileBuffer.toString('utf-8');
    const ast = parse(content, babylonOptions);

    return {content, ast};
}
