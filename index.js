const fs = require('fs');

let
    layoutArr      = [],
    globalLayout   = fs.readFileSync('layout.html', 'utf-8'),
    structureFiles = {
        1: 'Название.txt',
        2: 'Анотация.txt',
        3: 'Форма обучения.txt',
        4: 'Кол-во часов.txt',
        5: 'Стоимость.txt',
        6: 'Тип выдаваемого документа.txt',
        7: 'Образец документа.jpg',
        8: 'Учебный палн.doc',
        9: 'Рабочая программа.doc',
        10: 'Картинка',
        11: 'Титульный лист.txt',
    },
    programData = {
        'Название'               : 'name',
        'Анотация'               : 'annotation',
        'Форма обучения'         : 'formOfEducation',
        'Кол-во часов'           : 'amountOfHours',
        'Стоимость'              : 'cost',
        'Тип выдаемого документа': 'documentType',
        'Образец документа'      : 'documentExample',
        'Учебный план'           : 'plan',
        'Рабочая программа'      : 'workingProgram',
        'Картинка'               : 'image',
        'Титульный лсит'         : 'titleList',
    };

//вопросы: 
// 1: какой вид выхода лучше сделать?
// 2: желательно заиметь шаблон страницы
// 3: индексы зачем есть 9_1


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
    getProgramData = (filesName /*Array<string>*/, path /*string*/) => {
        
        let program = {};

        for(let i = 0; i < filesName.length; i++){
            let 
                file         = filesName[i],
                id           = file.match(/^[0-9]+\s/g),
                propWithType = file.match(/([а-я]|\s|-)+.(txt|doc|pdf|jpg)/ig),
                prop         = file.match(/([а-я]|\s|-)+/ig);

            if(id == null){
                return;
            }

            id           = Number(id[0]);
            prop         = prop[0];
            propWithType = propWithType[0]; 

            console.log('++++++++', file, id, prop, propWithType);
            //ошибка!!!!!
            console.log(structureFiles[id].length, propWithType.length);
            if(structureFiles[id] != propWithType){
                console.error(`Файл ${file} не подходит под стандартную структуру`);
                return;
            }

            //read file
        //    console.log(fs.readFileSync(`${path}/${propWithType}`));
            
        }

        return program;
    }



let 
    // !ШАГ3
    //TODO: создает html страницы
    createFiles = () => {

    },

    // !ШАГ2
    //TODO: получает на вход html страницу, возвращает ее копию заполненную данными
    fillLayout = (layout /*string*/) => {
        for(let key in programData){
            let regExp = new RegExp(`\{\{${key}\}\}`, 'g');
            layout = str.replace(regExp, programData[key]);
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
                    
                    console.log(getProgramData(dataFiles, `./${folderName}/${center}/${direction}/${program}`));
                    //сбор данных по программе
                })
            });
        })
    };


scanFolder('./Центры');


