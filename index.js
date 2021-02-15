const fs = require('fs');

let
    layoutArr    = [],
    globalLayout = fs.readFileSync('layout.html', 'utf-8'),
    data         = {
        name           : 'name',
        annotation     : 'annotation',
        formOfEducation: 'formOfEducation',
        amountOfHours  : 'amountOfHours',
        cost           : 'cost',
        documentType   : 'documentType',
        documentExample: 'documentExample',
        plan           : 'plan',
        workingProgram : 'workingProgram',
        image          : 'image',
        titleList      : 'titleList',
    };

//вопросы: 
// 1: какой вид выхода лучше сделать?
// 2: желательно заиметь шаблон страницы

let 
    //TODO: получает на вход html страницу, возвращает ее копию заполненную данными
    fillLayout = (layout /*string*/) => {
        for(let key in data){
            let regExp = new RegExp(`\{\{${key}\}\}`, 'g');
            layout = str.replace(regExp, data[key]);
        }
        return layout;
    },

    //TODO: бежит по всем папкам (корневая папка Центры) и собирает в них информацию по 
    searchData = (folderName /*string*/) => {

        try {
            let fileData = fs.statSync(folderName);
            console.log(fileData);   
        }catch(error){
            
        }

        let centers = fs.readdirSync(folderName);
        
        centers.forEach((center) => {
            console.log(center);
            let directions = fs.readdirSync(`./${folderName}/${center}`);

            directions.forEach((direction) => {
                console.log('__', direction);
                let workingPrograms = fs.readdirSync(`./${folderName}/${center}/${direction}`);

                workingPrograms.forEach((program) => {
                    console.log('____', program);
                })
            });
        })
    };


searchData('./Центры');


