// class Button extends React.Component {
//     render() {
//         return (<button />);
//     }
// }

export default {
	"type": "ClassDeclaration",
	"id": {
		"type": "Identifier",
		"name": "Button"
	},
	"superClass": {
		"type": "MemberExpression",
		"object": {
			"type": "Identifier",
			"name": "React"
		},
		"property": {
			"type": "Identifier",
			"name": "Component"
		},
		"computed": false
	},
	"body": {
		"type": "ClassBody",
		"body": [
			{
				"type": "ClassMethod",
				"computed": false,
				"key": {
					"type": "Identifier",
					"name": "render"
				},
				"static": false,
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
										"name": "button"
									},
									"selfClosing": true
								},
								"closingElement": null,
								"children": [],
								"extra": {
									"parenthesized": true,
									"parenStart": 63
								}
							}
						}
					],
					"directives": []
				}
			}
		]
	}
};
