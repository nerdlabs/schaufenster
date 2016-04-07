import {stat} from 'fs';
import denodeify from 'denodeify';

const fsStat = denodeify(stat);

async function tryStat(searchPath) {
	try {
		return await fsStat(searchPath);
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
