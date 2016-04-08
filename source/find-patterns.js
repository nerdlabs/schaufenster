import {stat as fsStat} from 'fs';
import denodeify from 'denodeify';
import invariant from 'invariant';

const stat = denodeify(fsStat);

async function tryStat(path) {
	try {
		return await stat(path);
	} catch (error) {
		return null;
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

	return [];
}
