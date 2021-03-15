"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async store({ request, response }) {
        const { name, email, password } = request.post();
        if (!name || !email || !password) {
            response.status(400).json({ error: "Missign body param" });
            return;
        }
        const userExists = await User_1.default.findBy('email', email);
        if (userExists) {
            response.status(400).json({ error: "User already exists" });
            return;
        }
        const user = await User_1.default.create({
            name, email, password
        });
        await user.save();
        response.status(201);
        return user;
    }
    async update({ request, response, auth }) {
        const { name, password, newPassword } = request.post();
        if (!password) {
            response.status(400).json({ error: "Missing password on request body" });
            return;
        }
        const user = await auth.user;
        const passwordCheck = await Hash_1.default.verify(user.password, password);
        if (!passwordCheck) {
            response.status(400).json({ error: "Invalid password" });
            return;
        }
        if (name || newPassword) {
            if (name) {
                user.name = name;
            }
            if (newPassword) {
                user.password = newPassword;
            }
            await user.save();
            return user;
        }
    }
    async destroy({ request, response, auth }) {
        const { password } = request.post();
        if (!password) {
            response.status(400).json({ error: "Missing password on request body" });
            return;
        }
        const user = await auth.user;
        const passwordCheck = await Hash_1.default.verify(user.password, password);
        if (!passwordCheck) {
            response.status(400).json({ error: "Invalid password" });
            return;
        }
        else {
            await user.delete();
            return response.status(200).json({ message: "User deleted with success" });
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UserController.js.map