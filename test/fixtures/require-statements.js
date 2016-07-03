// var React = require('react');
// var Label = require('../label');
// var myAction = require('../actions').myAction;

export default {
  "type": "File",
  "program": {
    "type": "Program",
    "sourceType": "module",
    "body": [
      {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "React"
            },
            "init": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "require"
              },
              "arguments": [
                {
                  "type": "StringLiteral",
                  "value": "react"
                }
              ]
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "Label"
            },
            "init": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "require"
              },
              "arguments": [
                {
                  "type": "StringLiteral",
                  "value": "../label"
                }
              ]
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "myAction"
            },
            "init": {
              "type": "MemberExpression",
              "object": {
                "type": "CallExpression",
                "callee": {
                  "type": "Identifier",
                  "name": "require"
                },
                "arguments": [
                  {
                    "type": "StringLiteral",
                    "value": "../actions"
                  }
                ]
              },
              "property": {
                "type": "Identifier",
                "name": "myAction"
              },
              "computed": false
            }
          }
        ],
        "kind": "var"
      }
    ]
  }
};
