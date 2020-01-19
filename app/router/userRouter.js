module.exports = app => {
    app.router.post('/user/register', app.controller.userController.register);
    app.router.post('/user/login', app.controller.userController.login);
    app.router.get('/user/logout', app.controller.userController.logout);
}
