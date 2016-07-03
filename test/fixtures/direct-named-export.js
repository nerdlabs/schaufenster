// export function Button() {
// 	return (<button />);
// }

export default {
  "type": "File",
  "program": {
    "type": "Program",
    "sourceType": "module",
    "body": [
      {
        "type": "ExportNamedDeclaration",
        "specifiers": [],
        "source": null,
        "declaration": {
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
                    "parenStart": 35
                  }
                }
              }
            ],
            "directives": []
          }
        },
        "exportKind": "value"
      }
    ]
  }
};
