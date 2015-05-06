module.exports = function(app) {
    var utilsImagem = app.utils.imagem;
    var imagem = {
        adicionarImagem: function(req, res) {
            utilsImagem.salvarImagem(req.body.imagem,'.jpg',function(err) {
                if(err) {
                    return res.status(500).send(room);
                }
                res.status(201).send('endereco');
            });           
        }
    };
    return imagem;
};