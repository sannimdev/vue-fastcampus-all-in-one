function asyncFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Passes!");
    }, 1000);
  });
}

describe("비동기", () => {
  test("done", done => {
    //done이 호출될 때까지 기다림
    asyncFn().then(r => {
      expect(r).toBe("Passes!");
      done(); // test함수의 종료 시점은 done()이 호출된 직후이다.
      /*
        test함수는 최대 5초까지만 기다리도록 설정돼 있다.
        그런데 done()구문 없이 끝나기만을 기다리다 보면 테스트는 결국 실패하게 된다.
        Timeout - Async callback was not invoked within the 5000 ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 5000 ms timeout specified by jest.setTimeout.Error:
        */
    });
  });
});
