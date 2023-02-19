Portal Paladino News - *Esperando nome e logo para atualizar projeto*

Tutorial para instalar e rodar o projeto: 

Pré-Requisitos: 

Instale o node.js no site node.org (pesquise e instale a versão mais recente); 
Instale o Github Desktop;
Clique no Repositório em "<>Code" 
Abrir com Github Desktop
Depois "Abrir no VScode"
E siga esse passo a passo:


2. Abra o terminal no VsCode (control + shift + ")
3. Digite: npm init (aqui vc vai criar um package json)
4. De OK em tudo até aparecer uma nova linha do terminal
5. Digite: npm install express body-parser ejs
6. Digite: npm install nodemon
7. Digite: npm install mongoose
8. Digite para iniciar o servidor: nodemon index.js 
9. Digite no seu navegador: localhost:5000
10. Pronto!

OBS: Crie uma database no MONGOdb Atlas e coloque a connection string no index.js; Coloque a senha e o nome da Database. 
Além disso, lembre-se de criar uma coleção e inserir documentos nela com os indexes descritos em Posts.js com valores em string. 
Qualquer dúvidas, consultar curso Danki Code sobre como conectar correntamente MongoDB com Node.js. 
