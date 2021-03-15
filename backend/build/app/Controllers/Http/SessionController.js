"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class SessionsController {
    async store({ request, auth }) {
        const { email, password } = request.post();
        const token = await auth.attempt(email, password);
        const user = await User_1.default.findBy('email', email);
        return { ...token, user };
    }
}
exports.default = SessionsController;
//# sourceMappingURL=SessionController.js.map