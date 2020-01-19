'use strict';

const Controller = require('egg').Controller;
// eslint-disable-next-line no-unused-vars
const _ = require('lodash');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.UserModel = ctx.model.UserModel;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 登录
  async login() {
    const { username, password } = this.ctx.request.body;
    const response = await this.UserService.login(username, password);

    if (response.isSuccess()) {
      this.session.currentUser = response.getData();
    }

    this.ctx.body = response;
  }

  // 登出
  async logout() {
    this.ctx.session = null;
    this.ctx.body = this.ServerResponse.createBySuccess();
  }

  // 注册
  async register() {
    const user = this.ctx.request.body;
    const respponse = await this.UserService.register(user);
    this.ctx.body = respponse;
  }

}


module.exports = UserController;
