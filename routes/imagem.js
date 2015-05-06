module.exports = function(app) {
    var bomberman = app.controllers.imagem;
    app.get('/imageUp',imagem);
    app.post('/resource/bomberman/rooms',utils.ensureAuthenticated,bomberman.createNewRoom);
};