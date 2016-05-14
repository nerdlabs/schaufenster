// React.createClass({
// 	render() {
//     	return (<i />);
//     }
// });

export default {
    "type": "CallExpression",
    "callee": {
        "type": "MemberExpression",
        "object": {
            "type": "Identifier",
            "name": "React"
        },
        "property": {
            "type": "Identifier",
            "name": "createClass"
        },
        "computed": false
    },
    "arguments": [
        {
            "type": "ObjectExpression",
            "properties": [
                {
                    "type": "ObjectMethod",
                    "method": true,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                        "type": "Identifier",
                        "name": "render"
                    },
                    "kind": "method",
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
                                            "name": "i"
                                        },
                                        "selfClosing": true
                                    },
                                    "closingElement": null,
                                    "children": [],
                                    "extra": {
                                        "parenthesized": true,
                                        "parenStart": 44
                                    }
                                }
                            }
                        ],
                        "directives": []
                    }
                }
            ]
        }
    ]
};
