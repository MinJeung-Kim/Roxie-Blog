type Header = {
  text: string;
  child?: Header[];
};

export default function PostIndex({ text, child }: Header) {
  return (
    <li>
      <span>{text}</span>
      {child && (
        <ul className="flex flex-col gap-3 pl-4 mt-3">
          {child.map((childHeader) => (
            // 재귀적으로 자기 자신을 호출할 때, childHeader의 모든 속성을 PostIndex에 전달하기 위해 스프레드 연산자({...childHeader})를 사용
            <PostIndex key={childHeader.text} {...childHeader} />
          ))}
        </ul>
      )}
    </li>
  );
}
