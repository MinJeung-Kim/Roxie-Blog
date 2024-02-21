"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const posts_1 = __importDefault(require("./router/posts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use("/posts", posts_1.default);
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((error, res, next) => {
    console.error(error);
    res.sendStatus(500);
});
app.listen(8080);
//# sourceMappingURL=app.js.map