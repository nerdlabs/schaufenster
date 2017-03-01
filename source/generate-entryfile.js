import invariant from 'invariant';
import generate from 'babel-generator';
import * as t from 'babel-types';

export default function generateEntryFile(components = []) {
    invariant(
        Array.isArray(components),
        'Argument "components" should be of type array. Instead got: "%s"',
        typeof components
    );

    const imports = components.map((component, i) => {
        return t.importDeclaration(
            [t.importSpecifier(
                t.identifier(`${component.exports.name}_${i}`),
                t.identifier(component.exports.name)
            )],
            t.stringLiteral(component.absolutePath)
        );
    });

    const ast = t.program([
        ...imports,
        t.expressionStatement(
            t.assignmentExpression(
                '=',
                t.memberExpression(
                    t.identifier('global'),
                    t.identifier('__schaufenster__')
                ),
                t.objectExpression(
                    imports.map(({ specifiers, source }) => t.objectProperty(
                        t.stringLiteral(source.value),
                        t.identifier(specifiers[0].local.name)
                    ))
                )
            )
        )
    ]);

    return generate(ast).code;
}
