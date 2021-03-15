"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = __importDefault(require("../../Models/Tools"));
class ToolsController {
    async index({ request }) {
        const { tag } = request.get();
        let tools;
        if (tag) {
            let lowerCasetag = tag.toLowerCase();
            while (lowerCasetag[lowerCasetag.length - 1] === ',') {
                lowerCasetag = lowerCasetag.slice(0, -1);
            }
            tools = await Tools_1.default.query().where('tags', '@>', `{${lowerCasetag}}`);
        }
        else {
            tools = await Tools_1.default.all();
        }
        return tools;
    }
    async store({ response, request, auth }) {
        const { title, link, description, tags } = request.post();
        if (!title || !link || !tags) {
            response.status(400).json({ error: "Missing 'title', 'link' or 'tags' on request body" });
            return;
        }
        const toolExists = await Tools_1.default.findBy("title", title);
        if (toolExists) {
            response.status(400).json({ error: `Tool '${title}' already exists` });
            return;
        }
        const lowerCasetags = tags.map(tag => tag.toLowerCase());
        const tools = await Tools_1.default.create({
            title: title,
            description,
            link,
            tags: lowerCasetags,
            user_id: auth.user.id,
        });
        response.status(201).json(tools);
    }
    async update({ request, response, auth }) {
        const { title, link, description, tags, id } = request.post();
        if (!id || !title) {
            response.status(400).json({ error: 'Missing "id" or "title" field on body' });
            return;
        }
        const tool = await Tools_1.default.find(id);
        if (tool !== null) {
            if (auth.user.id !== tool.user_id) {
                return response
                    .status(500)
                    .json({ message: "Youn don't have permission to do this" });
            }
            if (tool.title !== title) {
                const toolExists = await Tools_1.default.findBy('title', title);
                if (toolExists) {
                    response.status(400).json({ error: `Tool '${title}' already exists` });
                    return;
                }
            }
            tool.title = title;
            if (link) {
                tool.link = link;
            }
            if (description) {
                tool.description = description;
            }
            if (tags) {
                tool.tags = tags;
            }
            await tool.save();
        }
        response.status(200).json(tool);
    }
    async destroy({ params, response, auth }) {
        const tool = await Tools_1.default.find(params.id);
        if (tool !== null) {
            if (auth.user.id !== tool.user_id) {
                return response
                    .status(500)
                    .json({ message: "Youn don't have permission to do this" });
            }
        }
        if (!tool) {
            response.status(400).json({ error: `Tool not found` });
            return;
        }
        else {
            await tool.delete();
            return response.status(200).json({ message: "Tool deleted with success" });
        }
    }
}
exports.default = ToolsController;
//# sourceMappingURL=ToolsController.js.map