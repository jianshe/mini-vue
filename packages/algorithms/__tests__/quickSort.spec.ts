import { quickSort } from "../src/quick-sort";
import { createNonSortedArray } from "../src/util";

describe("quick sort", () => {
  it("happy path", () => {
    const nonSortArray: any[] = createNonSortedArray(9);

    const sortedArray = quickSort(nonSortArray);
    console.log("sortedArray", sortedArray);
    expect(sortedArray).toMatchSnapshot();
  });
});
