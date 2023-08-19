import React, { useState, useEffect } from 'react';
import './App.css';
import Box from './components/Box';
import remainingLotsData from './data/Lots.json'; // Assurez-vous de l'importer correctement

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// ... Importations et fonctions précédentes ...

function App() {
  const [theme, setTheme] = useState('romantic');
  const [boxes, setBoxes] = useState([]);
  const [remainingLots, setRemainingLots] = useState([]);
  const [foundLots, setFoundLots] = useState({
    mauvaisLots: [],
    lotsMoyens: [],
    bonsLots: [],
    superLots: [],
  });

  useEffect(() => {
    const selectedThemeData = remainingLotsData[theme] || {};
    const allLots = Object.values(selectedThemeData).reduce((acc, subCategory) => {
      return acc.concat(subCategory);
    }, []);

    const shuffledLots = shuffleArray(allLots); // Mélanger les lots

    const initialBoxes = shuffledLots.map((lot, index) => ({
      isOpen: false,
      lotIndex: index,
      amount: lot,
    }));

    setBoxes(initialBoxes);
    setRemainingLots([...shuffledLots]);
  }, [theme]);

  const openBox = (index) => {
    if (!boxes[index].isOpen) {
      const newBoxes = [...boxes];
      newBoxes[index] = { ...newBoxes[index], isOpen: true };
      setBoxes(newBoxes);

      const foundLot = boxes[index].amount;
      const category = Object.keys(remainingLotsData[theme]).find((cat) =>
        remainingLotsData[theme][cat].includes(foundLot)
      );

      if (category) {
        setFoundLots((prevFoundLots) => ({
          ...prevFoundLots,
          [category]: [...prevFoundLots[category], foundLot],
        }));
      }
    }
  };

  return (
    <div className="App">
      <h1>À Prendre ou à Laisser</h1>
      <div className="theme-buttons">
        <button onClick={() => setTheme('romantic')}>Romantique</button>
        <button onClick={() => setTheme('partYfriends')}>Soirée entre amis</button>
      </div>
      <div className="game-container">
        <div className="remaining-lots">
          <h2>{theme === 'romantic' ? 'Romantique' : 'Soirée entre amis'}</h2>
          {Object.keys(remainingLotsData[theme]).map((category) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {remainingLotsData[theme][category].map((lot, index) => (
                  <li
                    key={index}
                    className={
                      foundLots[category].includes(lot) && boxes.some((box) => box.amount === lot && box.isOpen)
                        ? 'strikethrough'
                        : ''
                    }
                  >
                    {lot}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="box-container">
          {boxes.map((box, index) => (
            <Box
              key={index}
              amount={box.isOpen ? box.amount : '?'}
              isOpen={box.isOpen}
              onClick={() => openBox(index)}
              boxNumber={index + 1}
              color={box.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

