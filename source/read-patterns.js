import {tryReaddir} from './lib/fs';
import {zipWith} from 'lodash';
import invariant from 'invariant';

export default async (patterns) => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	const readPatternContents = patterns.map(({path}) => tryReaddir(path));
	const patternFiles = await Promise.all(readPatternContents);

	return zipWith(patterns, patternFiles, (pattern, files) => {
		return {...pattern, files};
	});
};
