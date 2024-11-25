import './App.css'
import {useState} from "react";

function App() {

  // const [totalMagazine, setTotalMagazine] = useState(6)
  // const [currentAttempt, setCurrentAttempt] = useState(1)
  //
  // const random = Math.floor(Math.random() * 5)



  const chamberSize = 6;
  const [bulletPosition, setBulletPosition] = useState(Math.floor(Math.random() * chamberSize) + 1); // Позиция пули
  const [triggerPosition, setTriggerPosition] = useState(1); // Начальная позиция курка
  const [result, setResult] = useState('');

  const pullTrigger = () => {
    if (triggerPosition === bulletPosition) {
      setResult('Bang! 💥');
    } else {
      setResult('Click...');
      setTriggerPosition(triggerPosition === chamberSize ? 1 : triggerPosition + 1); // Переход к следующей позиции
    }
  };

  const reload = () => {
    setResult('');
    setTriggerPosition(1);
    setBulletPosition(Math.floor(Math.random() * chamberSize) + 1); // Генерация новой позиции пули
  };

  return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Русская Рулетка</h2>
        <p>Позиция курка: {triggerPosition}</p>
        <p>Результат: {result}</p>

        <button onClick={pullTrigger} disabled={result === 'Bang! 💥'} style={{ margin: '10px' }}>
          Спустить курок
        </button>
        <button onClick={reload} style={{ margin: '10px' }}>
          Перезарядить
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {[...Array(chamberSize)].map((_, index) => (
              <div
                  key={index}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    margin: '5px',
                    backgroundColor: index + 1 === bulletPosition ? 'red' : 'gray',
                    border: triggerPosition === index + 1 ? '3px solid black' : 'none',
                  }}
              />
          ))}
        </div>
      </div>
  );

}

export default App
