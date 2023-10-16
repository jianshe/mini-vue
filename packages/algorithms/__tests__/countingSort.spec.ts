import { countingSort } from "../src/counting-sort";
import { createNonSortedArray } from "../src/util";

describe("counting sort", () => {
  it("happy path", () => {
    const nonSortArray: any[] = createNonSortedArray(9);

    const sortedArray = countingSort(nonSortArray);
    console.log("sortedArray", sortedArray);
    expect(sortedArray).toMatchSnapshot();
  });
});
