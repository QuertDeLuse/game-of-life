"Я реализовал чтение состояния игры из файла посредством его подлкючения в html: "+
"<script type='text/javascript' src='./data.json'></script>";


document.addEventListener('DOMContentLoaded', () => {
    alert('Откройте консоль, чтобы начать игру! \nЭто делается с помощью клавиши F12');

    console.log("Для выбора состояния игры вам сначала потребуется кликнуть на саму страницу\n"+
        "После чего нажать на клавиатуре стрелочку:\n"+
        "Стрелка влево '<-' для выбора чтения состояния игры из файла\n"+
        "Стрелка вправо '->' для автоматической генерации состояния");

    document.addEventListener('keydown', function choose (event) {

        if (event.keyCode == '37') {
            document.removeEventListener('keydown', choose);
            console.log('Вы выбрали получения состояния игры из файла!');

            try {
                //get game state from file
                let file = JSON.parse(data);

                //creating the border
                const mWithBorder = file.length + 2;
                const nWithBorder = file[0].length + 2;

                //field generation
                let fileGameboard = Array.from(Array(mWithBorder), () => new Array(nWithBorder));
                generateField(fileGameboard, mWithBorder, nWithBorder);

                //set alive cells from file
                for (let i = 1; i < mWithBorder - 1; i++) {
                    for (let j = 1; j < nWithBorder - 1; j++) {
                        fileGameboard[i][j] = file[i - 1][j - 1];
                    }
                }

                printGameboard(fileGameboard);


                //Game process 
                setInterval(() => {
                    lifeSimulation(fileGameboard, mWithBorder, nWithBorder);
                }, 1 * 1000);


            } catch {
                console.log('Ошибка чтения JSON файла');
            }


        }
        if (event.keyCode == '39') {
            document.removeEventListener('keydown', choose);
            console.log('Вы выбрали автоматическую генерацию!');

            //Init gameboard

            //set random number of rows    
            let m = getRandomInteger(10, 15);
            //set random number of cols    
            let n = getRandomInteger(10, 15);

            //set border
            const mWithBorder = m + 2;
            const nWithBorder = n + 2;

            let gameboard = Array.from(Array(mWithBorder), () => new Array(nWithBorder));

            generateField(gameboard, mWithBorder, nWithBorder);
            generateLife(gameboard, mWithBorder, nWithBorder);
            printGameboard(gameboard);


            //Game process 
            setInterval(() => {
                lifeSimulation(gameboard, mWithBorder, nWithBorder);
            }, 1 * 1000);
        }
    });



    function getRandomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    function generateField(gameboard, mWithBorder, nWithBorder) {

        for (let i = 0; i < mWithBorder; i++) {
            for (let j = 0; j < nWithBorder; j++) {
                gameboard[i][j] = 0;
            }
        }
    }

    function generateLife(gameboard, mWithBorder, nWithBorder) {

        for (let i = 1; i < mWithBorder - 1; i++) {
            for (let j = 1; j < nWithBorder - 1; j++) {
                gameboard[i][j] = Math.abs(getRandomInteger(0, 1));
            }
        }
    }

    function checkCell(gameboard, i, j) {

        //Check near cells
        let nearAliveCellNumber = 0;

        for (let r = i - 1; r < i + 2; r++) {
            for (let c = j - 1; c < j + 2; c++) {
                nearAliveCellNumber += gameboard[r][c]; //increase counter if near cell is alive
            }
        }
        nearAliveCellNumber -= gameboard[i][j]; //decrease counter if checking cell is alive


        //check should checking cell die or not
        if (nearAliveCellNumber == 3 && gameboard[i][j] == 0)
            gameboard[i][j] = 1;
        else if ((nearAliveCellNumber < 2 || nearAliveCellNumber > 3) && gameboard[i][j] == 1)
            gameboard[i][j] = 0;

        return gameboard[i][j];
    }

    function lifeSimulation(gameboard, mWithBorder, nWithBorder) {
        //check every cell alg
        for (let i = 1; i < mWithBorder - 1; i++) {
            for (let j = 1; j < nWithBorder - 1; j++) {
                gameboard[i][j] = checkCell(gameboard, i, j);
            }
        }
        printGameboard(gameboard);
    }

    function printGameboard(gameboard) {
        // console.log(gameboard);
        // console.clear();
        console.table(gameboard);
        // return 0;
    }
});