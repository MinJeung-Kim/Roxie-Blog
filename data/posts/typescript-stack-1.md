`TypeScript`에서 인터페이스와 단일 연결 리스트를 사용하여 스택(Stack)을 구현하는 흥미로운 작업을 해본다.  
단일 연결 리스트(Singly Linked List)와 배열(Array)을 사용하여 스택을 구현할 때, 두 방식 간의 몇 가지 중요한 차이점을 알아보며 이번 포스팅에 단일 연결 리스트를 사용하여 스택을 구현한 이유를 알아본다.

- **1. 메모리 할당**  
  **단일 연결 리스트**: 노드가 필요할 때마다 메모리를 할당하고, 노드가 필요하지 않을 때 메모리를 해제하는 동적 메모리 할당을 사용한다. 이는 스택의 크기가 실행 시간에 유연하게 변할 수 있음을 의미한다.  
  **배열**: 정적 배열은 고정된 크기를 가지므로, 스택이 꽉 차면 더 이상 새로운 요소를 추가할 수 없다. 이 과정에서 새로운 메모리 영역으로의 복사가 필요할 수 있다.
- **2. 성능**  
  **단일 연결 리스트**: push와 pop 연산은 새로운 노드를 추가하거나 제거하는 데 있어서 리스트의 나머지 부분을 건드릴 필요가 없다.  
  **배열**: 배열에서 push와 pop 연산의 경우, 배열의 크기를 늘리기 위해서는 모든 요소를 새로운 메모리 공간으로 복사해야 한다.
- **3. 메모리 사용**  
  **단일 연결 리스트**: 각 요소는 자신의 데이터와 다음 노드를 가리키는 포인터 정보를 포함며, 추가 메모리를 사용한다.  
  **배열**: 요소는 데이터만 저장하므로 연결 리스트보다는 메모리 효율이 좋을 수 있다.
- **4. 구현의 복잡성**  
  **단일 연결 리스트**: 연결 리스트를 사용한 스택 구현은 포인터를 적절히 관리해야 하므로, 배열을 사용하는 것보다 복잡할 수 있다.  
  **배열**: 배열을 사용하는 스택 구현은 인덱스를 사용하여 스택의 상단 요소에 접근하므로, 상대적으로 간단하고 직관적이다.
- **5. 활용 시나리오**  
  **단일 연결 리스트**: 스택의 크기가 빈번하게 변하거나 최대 크기를 예측하기 어려운 경우 연결 리스트를 사용하는 것이 유리하다.  
  **배열**: 스택의 최대 크기가 알려져 있거나 크기 변경이 드문 경우 배열을 사용하는 것이 효율적일 수 있다.

| 자료구조         | 메모리 할당 | 원소 탐색 | 메모리 효율        | 구현의 복잡성 | 활용 시나리오           |
| ---------------- | ----------- | --------- | ------------------ | ------------- | ----------------------- |
| 단일 연결 리스트 | 동적        | 빠름      | 메모리 추가 필요   | 복잡          | 크기 변동일 빈번할 경우 |
| 배열             | 정적        | 느림      | 메모리 추가 불필요 | 간단          | 크기가 정해져있을 경우  |

배열의 경우 추가, 삭제 시 깊은 복사가 일어나지만, 연결 리스트의 경우 얕은 복사가 일어나므로 상대적으로 효율적이다. 다음으로, 단일 연결 리스트에 대해 알아본다.

## 단일 연결 리스트란?

![SinglyLinkedList](/images/posts/typescript/linked.png "출처: 유튜브 생활코딩")

단일 연결 리스트(Singly Linked List)는 각 노드가 다음 노드만을 가리키는 가장 간단한 형태로, `연결 리스트`의 종류 중 하나다.  
연결 리스트(Linked List) 종류로는

- **이중 연결 리스트(Doubly Linked List)**: 각 노드가 이전 노드와 다음 노드를 가리킨다. 이를 통해 양방향 탐색이 가능하다.
- **원형 연결 리스트(Circular Linked List)**: 마지막 노드가 첫 번째 노드를 가리키는 형태다.

이러한 종류들이 있는데 https://visualgo.net/en/list?slide=1 해당 사이트에서 도식화를 참조해 볼 수 있다.

### 연결 리스트의 특징

- **동적 크기**: 연결 리스트는 실행 시간에 크기가 변경될 수 있으며, 배열과 달리 초기 크기 지정이 필요하지 않다.
- **효율적인 삽입/삭제**: 배열과 달리 특정 위치에 새로운 노드를 삽입하거나 기존 노드를 삭제하는 작업이 매우 효율적이다. 이는 노드 간의 링크만 변경하면 되기 때문이다.
- **메모리 관리**: 연결 리스트는 노드가 메모리의 연속적인 위치에 저장될 필요가 없어, 분산된 메모리 활용이 가능합니다.

### 연결 리스트의 단점

- **직접 접근 불가**: 연결 리스트에서는 배열처럼 인덱스를 통한 직접 접근이 불가능하다. 특정 요소에 접근하기 위해서는 처음부터 순차적으로 탐색해야 한다.
- **추가 메모리 사용**: 각 노드가 데이터와 함께 포인터를 저장하기 때문에, 배열보다 더 많은 메모리를 사용한다.

구현에 앞서 스택에 대해 알아보도록 한다.

## Stack의 주요 특징

- **후입선출(LIFO)**: 스택에 저장된 마지막 요소가 가장 먼저 나온다.
- **push 연산**: 스택의 상단에 새 요소를 추가한다.
- **pop 연산**: 스택의 상단에 있는 요소를 제거하고 반환한다.
- **peek 또는 top 연산**: 스택의 상단에 있는 요소를 제거하지 않고 반환한다.
- **isEmpty 연산**: 스택이 비어있는지 확인한다.
- **스택의 용량**: 일부 스택 구현체에서는 최대 저장 가능한 요소의 수를 제한하기도 한다.

## Stack의 사용 사례

- **함수 호출:** 대부분의 프로그래밍 언어에서 함수 호출 시 사용되는 호출 스택(call stack)은 함수가 호출될 때마다 스택에 데이터가 추가되고, 함수가 종료될 때마다 해당 정보가 스택에서 제거된다.
- **역순 문자열 생성:** 문자를 스택에 차례대로 추가하고, 나중에 제거함으로써 역순으로 문자열을 생성할 수 있다.
- **문자열의 괄호 유효성 검사:** 괄호가 올바르게 닫혔는지 확인하기 위해 스택을 사용할 수 있다.
- **페이지 방문 기록(브라우저의 뒤로 가기):** 사용자의 웹 페이지 방문 기록을 스택에 저장하여 '뒤로 가기' 기능을 구현할 수 있다.
- **수식의 후위 표기법 변환 및 평가:** 중위 표현식을 후위 표현식으로 변환하거나 후위 표현식을 계산할 때 스택을 사용할 수 있다.

## 스택(Stack) 구현 예제

TypeScript를 사용하여 인터페이스와 단일 연결 리스트(Singly Linked List)를 활용한 스택(Stack)을 구현하는 예제를 통해 알아본다.

먼저, 스택을 위한 인터페이스 StackInterface를 정의한다. 이 인터페이스는 스택의 기본적인 동작인 push, pop, peek, 그리고 스택이 비어 있는지 확인하는 isEmpty 메소드를 포함한다.

```typescript
interface StackInterface<T> {
  push(item: T): void;
  pop(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
}
```

그 후, 단일 연결 리스트를 사용하여 이 인터페이스를 구현하는 LinkedListStack 클래스를 작성한다. 이 클래스는 내부적으로 Node 클래스를 사용하여 스택의 각 항목을 저장한다.

```typescript
class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
```

```typescript
class LinkedListStack<T> implements StackInterface<T> {
  private head: Node<T> | null;

  constructor() {
    this.head = null;
  }

  push(item: T): void {
    const newNode = new Node(item);
    newNode.next = this.head;
    this.head = newNode;
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const poppedItem = this.head;
    this.head = this.head.next;
    return poppedItem.data;
  }

  peek(): T | null {
    return this.head ? this.head.data : null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}
```

마지막으로, 단일 연결 리스트로 구현로 구현된 스택에 숫자를 추가하고, 가장 최근에 추가된 항목을 제거하며, 스택이 비어 있는지 확인하는 과정을 확인 해본다.

```typescript
// 스택의 기본 동작(push, peek,pop)
// 스택이 비어 있는지 확인(isEmpty)
const stack = new LinkedListStack<number>();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.peek()); // 3
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.isEmpty()); // false
console.log(stack.pop()); // 1
console.log(stack.isEmpty()); // true
```