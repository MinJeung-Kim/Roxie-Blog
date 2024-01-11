## 데이터 타입의 종류

| 타입              | 종류                                                                            | 특징                 |
| ----------------- | ------------------------------------------------------------------------------- | -------------------- |
| 기본형(primitive) | number, string, boolean, null, undefined, Symbol(ES6 이후), BigInt(ES2020 이후) | 불변성(immutability) |
| 참조형(reference) | Object (Array, Function, Date, RegExp, Map, WeakMap, Set, WeakSet)              | 가변성(variability)  |

## 식별자와 변수

- 변수(variable) : 변할 수 있는 무언가.
- 식별자(identifier) : 어떤 데이터를 식별하는 데 사용하는 이름, 변수명.
  ![식별자와 변수](/images/posts/javascript/variable.png "식별자는 'fruits'이고 '과일'이라는 변수를 담는다.")

## 데이터 할당

> 데이터 영역의 주소 값을 변수 영역에서 사용하지 않고 있다면, *가비지 컬렉터(garbage collector)*의 수거 대상이 된다.

```typescript
let apple; // 변수 선언
apple = "🍎"; // 데이터 할당
```

- 자유로운 데이터 변환과 효율적인 메모리 관리를 위해 변수영역과 데이터영역으로 분리한다.
  ![Memory](/images/posts/javascript/memory.png)
