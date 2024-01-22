스택은 배열이나 연결 리스트를 사용하여 구현할 수 있다. 배열 기반의 구현은 일정한 크기의 메모리 공간을 필요로 하지만, 인덱스를 통한 빠른 접근을 가능하게 한다. 연결 리스트를 사용한 구현은 동적으로 크기가 조절되지만, 추가 메모리를 필요로하는 단점도 존재한다.

자세한 내용은 <a href="https://roxie-blog.vercel.app/posts/typescript-stack-1" target="_blank">단일 연결 리스트를 사용한 stack 자료구조 : 기본편</a>을 참고해보자.

먼저, Stack인터페이스를 정의한다. 내부 사이즈를 결정할 읽기 전용 변수(size)와 push(), pop()기능을 정의한다.

```typescript
// 규격 정의
interface Stack {
  readonly size: number; // 내부적으로 결정되는 사이즈
  push(value: string): void;
  pop(): string;
}
```

다음으로, 데이터와 다음 노드를 가리킬 변수를 정의하는 StackNode type을 만들고, 정의된 변수들은 외부에서 수정할 수 없게 readonly로 선언한다.

```typescript
// 사용자가 데이터를 입력해서 한 단계 감싸는 무언가를 만든다면 불변성을 유지하는 것이 좋다.
type StackNode = {
  readonly value: string;
  // 다음 StackNode를 가리키고 있거나 없음.
  readonly next?: StackNode;
};
```

StackImpl 클래스에서 Stack 인터페이스를 구현한다.  
Stack라는 insterface를 구현하는 class이므로, 인터페이스에 정의된 규격을 전부 구현해야 한다.

```typescript
class StackImpl implements Stack {
  // 외부에서 변경 불가. 내부에서 사용하는 동일한 이름은 언더스코어(_)를 앞에 붙여서 사용한다.
  private _size: number = 0;
  private head?: StackNode;

  // size limit 설정
  constructor(private capacity: number) {}

  // 내부에서 size 변경, setter이 없기 때문에 외부에서는 읽기만 가능
  get size() {
    return this._size;
  }

  push(value: string) {
    if (this.size === this.capacity) {
      throw new Error("Stack is full!");
    }
    // node변수는 value와 next를 받고, next는 head가 가리키고있는 node를 할당한다.
    const node: StackNode = { value, next: this.head };
    // 새로 들어온 node를 가리킨다.
    this.head = node;
    this._size++;
  }

  pop(): string {
    // this.head는 StackNode이거나 null일 수 있다.
    // strict null check를 이용해 엄격하게 만들었지만 자바스크립트 코드와
    // 연동하면 this.head가 null or undefind일 수 있기때문에
    // this.head === undefind 형식을 사용하지 않는다.
    if (this.head == null) {
      throw new Error("Stack is empty!");
    }
    // 제거하고자 하는 node는 this.head가 가리키고 있는 node다.
    const node = this.head;
    // 제거된 node다음의 node를 가리키게 한다.
    this.head = node.next;
    this._size--;

    return node.value;
  }
}
```

구현된 클래스(StackImpl)를 사용해보면 마지막에 입력된 순서대로 출력되는 것을 확인할 수 있다.

```typescript
const stack = new StackImpl(10);
stack.push("Roxie 1");
stack.push("Bob 2");
stack.push("steve 3");

while (stack.size !== 0) {
  console.log(stack.pop());
}

stack.pop(); // Error: Stack is empty!
```

```bash
$ ts-node stack.ts
steve 3
Bob 2
Roxie 1
```
