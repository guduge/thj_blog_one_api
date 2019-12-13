'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // ctx.body = ctx.isIos ? 'hi, egg on ios' : 'hi, egg ';
    ctx.body = ctx.getUA;
  }
}

module.exports = HomeController;
