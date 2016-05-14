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
                    "type": "Identifier",
					"name": "d"
                }
            }
        ],
        "directives": []
    }
};
