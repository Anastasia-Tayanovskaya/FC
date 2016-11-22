/*
The plugin changes true values to false values in case if it is variable assignment or variable declaration
*/

export default function(babel) {
	const { types: t } = babel;

	return {
		visitor: {
			VariableDeclarator(path) {
				const declaration = path.node.init;
				if (!declaration || declaration.type !== "BooleanLiteral") {
					return;
				}

				declaration.value = false;
			},
			AssignmentExpression(path) {
				if (path.node.right && path.node.right.type === "BooleanLiteral") {
					path.node.right.value = false;
				}
			}
		}
	};
};