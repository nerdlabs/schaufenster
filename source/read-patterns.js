import {join} from 'path';
import path from 'path';

import invariant from 'invariant';
import {zipWith} from 'lodash';
import nodeResolve from 'resolve';
import denodeify from 'denodeify';
import {tryReadFile, tryReaddir} from './lib/fs';

const isReadme = file => file.toLowerCase() === 'readme.md';

const resolve = denodeify(nodeResolve, (err, res, pkg) => [err, [res, pkg]]);

const readFileInDir = (basePath, fileName) => {
	if (!fileName) {
		return null;
	}
	const path = join(basePath, fileName);
	return tryReadFile(path, 'utf-8');
};

const tryResolve = async path => {
	try {
		return await resolve(path, {packageFilter: pkg => pkg || {}});
	} catch (error) {
		return [];
	}
};

export default async (patterns) => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	const listFiles = patterns.map(({path}) => tryReaddir(path));

	const readPatterns = zipWith(patterns, listFiles, async (pattern, listFiles) => {
		const absolutePath = path.resolve(pattern.path);
		const [files, [fullEntryPath, packageFile]] = await Promise.all([
			listFiles,
			tryResolve(absolutePath)
		]);
		const readmeFile = await readFileInDir(pattern.path, files.find(isReadme));
		const entry = fullEntryPath ?
			fullEntryPath.slice(absolutePath.length + 1) :
			null;

		if (!entry || !files.includes(entry)) {
			throw new Error(
				`Entry file "${entry}" for ${pattern.id} does not exist in ${pattern.path}`
			);
		} else if (!entry && !files.includes('index.js')) {
			throw new Error(
				`Could not find an entry file for ${pattern.id} in ${pattern.path}`
				);
		}

		return {
			...pattern,
			files,
			entry: entry || 'index.js',
			package: packageFile,
			readme: readmeFile
		};
	});

	return await Promise.all(readPatterns);
};
