// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tools from '../../Models/Tools';

export default class ToolsController {

  public async index({ response }) {
    const tools = await Tools.all();

    response.status(200).json(tools);
  }

  public async store({ response, request }) {
    const tools = await Tools.create(request.only([
      'title', 'description', 'link', 'tags_id'
    ]));

    response.status(200).json(tools);
  }

  public async update({ params, request, response }) {
    const tools = await Tools.find(params.id)

    if (tools) {
      tools.merge(request.only([
        'title', 'description', 'link', 'tags_id'
      ]))
      tools.save()
    }

    response.status(200).json(tools);
  }

  public async destroy({ params, response }) {
    const tools = await Tools.find(params.id)

    if (tools) {
      tools.delete();
    }

    response.status(200).json("Ferramenta excluída com sucesso");
  }
}
