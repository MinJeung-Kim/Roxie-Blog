이번 포스팅에는 기존에 `mock data api`로 posts를 받아오는 방법에서 Backend CMS인 `Sanity`를 사용하여 api 통신 하는 방법에 대해 알아보겠다.

- 기존 mock data 경로

  ```bash
  data
  ├── posts
  │   └── example.md
  └── public
  ```

- sanity client 설정 경로

  ```bash
  .
  ├── app
  │   └── api
  │       └── posts
  │           └── route.ts
  ├── service
  │   ├── posts.ts
  │   └── sanity.ts
  └── components
  ```

React에서 <span style="color:#F05F06">서비스 폴더를 별도로 분리하여 비즈니스 로직을 함수로 작성하는 패턴</span>은 특정한 공식 명칭이 있는 것은 아니지만, 일반적으로 이런 구조를 "서비스 계층(Service Layer)" 또는 "서비스 오리엔테이션(Service-Oriented Architecture, SOA) 패턴"으로 참조할 수 있다. 이 패턴은 애플리케이션의 비즈니스 로직을 UI 컴포넌트로부터 분리하여 재사용성을 높이고, 유지 보수성을 개선하는 데 도움을 준다.

이렇듯 비즈니스 로직을 따로 함수로 사용하면 타입스크립트 사용시, 어떤 데이터인지 타입을 명확하게 정의 가능하며, 사용하는 곳에서도 타입을 안전하게 사용할 수 있어, 타입의 안전성이 전반적으로 높아진다.

## 비즈니스 로직 분리와 GROQ

Query Language (GROQ)는 Graph-Relational Object Queries의 약자로, Sanity에서 사용하는 오픈소스 쿼리 언어이다. 강력하고 직관적이라서 배우기 쉽고, 정확한 정보를 묘사하기 좋으며 조인쿼리가 가능하다.  
기본적인 문법은 아래와 같다.

```typescript
// *[ 조건식 ]
*[_type == 'movie' && releaseYear >= 1979]

// *[ 조건식 ]{원하는 fields}
*[_type == 'movie' && releaseYear >= 1979]{ _id, title, releaseYear }

// *[ 조건식 | Sorting(기준) ]{원하는 fields}
*[_type == 'movie' && releaseYear >= 1979] | order(releaseYear) {
  _id, title, releaseYear
}

// *[ 조건식 | Sorting(기준) ]{원하는 fields}[시작 인덱스 번호...마지막 인덱스 번호]
*[_type == 'movie' && releaseYear >= 1979] | order(releaseYear) {
  _id, title, releaseYear
}[0...100]
```

추가 필요한 쿼리를 찾는다면 공식문서 [Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)를 참고하면 된다.

```typescript
// service/posts.ts
import { client } from "./sanity";

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  description: string;
  featured: boolean;
  path: string;
  title: string;
};

export async function getFeaturedPosts(): Promise<Post[]> {
  // moc data api
  // return getAllPosts() //
  //   .then((posts) => posts.filter((post) => post.featured));
  return client.fetch(`
  *[_type =="post" && (featured == true || defined(featured))] | order(_createdAt desc){ "id": _id, "createdAt": _createdAt,
    "updatedAt": _updatedAt, category, description, featured, path, title }`);
}
```

지금까지 service폴더를 생성하여 비즈니스 로직을 따로 분리한 이유에 대해 알아보았다. 다음으로, sanity cloud 접속 정보 설정하는 방법에 대해 알아본다.

## sanity client 설정

[@sanity/client](https://www.sanity.io/docs/js-client#quickstart)공식 문서를 참고하여 sanity client 설치 후 관련 정보를 설정한다.

```bash
$ npm install @sanity/client
```

```typescript
// service/sanity.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-25",
  token: process.env.SANITY_SECRET_TOKEN,
});
```

`projectId`, `dataset`, `token`은 [sanity manage](https://www.sanity.io/manage/personal/project/sstznhcv)에서 확인 하여 .env파일에 반영 후 재 시작 한다.
![CMS](/images/posts/nextBlog/sanity6.png)

설정이 끝났다면 본격적으로 Content Lake와 API 통신하여 데이터 .

## SWR 네트워크 상태 라이브러리

SWR은 데이터 가져오기를 위한 React Hooks로 HTTP 캐시 무효 전략인 `stale-while-revalidate`에서 유래되었으며, 캐시(stale)로 부터 데이터를 반환한 후, fetch요청(revalidate)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략이다.

### 주요 기능

- **자동 재검증**: SWR은 사용자가 애플리케이션에 상호작용할 때 자동으로 데이터를 재검증하여 최신 상태를 유지한다. 브라우저 포커스, 네트워크 재연결, 사용자 상호 작용 시 데이터를 새로고침할 수 있다.

- **최적화된 UI 경험**: SWR은 캐싱과 재검증을 통해 빠르고 일관된 사용자 경험을 제공한다. 데이터는 "만료되었지만 유효한(stale but valid)" 상태로 취급되어, 백그라운드에서 업데이트되는 동안에도 UI가 빠르게 로딩된다.

- **간결한 API**: SWR은 사용하기 쉬운 API를 제공하며, React Hooks와 자연스럽게 통합된다. 데이터 패칭, 캐싱, 재검증과 같은 복잡한 작업을 간단한 몇 줄의 코드로 처리할 수 있다.

- **내장된 성능 최적화**: SWR은 중복 요청을 방지하고, 데이터 패칭 작업을 효율적으로 관리하며, 사용자 경험을 개선하기 위한 여러 최적화 기능을 내장하고 있다.

- **유연성**: SWR은 REST, GraphQL 등 다양한 종류의 데이터 패칭 요구 사항을 지원한다. 또한, 전역 상태 관리, 요청 재시도, 페이징 및 무한 스크롤과 같은 고급 패턴을 구현하는 데에도 사용할 수 있다.

이러한 장점을 근거로 [SWR](https://swr.vercel.app/ko/docs/getting-started) 라이브러리를 사용하여 데이터 요청을 해보자.

## SWR 사용방법

- swr 설치

  ```bash
  $ npm i swr
  ```

- 일반적으로 요청에는 "loading", "ready", "error"의 세 가지 상태가 있는데 `data`, `error`, `isLoading` 값을 사용하여 요청의 현재 상태를 확인하고 해당 UI를 반환한다.
- `fetcher`은 fetch할때 어떤(fetch, Axios 등)걸 사용할지 명시할 수 있다.

  ```javascript
  import useSWR from "swr";

  function Profile() {
    const { data, error, isLoading } = useSWR("/api/user/123", fetcher);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    // 데이터 렌더링
    return <div>hello {data.name}!</div>;
  }
  ```

- useSWR을 사용할때마다 매번 fetcher을 호출하지 않아도 되게 context API를 생성한다. [global-configuration](https://swr.vercel.app/ko/docs/global-configuration) 공식 사이트를 참고하여 설정한다.

  ```typescript
  // context/SWRConfigContext.tsx
  "use client";

  import { SWRConfig } from "swr";

  type Props = {
    children: React.ReactNode;
  };

  export default function SWRConfigContext({ children }: Props) {
    return (
      <SWRConfig
        value={{
          // 원하는 fetcher 정의.
          // url을 전달 받아 브라우저에서 제공해주는 fetch 사용하여 json으로 변환하여 반환함.
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
      >
        {children}
      </SWRConfig>
    );
  }
  ```

  ```typescript
  // app/layout.tsx
  <main className="w-full mx-auto grow max-w-screen-2xl">
    <SWRConfigContext>{children}</SWRConfigContext>
  </main>
  ```

  ```typescript
  "use client";
  import useSWR from "swr";
  import PostsGrid from "./PostsGrid";

  export default function FeaturedPosts() {
    const { data: posts, isLoading: loading } = useSWR("/api/posts");

    return (
      <section className="px-12 py-4 mt-[6rem]">
        <PostsGrid />
      </section>
    );
  }
  ```

## 마치며

지금까지 moc data에서 데이터를 가져오는 방식에서 sanity Content Lake API 통신으로 데이터를 가져오는 방식에 대해 알아보았다.
다음 포스팅에서는 마크다운 컨텐츠를 저장하는 방법에 대해 알아보겠다.
