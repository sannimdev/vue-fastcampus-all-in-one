import { addOne } from "../calc.js";

describe(addOne, () => {
  beforeAll(() => {
    console.log("beforeAll");
  });
  afterAll(() => {
    console.log("afterAll");
  });
  beforeEach(() => {
    console.log("beforeEach");
  });
  afterEach(() => {
    console.log("afterEach");
  });

  test("1", () => {
    console.log("test1");
  });
  test("2", () => {
    console.log("test2");
  });
});
