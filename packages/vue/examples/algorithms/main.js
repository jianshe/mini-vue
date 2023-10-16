import { countingSort } from "../../dist/guide-mini-vue.ejs.js";

const nonSortArray = [9, 6, 8, 23, 98, 22, 10];

const sortedArray = countingSort(nonSortArray);
console.log("sortedArray", sortedArray);
