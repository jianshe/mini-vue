import { Compare, defaultCompare, swap } from "./util";

function quick(array, left, right, comparedFn = defaultCompare) {
  let index;
  if (array.length > 1) {
    index = partial(array, left, right, comparedFn);
    if (left < index - 1) {
      quick(array, left, index - 1, comparedFn);
    }
    if (right > index) {
      quick(array, index, right, comparedFn);
    }
  }
  return array;
}

function partial(array, left, right, compareFn) {
  let pivot = array[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

export function quickSort(array: any, comparedFn = defaultCompare) {
  return quick(array, 0, array.length - 1, comparedFn);
}
