"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const error_1 = __importDefault(require("./middlewares/error"));
const user_route_1 = __importDefault(require("./routes/user.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.app.use('/', user_route_1.default);
        this.app.use(error_1.default);
    }
    config() {
        this.app.use(express_1.default.json());
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
exports.app = new App().app;
