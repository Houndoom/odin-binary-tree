import Tree from './Tree';

let tree;

describe('Test buildTree', () => {
  test('buildTree odd number of values', () => {
    tree = Tree([1,2,3,4,5]);
    expect(tree.root.data).toBe(3);
  })
  
  test('buildTree event number of values', () => {
    tree = Tree([1,2,3,4]);
    expect(tree.root.data).toBe(3);
  })
  
  test('buildTree empty tree', () => {
    tree = Tree([])
    expect(tree.root).toBe(null);
  })
  
  test('buildTree single value', () => {
    tree = Tree([1])
    expect(tree.root.data).toBe(1);
  })

  test('Test tree structure', () => {
    tree = Tree([1,2,3,4]);
    expect(tree.root.data).toBe(3);
    expect(tree.root.left.data).toBe(2);
    expect(tree.root.right.data).toBe(4);
    expect(tree.root.left.left.data).toBe(1);
  })
})

describe('Tests for non-empty tree', () => {
  beforeEach(() => {
    tree = Tree([2,4,6,8]);
  })

  test('Insert test 1', () => {
    tree.insert(5);
    expect(tree.root.left.right.data).toBe(5);
  })

  test('Insert test 2', () => {
    tree.insert(1);
    expect(tree.root.left.left.left.data).toBe(1);
  })

  test('Insert existing value should do nothing', () => {
    tree.insert(2);
    expect(tree.root.left.left.data).toBe(2);
    expect(tree.root.left.right).toBe(null);
    expect(tree.root.left.data).toBe(4);
  })

  test('In order without function', () => {
    expect(tree.inorder().map(node => node.data)).toEqual([2, 4, 6, 8]);
  })

  test('In order with function', () => {
    expect(tree.inorder(i => i < 8).map(node => node.data)).toEqual([2, 4, 6]);
  })

  test('preorder without function', () => {
    expect(tree.preorder().map(node => node.data)).toEqual([6, 4, 2, 8]);
  })

  test('preorder with function', () => {
    expect(tree.preorder(i => i < 8).map(node => node.data)).toEqual([6, 4, 2]);
  })

  test('postorder without function', () => {
    expect(tree.postorder().map(node => node.data)).toEqual([2, 4, 8, 6]);
  })

  test('postorder with function', () => {
    expect(tree.postorder(i => i > 2).map(node => node.data)).toEqual([4, 8, 6]);
  })

  test('levelOrder without function', () => {
    expect(tree.levelOrder().map(node => node.data)).toEqual([6, 4, 8, 2]);
  })

  test('levelOrder with function', () => {
    expect(tree.levelOrder(i => i !== 6).map(node => node.data)).toEqual([4, 8, 2]);
  })

  test('find success', () => {
    expect(tree.find(2).data).toBe(2);
  })

  test('find non-existent value', () => {
    expect(tree.find(5)).toBe(undefined);
  })

  test('Delete leaf node', () => {
    tree.del(2);
    expect(tree.root.left.data).toBe(4);
    expect(tree.root.left.left).toBe(null);
  })

  test('Delete node with 1 child', () => {
    tree.del(4);
    expect(tree.root.left.data).toBe(2);
  })

  test('Delete root node with 2 children', () => {
    tree.del(6);
    expect(tree.root.data).toBe(8);
    expect(tree.root.left.data).toBe(4);
  })

  test('Delete non-root node with 2 children', () => {
    tree.insert(5);
    tree.insert(4.5);
    tree.insert(5.5);
    tree.del(4);
    expect(tree.root.left.data).toBe(4.5);
    expect(tree.root.left.left.data).toBe(2);
    expect(tree.root.left.right.data).toBe(5);
  })

  test('Delete node which does not exist should not do anything', () => {
    tree.del(5);
    expect(tree.root.data).toBe(6);
    expect(tree.root.left.data).toBe(4);
    expect(tree.root.right.data).toBe(8);
    expect(tree.root.left.left.data).toBe(2);
  })

  test('Depth', () => {
    expect(tree.depth(tree.root.left.left)).toBe(2);
    expect(tree.depth(tree.root)).toBe(0);
  })

  test('Height', () => {
    expect(tree.height(tree.root.left)).toBe(1);
    expect(tree.height(tree.root.left.left)).toBe(0);
  })

  test('isBalanced', () => {
    expect(tree.isBalanced()).toBe(true);
    tree.insert(5);
    tree.insert(4.5);
    tree.insert(5.5);
    expect(tree.isBalanced()).toBe(false);
  })

  test('rebalance', () => {
    tree.insert(5);
    tree.insert(4.5);
    tree.insert(5.5);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  })
})


