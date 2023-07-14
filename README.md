## 프로젝트 소개
- 정적인 웹사이트.
- Next.js 입문용 포트폴리오.


## ⚙️🚩개발 환경

- `TypeScript`
- `Next.js`
- `Tailwind CSS`

#### Library
- [nodemailer](https://nodemailer.com/about/)
- [yup](https://github.com/jquense/yup)
- [markdown](https://github.com/remarkjs/react-markdown)
- [carousel](https://github.com/YIZHUANG/react-multi-carousel)

## 📌주요 기능
#### Home
- 로고
   - 클릭 시, home으로 이동
- 나를 소개하는 컴포넌트
- 포스트 중에서 홈페이지에 보여주고 싶은 포스트만 노출
   - 선택 시, 해당 포스트로 이동.
- 포스트 중에서 featured posts를 제외한 모든 포스트 노출.
   - carousel 라이브러리 사용.
 
#### About
- 간략한 소개 내용.

#### Contact
- 소셜 링크
- 실제 이메일 전송 기능.
   - nodemailer, yup 라이브러리 사용. 

#### Posts
- post 전부 카테고리 형태로 나열.
- 카테고리 별 포스트 필터링.
   - markdown 라이브러리 사용.
- 이전 포스트와 다음 포스트로 이동할 수 있는 링크 제공.
