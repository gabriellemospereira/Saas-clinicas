const fs = require('fs');
const path = require('path');

// Criar pasta
// fs.mkdir(path.join(__dirname, 'teste'), { rescursive: true}, (error) =>
// { 
    //if (error) {
       // return console.log('Erro ao criar pasta', error);
    //} else {
       // console.log('Pasta criada com sucesso');
    //}
// });

// Criar arquivo
fs.writeFile(path.join(__dirname, 'teste', 'teste.txt'), 'Hello node!', (error) => {
    if (error) {
        return console.log('Erro: ', error) 

    }
    console.log('Arquivo criado com sucesso');
})

// Sobre escrever um arquivo
 fs.writeFile(path.join(__dirname, 'teste', 'teste.txt'), 'Hello node!', (error) => {
     if (error) {             
        return console.log('Erro: ', error)
         }    

// Adicionar á um arquivo
fs.appendFile(path.join(__dirname, 'teste', 'teste.txt'), '\nHello again!', (error) => {
    if (error) {
        return console.log('Erro: ', error) 

    }
    console.log('Arquivo atualizado com sucesso');
})

// Ler arquivo
fs.readFile(path.join(__dirname, 'teste', 'teste.txt'), 'utf-8', (error, data) => {
    if (error) {
        return console.lor('Erro', error);

    }
       console.log(data);
});

 });


 