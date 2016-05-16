import {dirname, basename} from 'path';
import {tryGlob} from './lib/fs';
import invariant from 'invariant';

export default async ({include, exclude = ''} = {}) => {
	invariant(
		typeof include === 'string',
		'Argument "include" must be of type string. Instead got "%s"',
		typeof include
	);

	invariant(
		typeof exclude === 'string' || Array.isArray(exclude),
		'Argument "exclude" must be of type string or Array. Instead got "%s"',
		typeof exclude
	);

	const files = await tryGlob(include, {ignore: exclude});

	return files.map(fullPath => {
		const path = dirname(fullPath);
		const filename = basename(fullPath);
		return {path, filename, fullPath};
	});
}
