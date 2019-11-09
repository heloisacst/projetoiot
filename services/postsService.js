var fs = require('fs');

var postsFilePath = 'db/posts.json'; //caminho do arquivo

var loadFilePosts = function () {
    var fileData = fs.readFileSync(postsFilePath, 'utf8'); //le5r arquivo de um diretório
    var posts = JSON.parse(fileData);

    return posts;
}

var getPosts = function () {
    var posts = loadFilePosts();

    return posts;
}

var saveFilePosts = function (posts) {
    var data = JSON.stringify(posts);
    fs.writeFileSync(postsFilePath, data, 'utf-8');

}

var savePost = function (newPost) {
    var posts = loadFilePosts();
    posts.push(newPost);
    saveFilePosts(posts);

}

module.exports = { //serve para exportar somente o que o usuário terá acesso
    getPosts: getPosts,
    savePost: savePost
}