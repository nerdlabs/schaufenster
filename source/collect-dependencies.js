import invariant from 'invariant';
import traverse from 'babel-traverse';

export default function (ast) {
    invariant(
        ast && typeof ast === 'object',
        'Argument "ast" should be of type object. Instead got "%s"',
        typeof ast
    )

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration({ node: { specifiers, source } }) {
            const names = specifiers.map(specifier => {
                const imported = specifier.type === 'ImportNamespaceSpecifier' ?
                    '*' :
                    specifier.type === 'ImportDefaultSpecifier' ?
                        'default' :
                        specifier.imported.name;
                return {
                    [imported]: specifier.local.name
                };
            });
            dependencies.push({
                source: source.value,
                names
            });
        },

        CallExpression({ node: { callee, arguments: [source] } }) {
            if (callee.name === 'require' && source.type === 'StringLiteral') {
                dependencies.push({ source: source.value });
            }
        }
    });

    return dependencies;
};
