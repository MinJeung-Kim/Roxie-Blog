## 스코프 (Scope)

스코프는 변수, 함수, 그리고 객체가 접근 가능한 범위를 말한다.  
JavaScript에는 두 가지 타입의 스코프가 있다.

### 글로벌 스코프(Global Scope)

전역 스코프라고도 하며, 변수나 함수가 함수 바깥이나 중괄호({}) 바깥에서 선언되었을 때, 어디서든 접근 가능한 글로벌 스코프에 속한다.

```javascript
var globalVar = "I am a global variable";

function globalFunction() {
  console.log(globalVar); // 글로벌 변수에 접근 가능
}

globalFunction(); // "I am a global variable"
```

### 로컬 스코프(Local Scope)

지역 스코프라고도 하며, 변수나 함수가 다른 함수 내부에서 선언되었을 때, 해당 함수와 중첩된 함수 내에서만 접근이 가능하다. 로컬 스코프는 다시 두 가지로 나뉜다.

#### 함수 스코프(Function Scope)

- `var` 키워드로 선언된 변수는 함수 스코프를 가진다.

```javascript
function myFunction() {
  var functionScopedVar = "I exist only within this function";

  function innerFunction() {
    console.log(functionScopedVar); // 내부 함수에서 접근 가능
  }

  innerFunction(); // "I exist only within this function"
}

myFunction();
console.log(functionScopedVar); // ⚠️Error: functionScopedVar는 정의되지 않음
```

#### 블록 스코프(Block Scope)

- `let`과 `const`로 선언된 변수는 블록 스코프를 가지며, 중괄호({})로 구분된 블록 내에서만 접근이 가능하다.

```javascript
function testBlockScope() {
  if (true) {
    let blockScopedVar = "I exist only within this block";
    console.log(blockScopedVar); // 블록 내부에서 접근 가능
  }

  console.log(blockScopedVar); // ⚠️Error: blockScopedVar는 블록 외부에서 접근 불가
}

testBlockScope();
```

## 스코프 체인 (Scope Chain)

스코프 체인은 외부환경 참조(OuterEnvironment Reference)를 통해 식별자 유효범위를 함수가 정의된 스코프와 부모 스코프들의 계층적 연결을 통해 안에서부터 바깥으로 차례로 검색해나가는 것을 의미한다.  
JavaScript에서는 함수가 선언될 때, 그 함수는 자신이 선언된 스코프에 대한 참조를 유지한다. 이 참조를 통해 함수는 자신의 로컬 스코프, 외부 스코프, 그리고 글로벌 스코프에 있는 변수 및 함수에 접근할 수 있다.

여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근이 가능하다.

```javascript
var a = 1;
var outer = function () {
  var inner = function () {
    console.log(a); // undefined
    var a = 3;
  };
  inner();
  console.log(a); // 1
};
outer();
console.log(a); // 1

// ===================================[ 호이스팅 ]====================================
var a;
var outer;

a = 1;
outer = function () {
  var inner;

  inner = function () {
    var a;
    console.log(a); // undefined

    a = 3;
    console.log(a); // 3
  };

  inner();
  console.log(a); // 1
};

outer();
console.log(a); // 1
```

![Scope](/images/posts/javascript/scope.png)

## Outer Environment Reference

Outer Environment Reference는 현재 실행 중인 컨텍스트(주로 함수)의 외부 스코프에 대한 참조다.  
이 참조는 현재 스코프에서 찾을 수 없는 변수나 함수를 찾기 위해 사용된다. JavaScript 엔진은 현재 스코프에서 변수나 함수를 찾을 수 없는 경우, Outer Environment Reference를 통해 상위 스코프로 이동하며, 필요한 변수나 함수를 찾을 때까지 이 과정을 반복한다.  
이 메커니즘 덕분에, 중첩된 함수는 외부 함수의 변수에 접근할 수 있으며, 이것이 클로저(Closures)의 기본적인 동작 방식이다.

함수가 실행될 때마다, 해당 함수의 실행 컨텍스트는 현재의 스코프와 Outer Environment Reference를 함께 생성한다. 이를 통해 실행 컨텍스트는 해당 함수의 스코프 체인을 구성하며, 이 체인은 함수가 자신의 스코프와 외부 스코프에 있는 변수에 접근할 수 있게 해준다.

```javascript
function outerFunction() {
  var outerVariable = "I'm outside!";

  function innerFunction() {
    console.log(outerVariable); // "I'm outside!"
  }

  return innerFunction;
}

var inner = outerFunction();
inner(); // 클로저를 통해 외부 함수의 변수에 접근
```

위 예시에서 innerFunction은 outerFunction의 스코프에 접근할 수 있으며, outerVariable을 사용할 수 있다. 이는 innerFunction의 Outer Environment Reference가 outerFunction의 스코프를 가리키기 때문이다. 이러한 방식으로 스코프 체인은 JavaScript의 함수와 변수가 어떻게 상호작용하는지를 결정하는 데 중요한 역할을한다.
