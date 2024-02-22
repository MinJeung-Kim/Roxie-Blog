"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var posts_1 = __importDefault(require("./router/posts"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use("/posts", posts_1.default);
// 지원하지 않는 API요청
app.use(function (req, res, next) {
    res.sendStatus(404);
});
// error은 타입이 없기때문에 any로 타입 정의
app.use(function (error, res, next) {
    console.error(error);
    res.sendStatus(500);
});
app.listen(8080, function () {
    console.log("Started!");
});
//# sourceMappingURL=app.js.map