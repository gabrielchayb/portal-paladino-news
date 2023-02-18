const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const path = require('path');

const app = express();

const Posts = require('./Posts.js');

var session = require('express-session');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://root:Saturno1@cluster0.4ymyf.mongodb.net/gabrielnews?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('Conectado com sucesso');
}).catch(function(err){
    console.log(err.message);
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(session({
    name : 'codeil',
    secret : 'something',
    resave :false,
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }      
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{
    
    if(req.query.busca == null){
        Posts.find({}).sort({'_id': -1}).exec(function(err,posts){
           // console.log(posts[0]);
            posts = posts.map(function(val){
                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substr(0,100),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria
                        
                    }
            })

            
            Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){
                // console.log(posts[0]);
                 postsTop = postsTop.map(function(val){
                         return {
                             titulo: val.titulo,
                             conteudo: val.conteudo,
                             descricaoCurta: val.conteudo.substr(0,100),
                             imagem: val.imagem,
                             slug: val.slug,
                             categoria: val.categoria,
                             views: val.views
                             
                         }
                 })

                 

                 res.render('home',{posts:posts,postsTop:postsTop});
                
             })

             

            
        })
        
    }else{

        Posts.find({titulo: {$regex: req.query.busca,$options:"i"}},function(err,posts){
            console.log(posts);
            posts = posts.map(function(val){
                return {
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0,100),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                    views: val.views
                    
                }
        })
            res.render('busca',{posts:posts,contagem:posts.length});
        })


        
    }

  
});


app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    Posts.findOneAndUpdate({slug: req.params.slug}, {$inc : {views: 1}}, {new: true},function(err,resposta){
       // console.log(resposta);
       if(resposta != null){

        Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){
            // console.log(posts[0]);
             postsTop = postsTop.map(function(val){
                     return {
                         titulo: val.titulo,
                         conteudo: val.conteudo,
                         descricaoCurta: val.conteudo.substr(0,100),
                         imagem: val.imagem,
                         slug: val.slug,
                         categoria: val.categoria,
                         views: val.views
                         
                     }
             })

             res.render('single',{noticia:resposta,postsTop:postsTop});

            })


        
       }else{
           res.redirect('/');
       }
    })
    
})

var usuarios = [

    {

        login: 'gabriel',

        senha:'Saturno1'

    }

]



app.post('/admin/login',(req,res)=>{

    usuarios.map(function(val){

        if(val.login == req.body.login && val.senha == req.body.senha){

            req.session.login = "guilherme";

            

        }

    })



    res.redirect('/admin/login');

    

})

app.post("/admin/cadastro", (req, res)=>{
    //prox aula inseriremos no mongo
    console.log(req.body);
    Posts.create({
        titulo: req.body.titulo_noticia,
        imagem: req.body.url_imagem,
        categoria: "Nenhuma",
        conteudo: req.body.noticia,
        slug: req.body.slug,
        autor: "ADM",
        views: 0
    })
    res.send("Cadastrado com sucesso");
})

app.get('/admin/deletar/:id', (req,res)=>{
    res.send('deletada a notícia com id:' + req.params.id);
})

app.get('/admin/login', (req,res)=>{
    if(req.session.login == null){
        res.render('admin-login');
    }else{
        res.render('admin-painel');
    }
})



app.listen(9000,()=>{
    console.log('server rodando!');
})