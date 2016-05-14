// function a() {
// 	return (<i />);
// }

export default {
    "type": "FunctionDeclaration",
    "id": {
        "type": "Identifier",
        "name": "a"
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
                            "name": "i"
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
};
