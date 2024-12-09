{
  const name: string = "John"; // 문자열 타입
  const age: number = 25; // 숫자 타입
  const isStudent: boolean = true; // 불리언 타입
  const nothing: null = null; // null 타입
  const notDefined: undefined = undefined; // undefined 타입

  const anyValue: any = "Hello"; // any 타입, 어떤 타입이든 될 수 있음
  const unknownValue: unknown = 42;
  // unknown 타입, 어떤 타입이든 될 수 있지만 런타임에 타입 검사해야 사용할 수 있음.
  if (typeof unknownValue === "number") {
    console.log(unknownValue + 1);
  }
}
