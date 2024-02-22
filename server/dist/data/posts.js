"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
var posts = [
    {
        id: "9mLWnJtMvL1OgKPLcQjjal",
        content: '## 들어가며\r\nNext.js를 사용하면서 Tailwind CSS를 사용했는데 불편한 사항이 이만저만이 아니였다.\r\n나에게 익숙한 건 moudle css인데 Tailwind를 사용해 보니 처음엔 약어를 사용하여 인라인으로 css를 구현할 수 있어서 편하다고 생각했지만, 애니메이션 적용이나 복잡한 그림자 효과를 줄때도 `tailwind.config.js`파일에 등록하여 사용할 수 있다는게 가장 불편했다. \r\n```javascript\r\n/** @type {import(\'tailwindcss\').Config} */\r\nmodule.exports = {\r\n  content: [ ... ],\r\n  theme: { \r\n      keyframes: {\r\n        highlight: {\r\n          "0%, 100%": { backgroundColor: "rgba(229, 231, 235, 1)" }, // bg-gray-200\r\n          "50%": { backgroundColor: "rgba(229, 231, 235, 0.5)" },\r\n        },\r\n      }, \r\n    }, \r\n  plugins: [require("@tailwindcss/typography")],\r\n};\r\n```\r\n\r\n## CSS-in-JS와 전처리기의 차이\r\n### CSS-in-JS란?\r\nCSS-in-JS는 JavaScript를 사용하여 스타일을 정의하는 기법으로 Style이 JavaScript 파일 내부에 포함되어 컴포넌트와 밀접하게 결합된다.\r\n\r\nStyle을 컴포넌트 레벨에서 직접 적용할 수 있으며, 스타일의 범위를 컴포넌트에 한정시키고, 클래스 이름 충돌을 방지하는 등의 이점을 제공한다.\r\n\r\nCSS-in-JS 라이브러리로는 `Tailwind CSS`, `Styled-Components`, `Emotion` 등이 있으며, JavaScript를 사용하여 스타일을 정의하고, 런타임에 CSS를 동적으로 생성한다.\r\n\r\n### CSS 전처리기란?\r\n`CSS의 전처리기 언어`는 CSS를 보다 효율적으로 작성할 수 있도록 확장 기능을 제공하는 스크립팅 언어다. 개발자가 사용하기 쉬운 문법으로 스타일시트를 작성할 수 있게 하며, 이를 표준 CSS로 컴파일하여 웹 브라우저가 이해할 수 있는 형식으로 변환한다. \r\n\r\nCSS 전처리기는 코드의 재사용성, 가독성, 유지 관리 용이성을 향상시키는 다양한 기능을 제공한다.\r\n\r\n**주요 CSS 전처리기**로는 `Sass (Syntactically Awesome Stylesheets)`, `Less (Leaner Style Sheets)`, `Stylus`이 있다.\r\n\r\nSass는 가장 인기 있는 CSS 전처리기 중 하나로, SCSS (Sassy CSS)와 들여쓰기 기반의 오래된 문법 Sass를 지원한다.\r\nSCSS는 CSS와 거의 비슷한 문법을 가지고 있어 CSS 개발자가 쉽게 접근할 수 있다.  \r\n**기능**: `변수`, `중첩 규칙`, `믹스인`, `함수`, `상속` 등  \r\n**파일 확장자**: `.scss` 또는 `.sass`\r\n \r\nCSS 전처리기는 웹 개발의 생산성과 효율성을 높여주는 강력한 도구이지만, 최종 컴파일된 CSS의 크기와 성능을 고려하면서 사용해야 한다.\r\n \r\n## SCSS 사용 방법\r\n### 1. SCSS 설치 및 설정\r\n```bash\r\nnpm install -g sass\r\n```\r\n### 2. SCSS 파일 작성\r\n`.scss` 확장자를 사용하며, 작성 방법은 일반 CSS와 유사하고 SCSS의 추가 기능을 활용할 수 있다.\r\n```scss\r\n// variables.scss\r\n$primary-color: #333;\r\n\r\n// styles.scss\r\n@import "variables";\r\n\r\nbody {\r\n  font-family: \'Helvetica\', sans-serif;\r\n  color: $primary-color;\r\n}\r\n\r\nnav {\r\n  ul {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n  } \r\n}\r\n```\r\n### 3. SCSS 컴파일\r\nSCSS 파일은 브라우저에서 직접 해석될 수 없으므로, 터미널에서 다음 명령어를 사용하여 SCSS 파일을 CSS로 컴파일할 수 있다.\r\n\r\n`input.scss`는 SCSS 파일의 이름이고, `output.css`는 생성될 CSS 파일의 이름으로, 실시간으로 SCSS 파일의 변경사항을 감지하고 자동으로 CSS로 컴파일하려면 `--watch` 옵션을 사용할 수 있다:\r\n```bash\r\nsass input.scss output.css\r\n```\r\n### 4. 컴파일된 CSS 사용\r\n컴파일된 CSS 파일은 일반 CSS 파일처럼 HTML 문서에 포함시켜 사용할 수 있다.\r\n```html\r\n<link rel="stylesheet" href="output.css">\r\n```\r\n### 5. 추가 기능 활용\r\nCSS의 기능을 확장하여 함수, 조건문, 반복문 등의 프로그래밍 언어의 기능들을 사용하여 보다 동적이고 유연한 스타일 시트를 작성할 수 있다.\r\n```scss\r\n// 함수 정의\r\n@function scale($size, $factor) {\r\n  @return $size * $factor;\r\n}\r\n\r\n$theme: "dark";\r\n\r\nbody {\r\n// 함수 사용\r\n  font-size: scale(1rem, 1.2); // 1rem * 1.2 = 1.2rem\r\n\r\n// 조건문\r\n@if $theme == "dark" {\r\n    background-color: #333;\r\n    color: #fff;\r\n  } @else {\r\n    background-color: #fff;\r\n    color: #333;\r\n  }\r\n}\r\n\r\n// 반복문\r\n@for $i from 1 through 3 {\r\n  .item-#{$i} {\r\n    background-color: mix(#fff, #000, $i * 20%);\r\n  }\r\n}\r\n\r\n@mixin flex-center {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.container {\r\n  @include flex-center;\r\n}\r\n```\r\n\r\n## 마무리\r\nCSS의 전처리기 중 가장 인기가 많은 SCSS로 마이그레이션하면서 발생하는 에러나 기술에 대해 기록해가겠다.',
        title: "Tailwind CSS에서 SCSS로 마이그레이션 하는 이유",
        updatedAt: new Date(),
        image: "https://cdn.sanity.io/images/sstznhcv/production/c3d01c4d1fcbc94350bbb36b0477f13d5784d1b3-1792x1024.png?w=800",
        createdAt: new Date(),
        category: "CSS",
        description: "CSS-in-JS의 한계와 불편한 점과 SCSS의 사용방법에 대해 알아본다.",
    },
    {
        updatedAt: new Date(),
        description: "Vercel 배포 시, .env 설정 누락으로 인한 에러 해결.",
        image: "https://cdn.sanity.io/images/sstznhcv/production/6d78dec2f1fd7371f87895b48e3797f367cead42-1792x1024.png?w=800",
        title: "Vercel 배포 시 `.env` 설정",
        createdAt: new Date(),
        content: '## 문제\r\n\r\nVercel에 배포하는 과정에서 Sanity 클라이언트를 초기화하는 데 필요한 projectId가 제공되지 않았음을 나타내는 에러가 발생했다. `/api/posts` API 경로에서 Sanity 클라이언트를 생성하는 과정에서 `project Id`가 설정되지 않았기 때문에 발생하는 문제로 보인다.\r\n![Memory](/images/posts/nextBlog/sanityError.png)\r\n\r\n## 해결\r\n\r\n해결 방법으로는 NEXT_PUBLIC 접두어를 사용하여 클라이언트 사이드에서도 접근 가능하게 설정 또는 프로젝트 루트 또는 sanity.json, client.js, sanityClient.js 등의 파일에서 Sanity 클라이언트를 초기화하는 방법 등 이 있었지만, 근본적인 원인은 Vercel에 배포할때 .env.local 설정을 변경 했다면 Vercel 프로젝트 설정에서 해당 환경 변수를 설정해야 한다. Vercel 대시보드에서 프로젝트 설정으로 이동한 후 "Environment Variables" 섹션에 projectId를 추가하면 된다.\r\n![Memory](/images/posts/nextBlog/sanityError1.png)\r\n',
        id: "6FvsXJJcLkK2XL8WB2JGwf",
        category: "NextJS",
    },
];
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, posts];
        });
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            found = posts.find(function (post) { return post.id === id; });
            if (!found) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, found];
        });
    });
}
exports.getById = getById;
function create(createData) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            post = __assign(__assign({ id: Date.now().toString() }, createData), { createdAt: new Date(), updatedAt: new Date() });
            posts = __spreadArray([post], posts, true);
            return [2 /*return*/, post];
        });
    });
}
exports.create = create;
function update(postId, updateData) {
    return __awaiter(this, void 0, void 0, function () {
        var title, description, category, content, image, post;
        return __generator(this, function (_a) {
            title = updateData.title, description = updateData.description, category = updateData.category, content = updateData.content, image = updateData.image;
            post = posts.find(function (post) { return post.id === postId; });
            if (!post) {
                return [2 /*return*/, null];
            }
            post.title = title;
            post.description = description;
            post.category = category;
            post.content = content;
            post.image = image;
            return [2 /*return*/, post];
        });
    });
}
exports.update = update;
function remove(postId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            posts = posts.filter(function (post) { return post.id !== postId; });
            return [2 /*return*/];
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=posts.js.map