## 문제

Vercel에 배포하는 과정에서 Sanity 클라이언트를 초기화하는 데 필요한 projectId가 제공되지 않았음을 나타내는 에러가 발생했다. `/api/posts` API 경로에서 Sanity 클라이언트를 생성하는 과정에서 `project Id`가 설정되지 않았기 때문에 발생하는 문제로 보인다.
![Memory](/images/posts/nextBlog/sanityError.png)

## 해결

해결 방법으로는 NEXT_PUBLIC 접두어를 사용하여 클라이언트 사이드에서도 접근 가능하게 설정 또는 프로젝트 루트 또는 sanity.json, client.js, sanityClient.js 등의 파일에서 Sanity 클라이언트를 초기화하는 방법 등 이 있었지만, 근본적인 원인은 Vercel에 배포할때 .env.local 설정을 변경 했다면 Vercel 프로젝트 설정에서 해당 환경 변수를 설정해야 한다. Vercel 대시보드에서 프로젝트 설정으로 이동한 후 "Environment Variables" 섹션에 projectId를 추가하면 된다.
![Memory](/images/posts/nextBlog/sanityError1.png)
