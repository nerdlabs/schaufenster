import {stat as fsStat} from 'fs';
import {dirname} from 'path';
import denodeify from 'denodeify';
import invariant from 'invariant';
import nodeGlob from 'glob';

const stat = denodeify(fsStat);
const glob = denodeify(nodeGlob);

async function tryStat(path) {
	try {
		return await stat(path);
	} catch (error) {
		return null;
	}
}

async function tryGlob(pattern) {
	try {
		return await glob(pattern);
	} catch (error) {
		return [];
	}
}

export default async (searchPath) => {
	invariant(
		typeof searchPath === 'string',
		'First argument must be of type string. Instead got "%s"',
		typeof searchPath
	);

	const stats = await tryStat(searchPath);

	if (stats === null || !stats.isDirectory()) {
		throw new RangeError(
			`Path "${searchPath}" does not exist or is not a directory`
		);
	}

	const patterns = await tryGlob(`${searchPath}/**/package.json`);
	return patterns.map(pattern => {
		return {
			path: dirname(pattern)
		};
	});
}
