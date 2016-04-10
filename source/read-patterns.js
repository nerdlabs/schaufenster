import {tryReaddir} from './lib/fs';
import {zipWith} from 'lodash';

export default async (patterns) => {
	if (typeof patterns === 'undefined') {
		throw new Error('No arguments provided');
	}
	const readPatternContents = patterns.map(({path}) => tryReaddir(path));
	const patternFiles = await Promise.all(readPatternContents);
	return zipWith(patterns, patternFiles, (pattern, files) => {
		return {...pattern, files};
	});
};
