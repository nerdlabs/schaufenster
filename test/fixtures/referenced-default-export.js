// function Button () {
//   return (<button />);
// }
//
// export default Button;

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
                  "parenStart": 30
                }
              }
            }
          ],
          "directives": []
        }
      },
      {
        "type": "ExportDefaultDeclaration",
        "declaration": {
          "type": "Identifier",
          "name": "Button"
        }
      }
    ]
  }
};
