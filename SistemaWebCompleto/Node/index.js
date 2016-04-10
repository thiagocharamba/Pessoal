
var Sabores = [];
var ListaCompras = [];

var bodyParser = require('body-parser');
var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var Server = require('mongodb').Server;

var router = express.Router();
var app = express();

var carregarInformacoes = 1;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/carregarInformacoes', function(req, res){

  	console.log('');
	console.log('-- CARREGAR ---------------------------------------------------------');
	console.log('');

    console.log(' --> Informações carregadas ' + (carregarInformacoes++) + ' vez(es)');

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findPedidos(db, function() {
	      db.close();
	  });
	  findSabores(db, function() {
	      db.close();
	  });
	});

    console.log('');
	console.log('-- CARREGAR ---------------------------------------------------------');
	console.log('');

	var response = { ListaCompras: ListaCompras, Sabores: Sabores };
    res.send(response);

}).listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/NovoPedido', function(req, res) {
  	
  	console.log('');
	console.log('-- CADASTRO ---------------------------------------------------------');
	console.log('');

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertPedido(db, function() {
	  }, req.body);

	  Sabores.forEach(function (item) {
	        if (req.body.shakeNome == item.nome) {

	        	var dado = { nome: item.nome, saida: (item.saida + 1), estoque: (item.estoque - 1) };

				updatePedido(db, function() {

					console.log(' --> [MONGODB] Total de milk shake de ' + req.body.shakeNome + ' vendidos - ' + dado.saida);
					console.log(' --> [MONGODB] Total de milk shake de ' + req.body.shakeNome + ' em estoque - ' + dado.estoque);

				}, dado);
	        }
	   });
	  
	  findPedidos(db, function() {
	  });

	  findSabores(db, function() {
	      db.close();
	  });
	});

	console.log('');
	console.log('-- CADASTRO ---------------------------------------------------------');
	console.log('');

	var response = { ListaCompras: ListaCompras, Sabores: Sabores };

    res.send(response);
});

app.post('/ExcluirPedido', function(req, res) {

	console.log('');
	console.log('-- EXCLUIR ----------------------------------------------------------');
	console.log('');

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  removePedido(db, function() {
	  }, req.body);

	  Sabores.forEach(function (item) {
	        if (req.body.shakeNome == item.nome) {

	        	var dado = { nome: item.nome, saida: (item.saida - 1), estoque: (item.estoque + 1) };

				updatePedido(db, function() {

					console.log(' --> [MONGODB] Total de milk shake de ' + req.body.shakeNome + ' vendidos - ' + dado.saida);
					console.log(' --> [MONGODB] Total de milk shake de ' + req.body.shakeNome + ' em estoque - ' + dado.estoque);

				}, dado);
	        }
	   });

	  findPedidos(db, function() {
	  });
	  findSabores(db, function() {
	      db.close();
	  });
	});

	console.log('');
	console.log('-- EXCLUIR ----------------------------------------------------------');
	console.log('');

	var response = { ListaCompras: ListaCompras, Sabores: Sabores };

    res.send(response);
});

console.log('');
console.log('-- SERVIDOR ----------------------------------------------------------');
console.log('');
console.log(' --> Servidor levantado na porta: 3000');
console.log('');
console.log('-- SERVIDOR ----------------------------------------------------------');
console.log('');

module.exports = router;

var findPedidos = function(db, callback) {
   ListaCompras = [];
   var cursor = db.collection('Pedidos').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if(doc != null){
      	ListaCompras.push(doc);
      }
   });
   console.log(' --> [MONGODB] Carregou todos os pedidos');
};

var findSabores = function(db, callback) {
   Sabores = [];
   var cursor = db.collection('Sabores').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if(doc != null){
      	Sabores.push(doc);
      }
   });
   console.log(' --> [MONGODB] Carregou todos os sabores');
};

var insertPedido = function(db, callback, data) {
   db.collection('Pedidos').insertOne(data, function(err, result) {
    assert.equal(err, null);
    console.log(' --> [MONGODB] Novo pedido para o cliente ' + data.nome + ' sabor ' + data.shakeNome);
    callback(result);
  });
};

var removePedido = function(db, callback, data) {
   db.collection('Pedidos').deleteMany(
      { nome: data.nome },
      function(err, results) {
		 console.log(' --> [MONGODB] Pedido para ' + data.nome + ' com sabor ' + data.shakeNome + ' excluido');
         callback();
      }
   );
};

var updatePedido = function(db, callback, data) {
   db.collection('Sabores').updateOne(
      { nome: data.nome },
      {
        $set: { saida: data.saida, estoque: data.estoque }
      }, 
      function(err, results) {
		console.log(' --> [MONGODB] Estoque do sabor ' + data.nome + ' atualizado com sucesso');
        callback();
	  }
	);
};