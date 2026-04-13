import { TreeNode } from "./TreeNode";

export class BinaryTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(value: number): void {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) {
                return;
            }

            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    contains(value: number): boolean {
        let current = this.root;

        while (current !== null) {
            if (value === current.value) return true;

            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    preorder(node: TreeNode | null, result: number[] = []): number[] {
        if (node === null) return result;

        result.push(node.value);
        this.preorder(node.left, result);
        this.preorder(node.right, result);

        return result;
    }

    inorder(node: TreeNode | null, result: number[] = []): number[] {
        if (node === null) return result;

        this.inorder(node.left, result);
        result.push(node.value);
        this.inorder(node.right, result);

        return result;
    }

    postorder(node: TreeNode | null, result: number[] = []): number[] {
        if (node === null) return result;

        this.postorder(node.left, result);
        this.postorder(node.right, result);
        result.push(node.value);

        return result;
    }
}