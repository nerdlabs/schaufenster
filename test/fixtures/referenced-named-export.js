// function Button() {
// 	return (<button />);
// }
//
// export { Button };

export default {
  "type": "File",
  "program": {
    "type": "Program",
    "sourceType": "module",
    "body": [
      {
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "Button"
        },
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ReturnStatement",
              "argument": {
                "type": "JSXElement",
                "openingElement": {
                  "type": "JSXOpeningElement",
                  "attributes": [],
                  "name": {
                    "type": "JSXIdentifier",
                    "name": "button"
                  },
                  "selfClosing": true
                },
                "closingElement": null,
                "children": [],
                "extra": {
                  "parenthesized": true,
                  "parenStart": 28
                }
              }
            }
          ],
          "directives": []
        }
      },
      {
        "type": "ExportNamedDeclaration",
        "declaration": null,
        "specifiers": [
          {
            "type": "ExportSpecifier",
            "local": {
              "type": "Identifier",
              "name": "Button"
            },
            "exported": {
              "type": "Identifier",
              "name": "Button"
            }
          }
        ],
        "source": null,
        "exportKind": "value"
      }
    ]
  }
};
