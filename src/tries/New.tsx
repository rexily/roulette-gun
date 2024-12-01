import { useState, useEffect } from 'react';

const MultipleBullets2 = () => {


    const savedChamberSize = localStorage.getItem('chamberSize');
    const initialChamberSize = savedChamberSize !== null ? Number(savedChamberSize) : 6;

    const savedNumBullets = localStorage.getItem('numBullets');
    const initialNumBullets = savedNumBullets !== null ? Number(savedNumBullets) : 1;

    const savedTriggerPosition = localStorage.getItem('triggerPosition');
    const initialTriggerPosition = savedTriggerPosition !== null ? Number(savedTriggerPosition) : 1;

    const savedResult = localStorage.getItem('result');
    const initialResult = savedResult !== null ? JSON.parse(savedResult) : false;

    const savedBulletPositions = localStorage.getItem('bulletPositions');
    const initialBulletPositions = savedBulletPositions !== null
        ? validateBulletPositions(JSON.parse(savedBulletPositions), initialNumBullets, initialChamberSize)
        : generateBullets(initialNumBullets, initialChamberSize);

    const [chamberSize, setChamberSize] = useState(initialChamberSize);
    const [numBullets, setNumBullets] = useState(initialNumBullets);
    const [bulletPositions, setBulletPositions] = useState(initialBulletPositions);
    const [triggerPosition, setTriggerPosition] = useState(initialTriggerPosition);
    const [result, setResult] = useState(initialResult);
    const [isBulletsVisible, setBulletsVisible] = useState(false);

    const shotSound = new Audio("./src/assets/shot.mp3");
    const missSound = new Audio("./src/assets/misfire.mp3");
    const chamberSound = new Audio("./src/assets/chamber.mp3");

    useEffect(() => {
        localStorage.setItem('chamberSize', chamberSize.toString());
        localStorage.setItem('numBullets', numBullets.toString());
        localStorage.setItem('bulletPositions', JSON.stringify(bulletPositions));
        localStorage.setItem('triggerPosition', triggerPosition.toString());
        localStorage.setItem('result', JSON.stringify(result));
    }, [chamberSize, numBullets, bulletPositions, triggerPosition, result]);

    function validateBulletPositions(positions: number[], numBullets: number, chamberSize: number) {
        const validPositions = Array.from(new Set(positions)).filter(pos => pos >= 1 && pos <= chamberSize);
        if (validPositions.length !== numBullets) {
            return generateBullets(numBullets, chamberSize);
        }
        return validPositions;
    }

    function generateBullets(numBullets: number, chamberSize: number) {
        const positions = new Set<number>();
        while (positions.size < numBullets) {
            positions.add(Math.floor(Math.random() * chamberSize) + 1);
        }
        return Array.from(positions);
    }

    const pullTrigger = () => {
        if (bulletPositions.includes(triggerPosition)) {
            shotSound.play();
            setResult(true);
        } else {
            missSound.play();
            setTriggerPosition(triggerPosition === chamberSize ? 1 : triggerPosition + 1);
        }
    };

    const reload = () => {
        setResult(false);
        setTriggerPosition(1);
        setBulletPositions(generateBullets(numBullets, chamberSize));
        chamberSound.play();
    };

    const handleBulletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Math.max(1, Number(e.target.value)), chamberSize);
        setNumBullets(value);
        setBulletPositions(generateBullets(value, chamberSize));
    };

    const handleChamberSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number(e.target.value));
        setChamberSize(value);
        setBulletPositions(generateBullets(numBullets, value));
        setTriggerPosition(1);
        setResult(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 onDoubleClick={() => {setBulletsVisible(prevState => !prevState)}} >Русская Рулетка</h2>
            <p>Позиция курка: {triggerPosition}</p>
            {result && <p style={{ color: 'red', fontSize: '20px' }}>ТЫ ПРОИГРАЛ</p>}

            <label>
                Размер барабана:
                <input
                    type="number"
                    min="1"
                    value={chamberSize}
                    onChange={handleChamberSizeChange}
                    style={{ margin: '10px' }}
                    disabled={result}
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
                    style={{ margin: '10px' }}
                    disabled={result}
                />
            </label>

            <button onClick={pullTrigger} disabled={result} style={{ margin: '10px' }}>
                Спустить курок
            </button>
            <button onClick={reload} style={{ margin: '10px' }}>
                Перезарядить
            </button>


            {isBulletsVisible ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' , flexWrap: 'wrap'}}>
                {[...Array(chamberSize)].map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            margin: '5px',
                            backgroundColor: bulletPositions.includes(index + 1) ? 'red' : 'gray',
                            outline: triggerPosition === index + 1 ? '3px solid black' : 'none',
                        }}
                    />
                ))}
            </div>
            ) : ''}

        </div>
    );
};

export default MultipleBullets2;
