import {readdir as readdirFs} from 'fs';
import denodeify from 'denodeify';
import {zipWith} from 'lodash';

const readdir = denodeify(readdirFs);

const tryReaddir = async path => {
	try {
		return await readdir(path);
	} catch (error) {
		return null;
	}
};

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
