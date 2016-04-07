export default async (searchPath) => {
	if (!searchPath) {
		throw new TypeError('Missing first argument searchPath');
	}
	throw new RangeError(`File or directory '${searchPath} not found`);
}
