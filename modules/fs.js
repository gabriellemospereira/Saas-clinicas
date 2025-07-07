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