// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tools from '../../Models/Tools';

export default class ToolsController {

  public async index({ response }) {
    const tools = await Tools.all();

    response.status(200).json(tools);
  }

  public async store({ response, request }) {
    const { title, link, description, tags } = request.post()

    if (!title || !link || !tags) {
      response.status(400).json({ error: "Missing 'title', 'link' or 'tags' on request body" })
      return;
    }

    // const toolExists = await Tools.findBy({ title: title.toLowerCase(), user_id: user.id })

    // if (toolExists) {
    //   response.status(400).json({ error: `Tool '${title}' already exists` })
    //   return;
    // }

    const tools = await Tools.create(request.only([
      'title', 'description', 'link', '[tags]'
    ]));

    response.status(201).json(tools);
  }

  public async update({ params, request, response }) {
    const tools = await Tools.find(params.id)

    if (tools) {
      tools.merge(request.only([
        'title', 'description', 'link', '[tags]'
      ]))
      tools.save()
    }

    response.status(200).json(tools);
  }

  public async destroy({ params, response }) {
    const tool = await Tools.find(params.id)
    
    if (!tool) {
      response.status(400).json({ error: `Tool not found` })
    } else {
      tool.delete();
      response.status(200).json({ message: "Tool excluded with success" });
    }

  }
}
