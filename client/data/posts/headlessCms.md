## Headless CMS란?

Headless CMS(Content Management System)는 전통적인 CMS와 다르게 작동하는 현대적인 웹 콘텐츠 관리 시스템이다. `Headless`라는 용어는 CMS가 '머리'(프론트엔드, 사용자 인터페이스)가 없다는 것을 의미한다. 전통적인 CMS는 콘텐츠 생성, 관리, 저장 및 프론트엔드 표시(웹사이트 디자인)를 모두 처리하는 반면, Headless CMS는 오직 콘텐츠의 생성과 관리에 집중하며 콘텐츠를 API를 통해 다양한 플랫폼(웹, 모바일 앱, IoT 기기 등)으로 전송한다.

Headless CMS는 디지털 콘텐츠가 다양한 플랫폼과 기기에서 점점 더 널리 사용되면서 인기를 얻고 있다. 이는 개발자에게 프론트엔드를 자유롭게 설계할 수 있는 유연성을 제공하며, 기업은 보다 효율적인 콘텐츠 관리와 빠른 적응력을 갖출 수 있다.

## Headless CMS의 주요 특징

**1. API 중심**: 콘텐츠는 RESTful API나 GraphQL API를 통해 다른 시스템이나 애플리케이션에 제공된다.  
**2. 플랫폼 독립성**: 콘텐츠는 웹사이트뿐만 아니라 모바일 앱, IoT 기기, 스마트 워치 등 다양한 플랫폼에서 사용될 수 있다.  
**3. 유연성 및 확장성**: 개발자들은 콘텐츠를 표시하는 방식을 자유롭게 선택할 수 있으며, 새로운 기술과 쉽게 통합할 수 있다.  
**4. 보다 집중된 콘텐츠 관리**: 관리자와 콘텐츠 제작자는 콘텐츠 자체에 더 집중할 수 있으며, 프론트엔드 디자인에 대한 걱정을 덜 수 있다.

## 전통 CMS와 Headless CMS의 차이점

[SANIT](https://www.sanity.io/headless-cms)에서 Headless CMS에 대해 설명한 글을 바탕으로 전통 CMS와 Headless CMS의 차이점에 대해 알아보자.
![CMS](/images/posts/nextBlog/sanity1.png)
노래를 녹음하는 상황이라고 가정했을 경우, 녹음기는 전통 CMS이며, 녹음 편집기는 Headless CMS의 기능을 한다.
노래는 가사, 멜로디, 악기, 음성 트랙 등 다양한 정보로 구성되어 있다. `녹음기`는 노래 한 트랙을 간단하게 녹음할 수 있고 정보와 프리젠테이션이 혼합되어 있어 <span style="color:#F05F06">노래를 다시 재생할 수는 있지만 리믹스할 수는 없는</span> 반면, `녹음 편집기`는 각 음악가에게 맞춤형 녹음 경험을 제공하고 각 파트는 개별 트랙으로 녹음된다. 사운드 엔지니어가 팀과 협력하여 모든 트랙을 리믹스하고 레벨을 조정하는 일도 할 수있으므로 <span style="color:#F05F06">노래를 재생하고 리믹스할 수 있다.</span>

|              | 기존 CMS          | 헤드리스 CMS     |
| ------------ | ----------------- | ---------------- |
| 구조         | One-to-one(1:1)   | One-to-many(1:n) |
| 확장성       | Monolithic        | Modular          |
| 장치 호환성  | 제한된            | 반응형 디자인    |
| 통합 및 배포 | 일시적            | 지속적           |
| Engineering  | DIY               | Managed          |
| 개발자 경험  | Legacy            | Contemporary     |
| 속도         | 더 높은 로드 시간 | 로드 시간 단축   |
| 반복         | 긴 사이클         | 급속 성장        |

### 전통 CMS와 Headless CMS간의 기본적인 아키텍처 차이점

![CMS](/images/posts/nextBlog/sanity2.png "출처: sanity")

> <span style="color:#2267b1">모놀리식(Monolithic) CMS</span> 아키텍처는 웹사이트의 콘텐츠 관리와 프론트엔드 프레젠테이션(사용자에게 보이는 부분)을 하나의 긴밀하게 연결된 시스템에서 처리하는 방식이다. 전통적으로 많이 사용되는 형태로, `워드프레스`나 `조마(Joomla)`, `드루팔(Drupal)` 같은 시스템들이 있다.

Headless CMS와 Monolithic CMS의 주요 차이점은 디커플링이다. 이러한 아키텍처 차이로 인해 사용자는 기존 CMS의 원래 버전보다 사용자 친화적이면서 엔터프라이즈 수준의 성장을 지원할 수 있는 콘텐츠 관리 계층을 갖게 된다.

개발자가 선호하는 프레임워크, 모바일 앱 또는 IoT용 개발 키트 등 무엇이든 무제한 프런트 엔드를 구축할 수 있으며, Headless 백엔드 내에서 편집 및 게시된 동일한 콘텐츠를 추가 부담 없이 다양하고 복잡한 프레젠테이션 레이어로 전달할 수 있다.

더 자세한 내용은 [headless-vs-traditional-cms](https://www.sanity.io/headless-cms/headless-vs-traditional-cms)에서 확인할 수 있다.

## Headless CMS의 동작방식

1. **콘텐츠 저장 및 관리:**
   콘텐츠 생성자와 관리자는 CMS의 백엔드 인터페이스를 사용해 콘텐츠를 생성, 편집, 저장한다.
   콘텐츠는 데이터베이스에 저장되며, 구조화된 형식(JSON, XML)으로 관리된다.

2. **API 사용:**  
   Headless CMS는 RESTful API나 GraphQL 같은 API를 제공한다.  
   \API를 통해 다른 시스템이나 애플리케이션은 CMS에서 콘텐츠를 요청하고 받아올 수 있다.

3. **플랫폼 독립성:**  
   API를 통해 전달된 콘텐츠는 웹사이트, 모바일 앱, IoT 기기, 심지어 AR/VR 경험 등 다양한 환경에서 활용될 수 있다.

4. **프론트엔드 개발의 자유도:**  
   개발자들은 프론트엔드를 React, Vue, Angular 등 원하는 어떤 프레임워크나 기술 스택을 사용하여 사용자 경험을 디자인할 수 있다.

5. **콘텐츠 전달 및 렌더링:**  
   프론트엔드 애플리케이션은 API를 통해 콘텐츠를 요청하고, 받아온 콘텐츠를 사용자에게 표시한다.
   콘텐츠는 클라이언트 측에서 렌더링되거나 서버 측에서 사전 렌더링될 수 있다.

## 마무리

지금까지 Headless CMS에 대해 알아보았다. 기본적인 개념과 동작방식에 대해 알았다면 대표적인 Headless CMS에 대해 알아보도록하자. 대표적인 Headless CMS의 종류로는 WordPress(Headless CMS도 지원함), Strapi, Sanity등이 있다. 이 중에 Sanity로 구현할 것이므로, [Sanity에 대해 알아보기](https://roxie-blog.vercel.app/posts/sanity-headlessCms)로 한다.
