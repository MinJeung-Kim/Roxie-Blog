지난 포스팅에서 [Headless CMS](https://roxie-blog.vercel.app/posts/sanity-headlessCms)에 대해 알아보았다.
이번 포스팅에서는 Headless CMS 종류 중 하나인 Sanity에 대해 알아본다.

## Sanity의 주요 특징

1. **실시간 콘텐츠 관리**: Sanity는 실시간으로 콘텐츠를 편집하고 관리할 수 있는 강력한 편집 인터페이스를 제공한다. 이를 통해 여러 사용자가 동시에 작업하며 변경사항을 실시간으로 볼 수 있다.

2. **유연한 쿼리 언어**: Sanity는 GROQ(Graph-Relational Object Queries)라는 강력한 쿼리 언어를 사용하여 데이터를 검색한다. 이를 통해 개발자들은 복잡한 쿼리를 쉽고 빠르게 작성할 수 있다.

3. **맞춤형 스키마**: 개발자는 Sanity의 스키마를 자유롭게 정의할 수 있어, 다양한 형태의 콘텐츠를 효율적으로 관리할 수 있다.

4. **다양한 프론트엔드와의 통합**: Sanity는 RESTful API와 GraphQL API를 제공하여, React, Vue, Angular 등 다양한 프론트엔드 프레임워크와 쉽게 통합될 수 있다.

## 동작 방식

1. **콘텐츠 저장**: 콘텐츠는 Content Lake라는 클라우드에 저장되고 액세스 된다.

2. **API를 통한 접근**: 프론트엔드 애플리케이션은 API를 통해 콘텐츠에 접근한다. 이 때 REST API 또는 GraphQL API를 사용할 수 있다.

3. **실시간 업데이트**: Sanity는 실시간으로 콘텐츠가 업데이트되는 것을 지원하여, CMS 내에서의 변경사항이 즉시 반영된다.

4. **맞춤형 편집 인터페이스**: 개발자는 Sanity Studio라는 사용자 정의 가능한 편집 인터페이스를 통해 콘텐츠를 관리하고 편집할 수 있다.

Sanity는 이러한 특징과 동작 방식을 통해 다양한 웹사이트, 애플리케이션 및 디지털 제품들에서 콘텐츠 관리의 유연성과 확장성을 제공한다. 개발자 중심의 접근 방식과 강력한 API 기능으로 인해 많은 현대적인 프로젝트에서 선호되는 솔루션 중 하나다.

Content Lake 클라우드에 저장되어 있는 데이터를 읽고쓰기 위한 방법 중 하나로, 개발자 모드인 Sanity Studio사용 방법에 대해 알아보자.

## Sanity Studio란?

Sanity Studio는 콘텐츠 생성, 편집 및 작업을 위한 <span style="color:#F05F06">리액트로 만들어진 웹 어플리케이션이다.</span> 기본 JavaScript를 사용하여 설정, 구성 및 사용자 정의할 수 있으며, React와 원하는 라이브러리를 사용하여 확장할 수도 있다. 스튜디오는 쉽게 시작할 수 있도록 의도적으로 설계되었지만 기본적으로 많은 고급 기능을 갖추고 있지만, 필요에 따라 기능을 더 추가할 수 있다.  
Sanity Studio는 단일 페이지 애플리케이션(SPA)이다. 정적 HTML, JS, CSS 파일, 거의 모든 웹 호스팅 서비스를 제공할 수 있는 곳이면 어디든 호스팅할 수 있다.

스튜디오는 Content Lake라는 Sanity의 호스팅 API에 연결된다. 콘텐츠는 항상 실시간으로 동기화되며 로컬에 저장되지 않는다. CLI(Command-Line Interface)에서 스튜디오를 실행하면 편집 경험을 미리 볼 수 있도록 코드를 컴파일하기만 하면 된다. 프로젝트에 공동작업자를 초대하고 명령줄을 사용하여 스튜디오를 빠르게 배포할 수 있다.

## Sanity Studio 사용 방법

### Sanity Studio 설치

1. [Sanity](https://www.sanity.io/)사이트의 오른쪽 상단에 `Get Started` 버튼 클릭 후 로그인.
2. `$ npm -y create sanity@latest`
   ![CMS](/images/posts/nextBlog/sanity3.png)

### Sanity Studio 실행

```bash
$ cd sanity-studio
$ npm run dev
```

> Tailwind 관련 에러가 발생했다면 `tailwind.config.js`파일을 복사하여 **sanity-studio 폴더의 최상위 경로에 붙여 넣은 후 재 실행**한다.
> ![CMS](/images/posts/nextBlog/sanity4.png)

### 스키마 정의

지금까지 sanity 프로젝트를 생성해 보았다. 다음으로
공식문서에 있는 [create a schema](https://www.sanity.io/docs/create-a-schema-and-configure-sanity-studio)를 보면서 차근히 따라해 보자.

```bash
.
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── sanity.cli.js
├── sanity.config.js
├── schemas
│   └── index.js
└── static
```

`schemas` 폴더는 콘텐츠 타입을 정의하는 곳이다.  
`sanity.config.js` 에서는 스튜디오에 관련된 project나 dataset을 정의할 수 있다.

schema란 데이터를 묘사하는 것이다. document type은 NoSQL과 동일한 관계가 없는 JSON과 같은 데이터 타입을 가진다.
예를 들어 schemas폴더에 pet.js파일을 생성하여 pet라는 데이터 타입을 묘사할 수 있다.

```javascript
// schemas/pet.js
export default {
  name: "pet", // 데이터 명
  type: "document", // 타입 : 문서
  title: "Pet", // sanity-studio에서 보여질 제목
  fields: [
    // Pet의 데이터 구조
    {
      name: "name", // field명
      type: "string", // field 타입
      title: "Name", // sanity-studio에서 보여질 field 제목
    },
  ],
};
```

동일한 schemas폴더 안에 있는 index.js파일에 import 하면 Content Lake 클라우드에 자동으로 동기화 되어 정의 된 구조가 업데이트 된다.
스키마를 정의할때 [schema-types](https://www.sanity.io/docs/schema-types)공식 사이트에서 필요한 타입을 찾아 사용하면 된다.

```javascript
// schemas/index.js
import pet from "./pet";

export const schemaTypes = [pet];
```

### 프리뷰(preview) 커스텀

프리뷰를 사용자가 원하는 데이터가 노출 되도록 커스텀 할 수 있다. 기본적인 방법은 공식 사이트 [previews](https://www.sanity.io/docs/previews-list-views)에서 확인할 수 있다.

```javascript
// schemas/pet.js
export default {
  name: "pet",
  type: "document",
  title: "Pet",
  fields: [
    // Pet의 데이터 구조
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Release Date",
      name: "releaseDate",
      type: "date",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "releaseDate",
    },
  },
};
```

![CMS](/images/posts/nextBlog/sanity5.png "preview 적용 화면")
