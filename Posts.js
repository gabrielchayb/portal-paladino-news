var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    titulo: String,
    categoria: String,
    conteudo: String,
    slug: String,
    autor: String,
    imagem: String,
    views: Number
},{collection: 'posts'})

var Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;