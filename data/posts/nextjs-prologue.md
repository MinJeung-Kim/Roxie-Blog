## Intro

코어 자바스크립트 책을 읽고 공부한 내용을 토론하는 스터디를 통해 그동안 Git Book으로 내용을 정리해 왔지만 쓰다보니 이런저런 불편한 것들이 있었다. Tstory는 내 입맛에 맞게 커스텀하기에 복잡하고 어려워서 이럴바에는 포트폴리오도 만들겸 나만의 블로그를 만들어봐야겠다는 취지로 Next.js를 이용해서 블로그를 만들어 보았다.  
Next.js를 공부하고 있었기에 React, Typescript, TailwindCSS를 사용하여 구현했다.

### NextJS란?

Next.js는 React Framework로, 웹어플리케이션을 만드는데 필요한 전체적인 솔루션을 제공한다.
서버사이드 렌더링(SSR)과 정적 사이트 생성(Static Site Generation, SSG)을 지원하며 사용자 경험과 검색 엔진 최적화(SEO)를 향상시키기 위해 고안되었다.

## 개발 환경

[NodeJS](https://nodejs.org/en) v18.17.0  
[Npm](https://www.npmjs.com/package/npm/v/9.5.1) 9.6.7  
[NextJS](https://nextjs.org/) 13.4.9  
[ReactJS](https://react.dev/) 18.2.15  
[TypeScript](https://www.typescriptlang.org/) 5.1.6  
[TailwindCSS](https://tailwindcss.com/) 3.3.2

## 배포

[Vercel](https://vercel.com/docs)은 웹 개발자에게 애플리케이션을 구축하고 배포하는 탁월한 방법을 제공하는 강력한 클라우드 플랫폼이다.  
주요 장점으로는

1. **개발 프로세스 간소화**: 자동 배포 기능을 제공하므로 개발자는 코드를 GitHub에 push하기만 하면 즉시 배포가 이루어지며, 복잡한 서버 설정이나 배포 스크립트 작성 없이 신속하게 웹 애플리케이션을 공개할 수 있게 한다​.
2. **모니터링 및 분석 도구**: 애플리케이션의 성능을 실시간으로 모니터링하고, 사용자 행동에 대한 분석을 제공한다. Vercel의 대시보드에서는 트래픽, 오류율, 응답 시간 등 중요한 메트릭 확인이 가능하여 개발자는 애플리케이션의 성능 문제를 식별하고, 사용자 경험을 개선할 수 있는 방향을 찾을 수 있다.
3. **확장성**: 트래픽 증가나 기능 추가에 따라 자동으로 확장되어 성능 저하 없이 응답성과 신뢰성을 유지하기때문에 예기치 않은 트래픽 증가에도 끄떡없이 서비스를 유지할 수 있게 한다.
4. **빠른 로딩 속도**: 전 세계 CDN을 통해 애플리케이션의 로딩 속도를 최적화한다. 이미지 최적화, 자산 압축 등의 기능을 통해 웹 페이지의 로딩 시간을 줄일 수 있다. 이러한 기능들은 사용자 경험을 향상시키고 검색 엔진 최적화(SEO)에도 긍정적인 영향을 미친다.
5. **보안 및 신뢰성**: SSL 인증서, DDoS 보호 및 보안 인프라와 같은 강력한 보안 조치를 제공하여 웹 애플리케이션과 사용자 데이터를 보호하며, 안정적인 서비스를 제공하여 다운타임을 최소화하고 일관된 사용자 경험을 보장한다.
6. **비용 효율성**: 무료 플랜을 사용하여 개인 프로젝트를 호스팅할 수 있으며, 필요에 따라 유료 플랜으로 업그레이드하여 더 많은 기능과 리소스를 이용할 수 있다.
7. **개발자 경험 향상**: 자동화된 기능, 실시간 협업, 사용자 친화적인 인터페이스를 통해 복잡한 작업을 단순화하고, 창의성과 문제 해결에 집중할 수 있게하므로 개발자의 전반적인 경험을 향상시킨다.

### 배포 방법

1. **Repository 생성 및 코드 push**
   ![Memory](/images/posts/nextBlog/blog1.png)
2. **Vercel 회원 가입**

- Hobby : 개인용
- Pro : 상업용  
   ![Memory](/images/posts/nextBlog/blog2.png)

3. **Github Continue**

- Continue With Github -> Authorize Vercel.
  ![Memory](/images/posts/nextBlog/blog3.png)

4. **Vercel 설치**

- Import Git Repository -> Add GitHub Account -> Only select repositories -> Select repositories -> 배포할 레포지토리 선택.
- All repositories : 모들 레포지토리에 설치.
- Only select repositories : 1개 레포지토리에 설치.
  ![Memory](/images/posts/nextBlog/blog4.png)

5. **Import Git Repository**

- Project Name : 프로젝트 명
- Framework Preset : 사용중인 프레임워크 선택
- Root Directory : 보통 최상위 경로 ( ./ )
- Build and Output Settings : 빌드 후 아웃풋할때 특정 명령어 설정.
- Build Command : 원하는 명령어 작성.
- Environment Variables : .env 파일의 key와 value 작성.
  ![Memory](/images/posts/nextBlog/blog5.png)

6. **배포된 상태 확인**

- DEPOYMENT : 배포된 URL.
- DOMAINS : 도메인
- STATUS : Readey(준비됨) 현재 상태.
- CREATED : 생성된 시간.
- BRANCH : 브랜치 명.
  ![Memory](/images/posts/nextBlog/blog6.png)

7. **배포사항 확인**

- Production : main url에 반영된 상태.
- Production(Current) : 현재 배포한 상태의 변경 사항.
- Preview : 배포는 아니고 commit확인을 위한 미리보기용.
  ![Memory](/images/posts/nextBlog/blog7.png)

## 마무리

이번 포스트에서는 간단한 NextJS 개념과 개발환경, 배포 과정을 정리해 보았다.  
앞으로 다양한 기능(댓글, 목차, 방문자 수 등)들을 구현하면서 구현 과정과 트러블슈팅 등을 정리할 예정이다.

### 추가 기능 계획

- [x] TOC 목차
- [ ] 방문자수(오늘 방문자 수 / 총 방문자 수)
- [ ] 좋아요 기능
- [ ] 댓글 기능
- [ ] 태그 - 클릭하면 태그가 있는 포스트 리스트 보여주기
- [ ] RESTful API
- [ ] .md파일 글쓰기 페이지 생성 - post 추가, 수정, 삭제 기능.
- [ ] 전체 게시글 `더보기` 기능.
