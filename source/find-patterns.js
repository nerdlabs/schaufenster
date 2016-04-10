import {dirname} from 'path';
import {tryStat, tryGlob} from './lib/fs';
import invariant from 'invariant';

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
