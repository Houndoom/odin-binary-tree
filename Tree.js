import Node from './Node';
import { mergeSort, removeDuplicates } from './arrayFunc';

const Tree = (initArray) => {

  const _buildTree = (array) => {
    if (array.length === 0) return null;
    else {
      const sortedArray = removeDuplicates(mergeSort(array));
      const middle = Math.floor(sortedArray.length / 2);
      return Node(sortedArray[middle], _buildTree(sortedArray.slice(0, middle)), _buildTree(sortedArray.slice(middle + 1)))
    }
  }

  let root = _buildTree(initArray);

  const _find = (value, node) => {
    if (!node) return;
    if (node.data === value) return node;
    else if (node.data > value) return _find(value, node.left);
    else if (node.data < value) return _find(value, node.right); 
  }

  const find = (value) => _find(value, root);

  const _insert = (value, node = root) => {
    if (value < node.data) {
      if (node.left) _insert(value, node.left);
      else node.left = Node(value, null, null);
    } else if (node.data < value) {
      if (node.right) _insert(value, node.right);
      else node.right = Node(value, null, null);
    } else return;
  }

  const insert = (value) => _insert(value, root);

  const _del = (value, node) => {
    if (!node) return;
    if (node.data === value) {
      if(!node.right && !node.left) return null;
      else if (!node.right) return node.left;
      else if (!node.left) return node.right;
      else { /* If both children are present, replace node with inorder successor */
        let previousNode; 
        let searchNode = node.right;
        if (!searchNode.left) { /* If right child has no left children, it is the inorder successor */
          node.data = searchNode.data;
          node.right = searchNode.right;
          return(node);
        } /* Otherwise search for the inorder successor by recursively finding left children */
        while (searchNode.left) {
          previousNode = searchNode;
          searchNode = searchNode.left
        }
        node.data = searchNode.data;
        previousNode.left = searchNode.right
        return(node);
      }
    } else if (node.data > value) {
      node.left = _del(value, node.left);
      return node;
    } else {
      node.right = _del(value, node.right);
      return node;
    }
  }

  const del = (value) => {
    root = _del(value, root);
  }

  const _testFunc = (func, node) => {
    if (func && !func(node.data)) return []; // If func is defined and node.data returns false, don't include it
    else return [node];
  }

  const _inorder = (func, node) => {
    return node ? [..._inorder(func, node.left), ..._testFunc(func, node), ..._inorder(func, node.right)] : []; // If node is not defined return empty array;
  }

  const inorder = (func) => _inorder(func, root);

  const _preorder = (func, node) => {
    return node ? [..._testFunc(func, node), ..._preorder(func, node.left), ..._preorder(func, node.right)] : []; // If node is not defined return empty array;
  }

  const preorder = (func) => _preorder(func, root);

  const _postorder = (func, node) => {
    return node ? [..._postorder(func, node.left), ..._postorder(func, node.right), ..._testFunc(func, node)] : []; // If node is not defined return empty array;
  }

  const postorder = (func) => _postorder(func, root);

  const levelOrder = (func) => {
    let queue = [root]; 
    let order = [];
    while (queue.length > 0) { // Every time next node is removed from queue, queue up its children
      let node = queue.pop();
      if(node.left) queue.unshift(node.left);
      if(node.right) queue.unshift(node.right);
      order = [...order, ..._testFunc(func, node)];
    }
    return order;
  }

  const height = (node) => {
    if (!node) return -1;
    return Math.max(height(node.left), height(node.right)) + 1;
  }

  const depth = (node) => {
    if (!root) return null;
    let currentNode = root;
    let length = 0;
    const value = node.data;
    while (currentNode.data !== value) { // Traverse tree until node data value matches
      if (currentNode.data > value) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else { // If currentNode.data > value (i.e. node should be left of currentNode) but currentNode has no left, node is not in the tree
          return null;
        }
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          return null;
        }
      }
      length += 1;
    }
    return length;
  }

  const isBalanced = () => {
    const nodeList = levelOrder();
    for (let node of nodeList) {
      if (node.left && node.right) { // Check balance only if both left and right exist
        if (Math.abs(height(node.left) - height(node.right)) > 1) {
          return false; // Straightaway return false if a counterexample is found
        }
      }
    }
    return true;
  }

  const rebalance = () => {
    const nodeList = levelOrder();
    root = _buildTree(nodeList);
  }

  return { root, find, insert, inorder, preorder, postorder, del, levelOrder, height, depth, isBalanced, rebalance };
}

export default Tree;