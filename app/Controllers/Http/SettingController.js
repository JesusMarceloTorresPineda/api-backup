'use strict'

const Setting = use('App/Models/Setting')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class SettingController {

  async index ({ request, response, view }) {
    let settings = await Setting.all();
    return response.status(200).json(settings);
  }

  async store ({ request, response }) {
    let setting = await Setting.create(request.all());
        return response.created(setting);
  }

  async show ({ params, request, response, view }) {
    let {id} = params;
      let setting = await Setting.findOrFail(id);
      return response.ok(setting);
  }

  async update ({ params, request, response }) {
    let {id} = params;
    let setting = await Setting.findOrFail(id);

    if(request._qs['type'] == 1){
      setting.merge(request.all());
    }
    setting.merge(request.all());
    await setting.save();
    return response.ok(setting);
  }

  async destroy ({ params, request, response }) {
    let {id} = params;
    let setting = await Setting.findOrFail(id);

    await setting.delete();
    return response.ok({ message : 'Recurso eliminado '});
  }
}

module.exports = SettingController
