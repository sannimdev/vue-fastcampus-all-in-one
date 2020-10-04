import { addOne } from "../calc.js";

test("첫 번째 테스트", () => {
  expect(2).toBe(2);
});

test("인수가 숫자인 경우", () => {
  /*
expect(함수실행).toBe(기대되는 값)
테스트 의도
그러나 테스트는 올바른 값을 입력하기보다는 보통은 틀린 값을 대입하여 테스트에서 통과되지 않도록 작성하는 것이 일반적
예시: expect(addOne(2)).toBe(3);
*/
  expect(addOne(2)).toBe(3);
  expect(addOne(7)).toBe(8);
});

test("인수가 문자인 경우에는?", () => {
  expect(addOne("2")).toBe(3);
});
