// import * as React from 'react';
// import Label from '../label';
// import { myAction } from '../actions';

export default {
  "type": "File",
  "program": {
    "type": "Program",
    "sourceType": "module",
    "body": [
      {
        "type": "ImportDeclaration",
        "specifiers": [
          {
            "type": "ImportNamespaceSpecifier",
            "local": {
              "type": "Identifier",
              "name": "React"
            }
          }
        ],
        "importKind": "value",
        "source": {
          "type": "StringLiteral",
          "value": "react"
        }
      },
      {
        "type": "ImportDeclaration",
        "specifiers": [
          {
            "type": "ImportDefaultSpecifier",
            "local": {
              "type": "Identifier",
              "name": "Label"
            }
          }
        ],
        "importKind": "value",
        "source": {
          "type": "StringLiteral",
          "value": "../label"
        }
      },
      {
        "type": "ImportDeclaration",
        "specifiers": [
          {
            "type": "ImportSpecifier",
            "imported": {
              "type": "Identifier",
              "name": "myAction"
            },
            "local": {
              "type": "Identifier",
              "name": "myAction"
            }
          }
        ],
        "importKind": "value",
        "source": {
          "type": "StringLiteral",
          "value": "../actions"
        }
      }
    ]
  }
};
