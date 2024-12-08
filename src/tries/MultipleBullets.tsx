import {useState} from 'react';
import '../App.css'

const MultipleBullets = () => {


    const [chamberSize, setChamberSize] = useState(6); // Количество слотов в барабане по умолчанию
    const [numBullets, setNumBullets] = useState(1); // Количество пуль
    const [bulletPositions, setBulletPositions] = useState(generateBullets(1, 6)); // Позиции пуль
    const [triggerPosition, setTriggerPosition] = useState(1); // Начальная позиция курка
    const [result, setResult] = useState(false);

    const shotSound = new Audio("./src/assets/shot.mp3")
    const missSound = new Audio("./src/assets/misfire.mp3")
    const chamberSound = new Audio("./src/assets/chamber.mp3")


    function generateBullets(numBullets: number, chamberSize: number) {
        const positions = new Set();
        while (positions.size < numBullets) {
            positions.add(Math.floor(Math.random() * chamberSize) + 1);
        }
        return Array.from(positions);
    }

    const pullTrigger = () => {
        if (bulletPositions.includes(triggerPosition)) {
            shotSound.play()
            setResult(true);

        } else {
            // setResult('Click...');
            missSound.play()
            setTriggerPosition(triggerPosition === chamberSize ? 1 : triggerPosition + 1); // Переход к следующей позиции
        }
    };

    const reload = () => {
        setResult(false);
        setTriggerPosition(1);
        setBulletPositions(generateBullets(numBullets, chamberSize)); // Генерация новых позиций пуль
        chamberSound.play()
    };


    const handleBulletChange = (e: { target: { value: number; }; }) => {
        const value = Math.min(Math.max(1, Number(e.target.value)), chamberSize);
        setNumBullets(value);
        setBulletPositions(generateBullets(value, chamberSize)); // Обновляем позиции пуль при изменении их количества
    };

    const handleChamberSizeChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setChamberSize(value);
        setBulletPositions(generateBullets(numBullets, value)); // Обновляем позиции пуль при изменении размера барабана
        setTriggerPosition(1); // Сбрасываем позицию курка
        setResult(false); // Сбрасываем результат
    };

    return (
        <div style={{textAlign: 'center', padding: '20px',}}>
            <h2>Русская Рулетка</h2>
            <p>Позиция курка: {triggerPosition}</p>
            {result &&
                <p style={{color: 'red', fontSize: '20px'}} >ТЫ ПРОИГРАЛ</p>
            }


            <label>
                Размер барабана:
                <input
                    type="number"
                    min="1"
                    value={chamberSize}
                    onChange={handleChamberSizeChange}
                    style={{margin: '10px'}}
                    disabled={result} // Блокируем изменение размера после первого выстрела
                />
            </label>

            <label>
                Количество пуль:
                <input
                    type="number"
                    min="1"
                    max={chamberSize}
                    value={numBullets}
                    onChange={handleBulletChange}
                    style={{margin: '10px'}}
                    disabled={result} // Блокируем изменение количества пуль после первого выстрела
                />
            </label>

            <button
                onClick={pullTrigger}
                disabled={result}
                style={{margin: '10px'}}>
                Спустить курок
            </button>
            <button onClick={reload} style={{margin: '10px'}}>
                Перезарядить
            </button>

            {/*<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' , flexWrap: 'wrap'}}>*/}
            {/*    {[...Array(chamberSize)].map((_, index) => (*/}
            {/*        <div*/}
            {/*            key={index}*/}
            {/*            style={{*/}
            {/*                width: '50px',*/}
            {/*                height: '50px',*/}
            {/*                borderRadius: '50%',*/}
            {/*                margin: '5px',*/}
            {/*                backgroundColor: bulletPositions.includes(index + 1) ? 'red' : 'gray',*/}
            {/*                outline: triggerPosition === index + 1 ? '3px solid black' : 'none',*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
}

export default MultipleBullets;
