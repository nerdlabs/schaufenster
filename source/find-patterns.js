import {dirname, resolve} from 'path';
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

	const absolutePath = resolve(searchPath);

	const patterns = await tryGlob(`${searchPath}/**/package.json`);

	return patterns.map(pattern => {
		const path = dirname(pattern);
		// resolve removes the trailing slash
		// so we use path.length + 1 to account for it
		const id = resolve(path).slice(absolutePath.length + 1);
		return {path, id};
	});
}
