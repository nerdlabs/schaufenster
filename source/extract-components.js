import invariant from 'invariant';
import traverse from 'babel-traverse';
import * as t from 'babel-types';
import isComponent from './is-component';

export default function (ast) {
    invariant(
        ast && typeof ast === 'object',
        'Argument "ast" should be of type object. Instead got "%s"',
        typeof ast
    );

    const exports = [];
    const addCandidate = (node, type, name) => {
        if (isComponent(node.init || node)) {
            const displayName = t.isIdentifier(node.id) ? node.id.name :
                name !== type ? name : null;
            exports.push({ displayName,  export: { type, name } });
        }
    };

    traverse(ast, {
        ExportDefaultDeclaration(path) {
            if (t.isIdentifier(path.node.declaration)) {
                const candidate = path.scope.getBinding(path.node.declaration.name);
                addCandidate(candidate.path.node, 'default', 'default');
            } else {
                addCandidate(path.node.declaration, 'default', 'default');
            }
        },
        ExportNamedDeclaration(path) {
            if (path.node.specifiers.length) {
                path.node.specifiers.forEach(({ local: { name } }) => {
                    const candidate = path.scope.getBinding(name);
                    addCandidate(candidate.path.node, 'named', name);
                });
            } else if (t.isVariableDeclaration(path.node.declaration)) {
                path.node.declaration.declarations.forEach(declaration => {
                    addCandidate(declaration, 'named', declaration.id.name);
                });
            } else {
                const { id: { name } } = path.node.declaration;
                addCandidate(path.node.declaration, 'named', name);
            }
        }
    });

    return exports;
};
