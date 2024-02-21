"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts = [
    {
        id: "rGZ2nN6K5mjOGJOoWO6vTj",
        content: '## 들어가며\r\nNext.js를 사용하면서 Tailwind CSS를 사용했는데 불편한 사항이 이만저만이 아니였다.\r\n나에게 익숙한 건 moudle css인데 Tailwind를 사용해 보니 처음엔 약어를 사용하여 인라인으로 css를 구현할 수 있어서 편하다고 생각했지만, 애니메이션 적용이나 복잡한 그림자 효과를 줄때도 `tailwind.config.js`파일에 등록하여 사용할 수 있다는게 가장 불편했다. \r\n```javascript\r\n/** @type {import(\'tailwindcss\').Config} */\r\nmodule.exports = {\r\n  content: [ ... ],\r\n  theme: { \r\n      keyframes: {\r\n        highlight: {\r\n          "0%, 100%": { backgroundColor: "rgba(229, 231, 235, 1)" }, // bg-gray-200\r\n          "50%": { backgroundColor: "rgba(229, 231, 235, 0.5)" },\r\n        },\r\n      }, \r\n    }, \r\n  plugins: [require("@tailwindcss/typography")],\r\n};\r\n```\r\n\r\n## CSS-in-JS와 전처리기의 차이\r\n### CSS-in-JS란?\r\nCSS-in-JS는 JavaScript를 사용하여 스타일을 정의하는 기법으로 Style이 JavaScript 파일 내부에 포함되어 컴포넌트와 밀접하게 결합된다.\r\n\r\nStyle을 컴포넌트 레벨에서 직접 적용할 수 있으며, 스타일의 범위를 컴포넌트에 한정시키고, 클래스 이름 충돌을 방지하는 등의 이점을 제공한다.\r\n\r\nCSS-in-JS 라이브러리로는 `Tailwind CSS`, `Styled-Components`, `Emotion` 등이 있으며, JavaScript를 사용하여 스타일을 정의하고, 런타임에 CSS를 동적으로 생성한다.\r\n\r\n### CSS 전처리기란?\r\n`CSS의 전처리기 언어`는 CSS를 보다 효율적으로 작성할 수 있도록 확장 기능을 제공하는 스크립팅 언어다. 개발자가 사용하기 쉬운 문법으로 스타일시트를 작성할 수 있게 하며, 이를 표준 CSS로 컴파일하여 웹 브라우저가 이해할 수 있는 형식으로 변환한다. \r\n\r\nCSS 전처리기는 코드의 재사용성, 가독성, 유지 관리 용이성을 향상시키는 다양한 기능을 제공한다.\r\n\r\n**주요 CSS 전처리기**로는 `Sass (Syntactically Awesome Stylesheets)`, `Less (Leaner Style Sheets)`, `Stylus`이 있다.\r\n\r\nSass는 가장 인기 있는 CSS 전처리기 중 하나로, SCSS (Sassy CSS)와 들여쓰기 기반의 오래된 문법 Sass를 지원한다.\r\nSCSS는 CSS와 거의 비슷한 문법을 가지고 있어 CSS 개발자가 쉽게 접근할 수 있다.  \r\n**기능**: `변수`, `중첩 규칙`, `믹스인`, `함수`, `상속` 등  \r\n**파일 확장자**: `.scss` 또는 `.sass`\r\n \r\nCSS 전처리기는 웹 개발의 생산성과 효율성을 높여주는 강력한 도구이지만, 최종 컴파일된 CSS의 크기와 성능을 고려하면서 사용해야 한다.\r\n \r\n## SCSS 사용 방법\r\n### 1. SCSS 설치 및 설정\r\n```bash\r\nnpm install -g sass\r\n```\r\n### 2. SCSS 파일 작성\r\n`.scss` 확장자를 사용하며, 작성 방법은 일반 CSS와 유사하고 SCSS의 추가 기능을 활용할 수 있다.\r\n```scss\r\n// variables.scss\r\n$primary-color: #333;\r\n\r\n// styles.scss\r\n@import "variables";\r\n\r\nbody {\r\n  font-family: \'Helvetica\', sans-serif;\r\n  color: $primary-color;\r\n}\r\n\r\nnav {\r\n  ul {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n  } \r\n}\r\n```\r\n### 3. SCSS 컴파일\r\nSCSS 파일은 브라우저에서 직접 해석될 수 없으므로, 터미널에서 다음 명령어를 사용하여 SCSS 파일을 CSS로 컴파일할 수 있다.\r\n\r\n`input.scss`는 SCSS 파일의 이름이고, `output.css`는 생성될 CSS 파일의 이름으로, 실시간으로 SCSS 파일의 변경사항을 감지하고 자동으로 CSS로 컴파일하려면 `--watch` 옵션을 사용할 수 있다:\r\n```bash\r\nsass input.scss output.css\r\n```\r\n### 4. 컴파일된 CSS 사용\r\n컴파일된 CSS 파일은 일반 CSS 파일처럼 HTML 문서에 포함시켜 사용할 수 있다.\r\n```html\r\n<link rel="stylesheet" href="output.css">\r\n```\r\n### 5. 추가 기능 활용\r\nCSS의 기능을 확장하여 함수, 조건문, 반복문 등의 프로그래밍 언어의 기능들을 사용하여 보다 동적이고 유연한 스타일 시트를 작성할 수 있다.\r\n```scss\r\n// 함수 정의\r\n@function scale($size, $factor) {\r\n  @return $size * $factor;\r\n}\r\n\r\n$theme: "dark";\r\n\r\nbody {\r\n// 함수 사용\r\n  font-size: scale(1rem, 1.2); // 1rem * 1.2 = 1.2rem\r\n\r\n// 조건문\r\n@if $theme == "dark" {\r\n    background-color: #333;\r\n    color: #fff;\r\n  } @else {\r\n    background-color: #fff;\r\n    color: #333;\r\n  }\r\n}\r\n\r\n// 반복문\r\n@for $i from 1 through 3 {\r\n  .item-#{$i} {\r\n    background-color: mix(#fff, #000, $i * 20%);\r\n  }\r\n}\r\n\r\n@mixin flex-center {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.container {\r\n  @include flex-center;\r\n}\r\n```\r\n\r\n## 마무리\r\nCSS의 전처리기 중 가장 인기가 많은 SCSS로 마이그레이션하면서 발생하는 에러나 기술에 대해 기록해가겠다.',
        title: "Tailwind CSS에서 SCSS로 마이그레이션 하는 이유",
        updatedAt: "2024-02-20T18:03:54Z",
        image: "https://cdn.sanity.io/images/sstznhcv/production/c3d01c4d1fcbc94350bbb36b0477f13d5784d1b3-1792x1024.png?w=800",
        createdAt: "2024-02-20T18:00:47Z",
        category: "CSS",
        description: "CSS-in-JS의 한계와 불편한 점과 SCSS의 사용방법에 대해 알아본다.",
    },
];
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    const data = posts;
    res.status(200).json(data);
});
exports.default = router;
//# sourceMappingURL=posts.js.map