import { mergeSort, removeDuplicates } from './arrayFunc.js';

test('mergeSort empty array', () => {
  expect(mergeSort([])).toEqual([]);
})

test('mergeSort array', () => {
  expect(mergeSort([5, 6, 1, 2, 4, 8, 7])).toEqual([1, 2, 4, 5, 6, 7, 8]);
})

test('removeDuplicates', () => {
  expect(removeDuplicates([1, 1, 1, 3, 2, 2])).toEqual([1, 3, 2]);
})