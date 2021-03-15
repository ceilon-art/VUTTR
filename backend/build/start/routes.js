"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/user', 'UserController.store');
Route_1.default.put('/user', 'UserController.update').middleware('auth');
Route_1.default.delete('/user', 'UserController.destroy').middleware('auth');
Route_1.default.post('/session', 'SessionController.store');
Route_1.default.get('/tools', "ToolsController.index").middleware('auth');
Route_1.default.post('/tools', "ToolsController.store").middleware('auth');
Route_1.default.put('/tools', "ToolsController.update").middleware('auth');
Route_1.default.delete('/tools/:id', "ToolsController.destroy").middleware('auth');
//# sourceMappingURL=routes.js.map