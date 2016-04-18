import path from 'path';
import invariant from 'invariant';

const getRecursive = (tree, [head, ...tail]) => {
	return head === undefined ?
		tree :
		getRecursive(tree.get(head), tail);
};

export default patterns => {
	invariant(
		Array.isArray(patterns),
		'Argument must be of type Array. Instead got "%s"',
		typeof patterns
	);

	return patterns.reduce((patternTree, pattern) => {
		const parts = pattern.id.split(path.sep);
		return parts.reduceRight((partialTree, part, i) => {
			const previousTree = getRecursive(patternTree, parts.slice(0, i));
			return new Map(previousTree).set(part, partialTree);
		}, pattern);
	}, new Map());
};
