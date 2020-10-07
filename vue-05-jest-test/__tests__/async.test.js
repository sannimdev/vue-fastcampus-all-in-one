function asyncFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Passes!");
    }, 6000);
  });
}

describe("비동기", () => {
  test("async/await", async () => {
    const r = await asyncFn();
    expect(r).toBe("Passes!");
  }, 10000); // timeout의 기본값은 5000이지만, 임의로 늘릴 수도 있다.
});
