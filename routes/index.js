var express = require('express');
var router = express.Router();
var postsService = require('../services/postsService');

/* GET home page. */
router.get('/', function(req, res, next) { /*res é resposta: conteudo, codigo, etc*/
  var posts = postsService.getPosts();

  res.render('index', {posts: posts}); /*esta linha responde a função. render=renderizar o template -- o primeiro post é a var do template*/
});

router.get('/posts', function(req, res, next){

  var posts = postsService.getPosts();

  res.render('all_posts', {posts: posts});
});

router.get('/posts/:postsId', function(req, res, next){

  var postId = req.params.postId;
  var posts = postsService.getPosts();
  var post = posts.filter((post) => post.Id == postId)[0];

  /*for(var i = 0; i < posts.length; i++){
    if(posts[i].id == postId){
      var post = posts[i];
    }
  } */

  res.render('post', {post: post});
});

module.exports = router;