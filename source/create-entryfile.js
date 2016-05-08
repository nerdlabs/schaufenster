import invariant from 'invariant';

const header = 'window.__schaufenster__ = {};';

export default patterns => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	const exports = patterns.map(({id, path, entry}) => {
		const file = `${path}/${entry}`;
		return `window.__schaufenster__['${id}'] = require('${file}');`;
	});

	return `${header}\n${exports.join('\n')}`;
};
