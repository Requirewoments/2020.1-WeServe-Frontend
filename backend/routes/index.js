var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Clientes', docs: docs });
  })
})

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro De Servico' });
});

router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var servico = parseInt(req.body.servico);
  global.db.insertOne({nome, servico}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

module.exports = router;