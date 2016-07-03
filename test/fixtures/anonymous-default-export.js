// export default function() {
//   return (<button />);
// }

export default {
  "type": "File",
  "program": {
    "type": "Program",
    "sourceType": "module",
    "body": [
      {
        "type": "ExportDefaultDeclaration",
        "declaration": {
          "type": "FunctionDeclaration",
          "id": null,
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
                    "parenStart": 37
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }
};
