import Tree from "react-d3-tree";
import { BinaryTree } from "./models/BinaryTree";

function App() {
  const tree = new BinaryTree();

  const numbers = [50, 30, 70, 20, 40, 60, 80];

  numbers.forEach((n) => tree.insert(n));

  console.log("Preorder:", tree.preorder(tree.root));
  console.log("Inorder:", tree.inorder(tree.root));
  console.log("Postorder:", tree.postorder(tree.root));

  console.log("¿Existe 60?", tree.contains(60));
  console.log("¿Existe 100?", tree.contains(100));

  const convertToD3 = (node: any): any => {
    if (!node) return null;

    return {
      name: node.value.toString(),
      children: [convertToD3(node.left), convertToD3(node.right)].filter(Boolean),
    };
  };

  const d3Data = convertToD3(tree.root);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Binary Tree</h1>

      <Tree
        data={d3Data}
        orientation="vertical"
        translate={{ x: 400, y: 100 }}
      />
    </div>
  );
}

export default App;