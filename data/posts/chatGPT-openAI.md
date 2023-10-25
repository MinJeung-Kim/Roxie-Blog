`websocket`으로 채팅 서비스를 구현하려고 찾아보다가 [@chatscope/chat-ui-kit-react](https://www.npmjs.com/package/@chatscope/chat-ui-kit-react) 라이브러리를 알게 됐다.  
[Chat GPT와 연동하는 예제](https://codesandbox.io/s/app-khg4tv?file=/src/App.jsx:244-261)를 찾아서 내가 세팅한 환경에 맞게 `typescript`와 `custom hook`으로 코드를 변경해서 코딩해 보았다.

먼저 [OpenAI 웹사이트](https://platform.openai.com/)에서 로그인 후 API 키를 발급 받으면 된다.

> ⚠️ 주의 할 점은 🆗버튼을 클릭하기 전에 복사 후, `.env`파일에 먼저 붙여넣기 해야한다는 것!
> ![API](/images/posts/api_key_image.png)

## 코드 분석

`@chatscope/chat-ui-kit-react` 라이브러리를 사용해서 채팅창의 전체적인 form을 만들어 준다.  
`useChatGPT` 훅을 사용하여 `messages`, `isTyping`, 그리고 `sendMessage`를 가져온다.  
이 훅은 초기 메시지를 매개변수로 받아온다.

```tsx
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useChatGPT } from "hooks/useChatGPT";

export default function ChatForm() {
  const { messages, isTyping, sendMessage } = useChatGPT([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "outgoing",
      position: "first",
    },
  ]);

  return (
    <div style={{ position: "relative", height: "500px", width: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              // ChatGPT가 현재 타이핑 중인지의 여부
              isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null
            }
          >
            {messages.map((message, i) => {
              // 현재 채팅 화면에 표시되어야 하는 메시지 목록
              return <Message key={i} model={message} />;
            })}
          </MessageList>

          <MessageInput
            placeholder="Type message here"
            onSend={sendMessage} //   사용자가 새 메시지를 보내려고 할 때 호출되는 함수
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
```

#### 다음으로 `useChatGPT` hook 코드를 분석해 본다.

`API_KEY` : 발급 받은 API KEY를 상수변수로 지정해 준다.  
`systemMessage` : GPT-3에게 어떤 방식으로 대답을 할지 지시하는 역할.

```tsx
const API_KEY = process.env.REACT_APP_CHATGPT_API_KEY;
const systemMessage = {
  role: "system",
  content:
    // 2년 경력의 소프트웨어 전문가에게 설명하는 것처럼 답변을 제공
    "Explain things like you're talking to a software professional with 2 years of experience.",
};
```
  
전반적으로, `useChatGPT`` 훅은 `ChatGPT`와의 인터랙션을 관리하며, 메시지를 전송하고 받는 기능을 한다.  

```tsx
export function useChatGPT(initialMessages: MessageModel[]) {
  const [messages, setMessages] = useState<MessageModel[]>(initialMessages);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = async (message: string): Promise<void> => {
    // 사용자의 메시지를 newMessage 객체에 저장하고, messages 상태에 추가
    const newMessage: MessageModel = {
      message,
      direction: "outgoing",
      sender: "user",
      position: "first",
    };
    // OpenAI API로 요청을 보내기 전에, 모든 메시지를 apiMessages 배열로 변환
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);

    const apiMessages = newMessages.map((messageObject) => {
      const role: "assistant" | "user" =
        messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        apiRequestBody,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const receivedMessage: MessageModel = {
        message: response.data.choices[0].message.content,
        sender: "ChatGPT",
        direction: "incoming",
        position: "single",
      };

      setMessages([...newMessages, receivedMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error making the API call:", error);
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage };
}
```  
  
결과를 확인해 보면 현재는 잦은 요청으로 에러를 뱉고있지만, 통신이 잘 된다는 것을 확인 할 수 있다.  

![API](/images/posts/api_key_connect.png)
  
   
어려웠던 점은 chatGPT에게 물어보면서 해결했다.  
오늘 구현한 것은 라이브러리로 간편하게 구현할 수 있었지만, 시간이 된다면 `websocket`을 사용해서
직접 구현도 해봐야겠다는 생각이 들었다.  

 

참고:  
https://www.daleseo.com/chatgpt-api-keys/  
  


  
