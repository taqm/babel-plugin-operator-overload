module.exports = ({ types: t }) => ({
  name: 'babel-plugin-operator-overload',
  visitor: {
    LabeledStatement(parentPath) {
      if (parentPath.node.label.name !== 'opol') {
        return;
      }

      parentPath.traverse({
        BinaryExpression(path) {
          if (path.node.opolMarked) return;

          const { left, right, operator } = path.node;
          const leftId = t.identifier('left');
          const rightId = t.identifier('right');

          const leftOp = t.memberExpression(leftId, t.stringLiteral(operator), true);
          const overloaded = t.callExpression(leftOp, [rightId]);
          const original = t.binaryExpression(operator, leftId, rightId);

          // ここで追加するBinaryExpressionも処理の対象となってしまうため
          // 印をつけて処理を行わないようにする
          original.opolMarked = true;

          const fnc = t.callExpression(
            t.arrowFunctionExpression([leftId, rightId],
              t.conditionalExpression(leftOp, overloaded, original)),
            [left, right],
          );
          path.replaceWith(fnc);
        },
      });
      // ラベルは削除しておく
      parentPath.replaceWith(parentPath.node.body);
    },
  },
});
