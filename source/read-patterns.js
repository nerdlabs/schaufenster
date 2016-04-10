import {join} from 'path';
import invariant from 'invariant';
import {zipWith} from 'lodash';
import {tryReadFile, tryReaddir} from './lib/fs';

const isPackage = file => file === 'package.json';
const isIndex = file => file === 'index.js';
const isReadme = file => file.toLowerCase() === 'readme.md';

const readFileInDir = (basePath, fileName) => {
	if (!fileName) {
		return null;
	}
	const path = join(basePath, fileName);
	return tryReadFile(path, 'utf-8');
};

const tryParse = json => {
	try {
		return JSON.parse(json);
	} catch (error) {
		return null;
	}
};

export default async (patterns) => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	const readPatternContents = patterns.map(({path}) => tryReaddir(path));
	const contents = await Promise.all(readPatternContents);

	const readPatterns = zipWith(patterns, contents, async (pattern, files) => {
		const [packageFile, readmeFile] = await Promise.all([
			readFileInDir(pattern.path, files.find(isPackage)),
			readFileInDir(pattern.path, files.find(isReadme))
		]);

		const parsedPackage = tryParse(packageFile);
		if (!parsedPackage) {
			throw new Error(
				`Could not parse package.json for ${pattern.id} in ${pattern.path}`
			);
		}

		const main = parsedPackage.main;
		if (main && !files.includes(main)) {
			throw new Error(
				`Entry file "${main}" for ${pattern.id} does not exist in ${pattern.path}`
			);
		}

		// TODO: instead of parsing the package.json file and looking for main/index
		// consider using require.resolve to make it behave exactly like node.
		// caveat: can't mock fs for require.resolve!
		const index = files.find(isIndex);
		const entryFile = await readFileInDir(pattern.path, main || index);
		// TODO: don't fail if no entry file was found because some patterns might
		// only have a readme.md file.
		if (!entryFile) {
			throw new Error(
				`Could not find an entry file for ${pattern.id} in ${pattern.path}`
			);
		}

		return {
			...pattern,
			files,
			entry: entryFile,
			package: packageFile,
			readme: readmeFile
		};
	});

	return await Promise.all(readPatterns);
};
