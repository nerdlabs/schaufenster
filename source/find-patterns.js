import {stat as fsStat} from 'fs';
import denodeify from 'denodeify';

const stat = denodeify(fsStat);

async function tryStat(path) {
	try {
		return await stat(path);
	} catch (error) {
		return null;
	}
}

export default async (searchPath) => {
	if (typeof searchPath !== 'string') {
		throw new TypeError(
			'First argument searchPath must be of type string, received',
			typeof searchPath
		);
	}

	const pathStat = await tryStat(searchPath);
	
	if (!pathStat) {
		throw new RangeError(`File or directory '${searchPath} not found`);
	} else {
		return [];
	}
}
