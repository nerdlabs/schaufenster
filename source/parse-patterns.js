import invariant from 'invariant';

export default async (patterns) => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	return [];
};
