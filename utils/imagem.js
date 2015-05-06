module.exports = function (app) {
    
    var fs = require('fs');
    var diretorioImagem = 'publico/images/'
    var diretorioContador = 'contador';
    var contador = 0;

    (function definirContador() {
        fs.readFile('contador', 'utf8', function (err,data) {
          if (err) {
            console.log(err);
          }
          contador = parseInt(data);
        });
    })();



    var image = {
        salvarImagem : function(imagem,formatoImagem,callback) {
            var enderecoImagem = diretorioImagem+contador+formatoImagem;
            fs.writeFile(enderecoImagem,imagem,function(err) {
                if(err) {
                    console.log(err);
                    return callback(err);    
                }
                console.log(enderecoImagem+' salvo com sucesso');
                ++contador;
                escreverContador();
                callback();
            });
        }
    }

    function escreverContador() {
        fs.writeFile(diretorioContador,contador,function(err) {
            if(err) {
                return console.log(err);
            }
            console.log('Contador foi salvo com o valor:'+contador)
        });
    }

    return image;
}