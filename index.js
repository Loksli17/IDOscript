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


const
    //* return true or false;
    checkFolder = (folderName) => {
        try {
            const fileData = fs.statSync(folderName);
            if(fileData.isFile()){
                console.error(`Файл ${folderName} НЕ БЫЛ ОБРАБОТАН потому что не папка.`);
                return false;
            }else{
                return true;
            }
        }catch(error){
            throw new Error(error);
        }
    },

    //* return data about progect 
    getProgramData = () => {

    }

// console.log(checkFolder('././Центры/УМО/1. Экспл.тяг.подвижного состава/~$ Организация работы Нарядчиков-2017.doc'));

let 
    // !ШАГ3
    //TODO: создает html страницы
    createFiles = (filesName /*Array<string>*/) => {

    },

    // !ШАГ2
    //TODO: получает на вход html страницу, возвращает ее копию заполненную данными
    fillLayout = (layout /*string*/) => {
        for(let key in data){
            let regExp = new RegExp(`\{\{${key}\}\}`, 'g');
            layout = str.replace(regExp, data[key]);
        }
        return layout;
    },

    // !ШАГ1
    //TODO: бежит по всем папкам (корневая папка Центры) и собирает в них информацию
    scanFolder = (folderName /*string*/) => {
        if(!checkFolder(folderName)) return;
        let centers = fs.readdirSync(folderName);
        
        centers.forEach((center) => {
            if(!checkFolder(`./${folderName}/${center}`)) return;
            let directions = fs.readdirSync(`./${folderName}/${center}`);

            console.log(center);

            directions.forEach((direction) => {
                if(!checkFolder(`./${folderName}/${center}/${direction}`)) return;
                let workingPrograms = fs.readdirSync(`./${folderName}/${center}/${direction}`);

                console.log('__', direction);

                workingPrograms.forEach((program) => {
                    if(!checkFolder(`./${folderName}/${center}/${direction}/${program}`)) return true;
                    console.log('____', program);
                    let dataFiles = fs.readdirSync(`./${folderName}/${center}/${direction}/${program}`);
                    
                    console.log(getProgramData(dataFiles));
                    //сбор данных по програме
                })
            });
        })
    };


scanFolder('./Центры');


