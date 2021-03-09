// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tags from '../../Models/Tags';

export default class TagsController {

  public async index({ response }) {
    const tags = await Tags.all();

    response.status(200).json(tags);
  }

  public async store({ response, request }) {
    const tags = await Tags.create(request.only(['name']));

    response.status(200).json(tags);
  }

  public async update({ params, request, response }) {
    const tags = await Tags.find(params.id)

    if (tags) {
      tags.merge(request.only(['name']))
      tags.save()
    }

    response.status(200).json(tags);
  }

  public async destroy({ params, response }) {
    const tags = await Tags.find(params.id)

    if (tags) {
      tags.delete();
    }

    response.status(200).json("Tag escluída com sucesso");
  }
}
