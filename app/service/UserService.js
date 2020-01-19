const Service = require('egg').Service;
// const md5 = require('md5');
// const _ = require('lodash');
// const uuidv1 = require('uuid/v1');
// const { salt } = require('../common/property');
// const { USERNAME, EMAIL } = require('../common/type');
// const { ROLE_ADMAIN, ROLE_CUSTOMER } = require('../common/role');

const TOKEN = 'token_';

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.UserModel = ctx.model.UserModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  async login(username, password) {
    // 用户名存在报错
    const validResponse = await this.checkValid(USERNAME, username);
    if (validResponse.isSuccess()) return validResponse;

    // 检查密码是否正确
    const user = await this.UserModel.findOne({
      attributes: [ 'id', 'username', 'email', 'phone', 'role' ],
      where: {
        username,
        password: md5(password + salt),
      },
    });

    if (!user) return this.ServerResponse.createByErrorMsg('密码错误');

    const userInfo = user.toJSON()
    let redirectTo
    if (userInfo.role === ROLE_ADMAIN) redirectTo = '/'
    else redirectTo = ''

    return this.ServerResponse.createBySuccessMsgAndData('登录成功', { ...userInfo, redirectTo });
  }
  /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  async checkValid(type, value) {
    if (type.trim()) {
      if (USERNAME === type) {
        return await this._checkExistColByField(USERNAME, value)
          ? this.ServerResponse.createByErrorMsg('用户名已存在')
          : this.ServerResponse.createBySuccessMsg('用户名不存在');
      }
      if (EMAIL === type) {
        return await this._checkExistColByField(EMAIL, value)
          ? this.ServerResponse.createByErrorMsg('邮箱已存在')
          : this.ServerResponse.createBySuccessMsg('邮箱不存在');
      }
    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }
  /**
   *
   * @param field {String}
   * @param value {String}
   * @return {Promise.<boolean>}
   */
  async _checkExistColByField(field, value) {
    const data = await this.UserModel.findOne({
      attributes: [ field ],
      where: { [field]: value },
    });
    return !!data;
  }
  
}

module.exports = UserService;
