JavaScript에서 얕은 복사(shallow copy)와 깊은 복사(deep copy)는 객체의 복사 방식에 따른 차이를 나타낸다.

## 차이점

| 방식      | 참조 공유 | 복사 깊이                         | 성능                      |
| --------- | --------- | --------------------------------- | ------------------------- |
| 얕은 복사 | 공유      | 객체의 첫 번째 수준의 속성만 복사 | 시간과 메모리 사용의 감소 |
| 깊은 복사 | 공유❌    | 모든 중첩된 객체까지 복사         | 시간과 메모리 사용의 증가 |

이러한 차이점은 객체의 구조와 필요한 복사 방식에 따라 중요하게 고려되어야 한다. 중첩된 객체나 배열이 있는 복잡한 객체의 경우, 깊은 복사가 더 적합할 수 있는 반면, 단순한 객체에 대해서는 얕은 복사가 더 효율적일 수 있다.

## 얉은 복사(Shallow Copy)

얕은 복사는 객체의 최상위 수준의 속성만 복사한다. 이 경우, 복사된 객체의 속성 중 하나가 다른 객체를 참조하고 있다면, 원본 객체와 복사된 객체는 그 참조된 객체를 공유하게 된다.

Object.assign({}, object) 또는 스프레드 연산자 {...object}를 사용하여 얕은 복사를 수행할 수 있다.

### Object 얉은 복사 방법

#### 1. Object.assign()

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);
```

#### 2. Spread Syntax

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };
```

### Array 얉은복사 방법

#### 1. Array.prototype.slice()

```javascript
const original = [1, 2, 3];
const copy = original.slice();
```

#### 2. Array.from()

```javascript
const original = [1, 2, 3];
const copy = Array.from(original);
```

## 깊은 복사(Deep Copy)

깊은 복사는 객체의 모든 수준의 속성을 복사하여, 원본 객체와 전혀 독립된 복사본을 생성한다. 이를 통해 원본 객체에 있는 중첩된 객체들도 새로운 객체로 복사된다.

### JSON.stringify()와 JSON.parse()

이 방법은 일부 데이터 타입(Function, Date 객체, undefined, Infinity, NaN, RegExp 객체 등)을 복사하지 못할 수 있다.

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = JSON.parse(JSON.stringify(original));
```

### lodash 라이브러리의 \_.cloneDeep()

```javascript
const _ = require("lodash");

const original = { a: 1, b: { c: 2 } };
const copy = _.cloneDeep(original);
```

### 재귀함수 사용

```javascript
function deepCopy(obj, hash = new WeakMap()) {
  // 순환 참조를 처리하기 위한 hash 맵
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 날짜 객체 처리
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 배열과 일반 객체 처리
  if (typeof obj === "object" && obj !== null) {
    const result = Array.isArray(obj) ? [] : {};
    hash.set(obj, result);

    for (const key in obj) {
      // 객체의 모든 속성에 대해 깊은 복사 수행
      result[key] = deepCopy(obj[key], hash);
    }

    return result;
  }

  // 기본 데이터 타입 및 함수는 그대로 반환
  return obj;
}

// 사용 예제
const original = { a: 1, b: { c: 2, d: new Date() }, e: [1, 2, 3] };
const copy = deepCopy(original);

console.log(copy); // 깊은 복사된 객체 출력
```
