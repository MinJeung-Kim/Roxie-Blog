## 데이터 타입의 종류

자바스크립트의 데이터 타입은 크게 기본형(Primitive Types)과 참조형(Reference Types) 두 가지 범주로 나뉜다.

| 타입              | 종류                                                                            | 특징                 |
| ----------------- | ------------------------------------------------------------------------------- | -------------------- |
| 기본형(primitive) | number, string, boolean, null, undefined, Symbol(ES6 이후), BigInt(ES2020 이후) | 불변성(immutability) |
| 참조형(reference) | Object (Array, Function, Date, RegExp, Map, WeakMap, Set, WeakSet)              | 가변성(variability)  |

## 식별자와 변수

- 변수(variable) : 변할 수 있는 무언가.
- 식별자(identifier) : 어떤 데이터를 식별하는 데 사용하는 이름, 변수명.
  ![식별자와 변수](/images/posts/javascript/variable.png "식별자는 'fruits'이고 '과일'이라는 변수를 담는다.")

## 데이터 할당

> 데이터 영역의 주소 값을 변수 영역에서 사용하지 않고 있다면, **가비지 컬렉터(garbage collector)** 의 수거 대상이 된다.

```javascript
let apple; // 변수 선언
apple = "🍎"; // 데이터 할당
```

- 자유로운 데이터 변환과 효율적인 메모리 관리를 위해 변수영역과 데이터영역으로 분리한다.
  ![Memory](/images/posts/javascript/memory.png)

## 기본형과 참조형의 동작방식

### 기본형(Primitive Types)

기본형은 <span style="color:#2267b1">원시 타입</span>이라고도 하며, 기본형 변수는 실제 값을 직접 저장한다.
예를 들어, `let number = 5;`라고 하면, number 변수는 값 5를 직접 저장하지만, 컴퓨터 메모리 관리 측면에서 보면, 이 값 5는 메모리의 어딘가에 저장되어 있고, number 변수는 그 메모리 주소를 '참조'한다.

### 불변성(Immutability)

자바스크립트의 기본형은 불변 특성을 가지는데 예를 들어, `let fruit = "🍎";`에서 기존 문자열을 변경하는 것이 아니라 새로운 문자열 `🍎🍌`를 생성하고 `fruit`이 새 문자열을 참조하도록 변경하는 것이다.

기본형 변수가 불변이라는 것은 변수가 가리키는 데이터 값 자체가 불변이라는 의미로, 변수에 다른 값을 할당하는 것은 가능하다.

```javascript
let fruit = "🍎";
fruit = fruit + "🍌";
```

![Immutability](/images/posts/javascript/immutability.png)

두 변수가 같은 기본형 값을 가질 때, 한 변수의 값을 변경해도 다른 변수에는 영향을 주지 않는다. 이는 각 변수가 데이터의 독립적인 복사본을 가지기 때문이다.
예를 들어, `banana`의 값은 여전히 `🍎`인것을 알 수 있다. `apple`의 값 변경이 `banana`에 영향을 주지 않는다.

```javascript
let apple = "🍎"; // @5004
const banana = "🍎"; // @5004
apple = "🍈"; // @5003
```

![Immutability](/images/posts/javascript/immutability2.png)

불변성은 데이터의 신뢰성과 예측 가능성을 높이는 데 중요한 역할을 한다. 값이 예기치 않게 다른 곳에서 변경되지 않으므로, 프로그램의 버그를 줄이고 코드를 이해하기 쉽게 만든다.

### 참조형(Reference Types)

참조형은 <span style="color:#2267b1">객체 타입(Object Types)</span>이라고도 하며, 변수에 데이터의 메모리 주소를 저장한다. 참조형은 크기가 가변적이므로 복잡한 데이터 구조를 나타낼 수 있다.

### 가변성(Mutability)

> 참조형 데이터가 '가변값'이라고 설명할 때의 **가변**은 참조형 데이터 자체를 변경할 경우가 아니라 그 내부의 프로퍼티를 변경할 때만 성립 한다.

기본형은 복사한 원본의 데이터가 변경되지 않는 반면, 참조형은 복사데이터를 변경하면 원본데이터도 함께 변경되기때문에 가변형이라 할 수 있다.

예제에서, `obj1`은 객체(참조형)를 가리키고, `obj2`에 `obj1`를 할당하면, `obj1`이 가리키는 객체의 메모리 주소가 `obj2`에 복사된다.
이후 `obj1`의 프로퍼티를 변경하면 참조형 데이터가 참조(주소에 의한 전달)를 통해 전달되기 때문에 `obj2`도 변경사항을 공유한다.

```javascript
const a = "🍎";
let b = a;
const obj1 = { c: "🍎", d: "🍇" };
const obj2 = obj1;

b = "🍈";
obj2.c = "🍑";

console.log(
  ` a: ${a},  // 🍎
   b: ${b},  // 🍈
   obj1: ${JSON.stringify(obj1)}, // { c: '🍑', d: '🍇' }
   obj2: ${JSON.stringify(obj2)}  // { c: '🍑', d: '🍇' }
  `
);
```

![Immutability](/images/posts/javascript/mutability.png)

> 기본형은 값에 의한 전달이 이루어지며, 참조형은 참조(주소)에 의한 전달이 이루어진다.
