'use strict';

const Controller = require('egg').Controller;
class CookieController extends Controller {
    
    async remove() {
      const ctx = this.ctx;
      const count = ctx.cookies.set('count', null);
      ctx.status = 200;
      ctx.body = 0;
    }
    async add() {
        const ctx = this.ctx;
        let count = ctx.cookies.get('count');
        count = count ? Number(count) : 0;
        ctx.cookies.set('count', ++count);
        ctx.body = count;
      }
  }
  module.exports = CookieController;