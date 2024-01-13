> 실행 컨텍스트를 이해하는 것은 JavaScript의 스코핑, 호이스팅, 클로저 등의 개념을 깊이 이해하는 데 필수적이며, 이는 고급 JavaScript 프로그래밍 능력의 기반을 형성한다.

## 실행 컨텍스트란?

실행 컨텍스트(Execution Context)는 JavaScript 코드가 실행되고 관리되는 환경을 말한다.  
JavaScript 엔진이 코드를 실행하기 위해 필요한 모든 정보를 담고 있다. 이는 전역 실행 컨텍스트와 함수 실행 컨텍스트로 나뉘며, 각 컨텍스트는 변수, 함수 선언, this 값 등을 관리한다.

![Execution](/images/posts/javascript/execution.png)

### 실행 컨텍스트의 실행 순서

1. JavaScript 엔진은 실행 컨텍스트 스택를 사용하여 실행 컨텍스트를 관리한다.
2. 스택은 코드의 실행 순서를 제어함.
3. 전역 실행 컨텍스트는 프로그램이 시작될 때 스택에 **가장 먼저 push**됨.
4. 새로운 함수가 호출될 때마다 해당 함수의 실행 컨텍스트가 스택에 push됨.
5. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트는 스택에서 pop.  
   ![Execution](/images/posts/javascript/execution2.png)

## 전역 실행 컨텍스트

전역 실행 컨텍스트(Global Execution Context)는 JavaScript 코드가 처음 실행될 때 생성되는 기본 컨텍스트로, 각 JavaScript 환경(브라우저 또는 Node.js)에는 하나의 전역 실행 컨텍스트만 존재한다.

전역 객체(window in the browser, global in Node.js)와 관련이 있으며, 전역 변수와 함수는 이 전역 객체의 속성과 메소드로 취급된다.

## 함수 실행 컨텍스트

함수 실행 컨텍스트(Function Execution Context)는 함수의 로컬 변수, 매개변수, this 값 등 함수의 실행에 필요한 모든 정보를 포함하며, 활성화되는 시점에 `VariableEnvironment`, `LexicalEnvironment`, `ThisBinding`의 세 가지 정보를 수집한다.
![Execution](/images/posts/javascript/execution3.png "참고: [10분 테코톡] 💙하루의 실행 컨텍스트 (https://www.youtube.com/watch?v=EWfujNzSUmw)")

### VE & LE

자바스크립트 엔진이 수집하는 컨텍스트 관련 코드들을 실행하는 데 필요한 환경 정보로 JavaScript의 스코프와 실행 컨텍스트 관리에 핵심적인 역할을 하며, 각각 코드의 렉시컬 구조와 함수 호출 시의 초기 상태를 반영하는 방식으로 사용한다.

| 환경                 | 정의                                                                       | 구성 요소                                                                 | 역할                                                                 | 동작                                                           |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| Variable Environment | 주로 초기 실행 단계에서의 변수 상태를 나타 냄.                             | - 환경 레코드와 외부 환경 참조를 포함. <br> - Lexical Environment와 유사. | 함수의 매개변수, 함수 선언 및 변수의 초기 상태(호이스팅 포함)를 관리 | 실행 컨텍스트가 생성될 때 한 번만 설정됨.                      |
| Lexical Environment  | 코드가 작성된 구조(렉시컬 스코프)에 따라 결정되는 실행 컨텍스트 내의 환경. | - 환경 레코드 <br> - 외부 환경 참조                                       | 현재 실행 중인 코드의 스코프와 해당 스코프 내의 변수, 함수 등을 관리 | 실행 중인 코드의 렉시컬 스코프에 따라 생성되며, 업데이트 가능. |

### EnvironmentRecord란?

각 실행 컨텍스트는 Environment Record를 가지고 있으며, 해당 실행 컨텍스트 내에서 처음부터 끝까지 순서대로 유효한 모든 식별자(변수, 함수, 매개변수 등)와 다른 관련 정보를 기록하는 구조다.

Environment Record는 크게 두 종류가 있다.

1. Declarative Environment Records: 함수 선언, 변수 선언, 매개변수 등의 바인딩을 저장한다.
2. Object Environment Records: 주로 전역 환경에서 객체(전역 객체, window 또는 global)의 속성으로 식별자를 관리한다.

### Environment Record의 동작 방식

JavaScript에서는 실행 컨텍스트가 생성될 때, 그 컨텍스트 내의 함수 선언과 변수 선언(var 키워드를 사용하는 경우)이 Environment Record에 먼저 등록된다.

### 호이스팅(hoisting)

> 변수 정보 수집 과정을 이해하기 쉬운 방법으로 대체한 가상의 개념을 `호이스팅(hoisting)`이라고 한다.

Eenvironment Record의 수집 과정(실행 컨텍스트가 관여하는 코드 집단을 최상단으로 '끌어올린다'고 해석하는 것)을 추상화한 개념이다.

#### 매개변수와 변수 호이스팅

```javascript
// var : 선언과 동시에 초기화(undefined)가 이루어 짐.
function a(x) {
  console.log(x); // 1
  var x;
  console.log(x); // 1
  var x = 2;
  console.log(x); // 2
}

a(1);

// let, const : 선언만 가능(일시적 사각지대).
console.log(x); // ⚠️ ReferenceError: Cannot access 'x' before initialization
const x = 1;

// ===================================[ 호이스팅 ]====================================
function a(x) {
  var x;
  var x;
  var x;

  x = 1;
  console.log(x); // 1
  console.log(x); // 1
  x = 2;
  console.log(x); // 2
}

a(1);
```

#### 함수의 호이스팅

함수의 호이스팅에는 함수 선언문과 함수 표현식에 따라 차이가 생긴다.  
함수 선언문은 코드의 상단으로 호이스팅되므로, 선언 전에 호출할 수 있지만, 함수 표현식은 변수에 할당된 함수이므로 호이스팅되지 않고, 변수 선언 규칙을 따른다.

#### 함수 선언문과 함수 표현식 차이점

| 함수              | 호이스팅                                                   | 구문                                                    |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| 선언문<br/>(기명) | 호이스팅⭕.<br/>코드의 어느 위치에서든지 호출.             | <pre> function 함수명() { /\* ... \*/ }; </pre>         |
| 표현식<br/>(익명) | 호이스팅❌.<br/>코드에서 해당 표현식이 실행된 후에만 호출. | <pre> const 함수명 = function() { /\* ... \*/ }; </pre> |

```javascript
console.log(sum(1, 2)); // 3
console.log(multiply(3, 4)); // ⚠️TypeError: multiply is not a function

// 선언문
function sum(a, b) {
  return a + b;
}

// 표현식
var multiply = function (a, b) {
  return a * b;
};

// ===================================[ 호이스팅 ]====================================

// 함수 선언문은 전체를 호이스팅함.
function sum(a, b) {
  return a + b;
}

// 함수 표현식은 변수 선언부만 호이스팅함.
var multiply;

console.log(sum(1, 2)); // 3
console.log(multiply(3, 4)); // ⚠️TypeError: multiply is not a function

multiply = function (a, b) {
  return a * b;
};
```
