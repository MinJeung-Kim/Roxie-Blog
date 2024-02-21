프로젝트를 진행하다보면 상당히 많은 input을 받게 되는데 매번  
"동적 input을 쓰는게 맞는건가? 성능에는 문제가 없는가?"  
하는 딜레마에 빠지곤 한다.

## A Simple Component

이번 프로젝트에서는 `Inputs Component`에서 `Create`와 `Update`를할 수 있게 로직을 짰다.  
Data는 Object형태로 오며, 부모 `Component`에서 `name`을 전달한다.

```typescript
const data = { id: "1234", name: "Roxie" };
```

기존에 어떤 데이터를 담고 있는지 알지 못하기 때문에 `useEffect()`에서 깊은 복사를 해준다.

```typescript
import React, { useEffect, ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";

type Props = {
  name: string;
  data: DataObjectType;
};

export const Inputs: React.FC<Props> = ({ name, data }) => {
  const { inputs, setInputs } = useDataUpdate();

  useEffect(() => {
    // db에서 받아온 데이터가 있으면 받아온 데이터로 업데이트.
    if (Object.keys(data).length > 0) {
      setInputs((prev) => ({
        ...prev,
        [name]: data[name],
      }));
    }
  }, [name]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <InputText
      className="p-inputtext-sm"
      name={name}
      value={inputs[name] || ""}
      disabled={Object.keys(data).length < 1 ? false : true}
      onChange={onChange}
    />
  );
};
```

## Perplexing

동적 input를 사용하면 곤란한 상황들이 발생한다.  
`onChange()`에 `console.log`를 찍으면 `input`에 글을 쓰는 순간 그 즉시 `console.log`가 찍히는 문제이다.  
 이 문제는 `debounce`를 사용하여 해결해 보도록 한다.

```typescript
useEffect(() => {
  const debounce = setTimeout(() => {
    console.log("디바운스 입력:", inputs);
  }, 1000);
  return () => clearTimeout(debounce);
}, [inputs]);
```

이렇게하면 1초뒤, console.log가 찍히는 것을 확인 할 수 있다.

참고:  
[Debounce Input in React](https://dev.to/manishkc104/debounce-input-in-react-3726)  
[Debounce&Throttle](https://velog.io/@skawnkk/debounce-throttle)
