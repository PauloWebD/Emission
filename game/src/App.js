import React, { useState, useEffect } from 'react';
import './App.css';
import Box from './components/Box';
import ThemeButtons from './components/ThemeButtons';
import LotList from './components/LotList';
import remainingLotsData from './data/Lots.json';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [remainingLots, setRemainingLots] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [foundLots, setFoundLots] = useState({
    mauvaisLots: [],
    lotsMoyens: [],
    bonsLots: [],
    superLots: [],
  });

  const [initialChosenBox, setInitialChosenBox] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedBoxOpened, setSelectedBoxOpened] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (selectedTheme !== null) {
      const selectedThemeData = remainingLotsData[selectedTheme] || {};
      const allLots = Object.values(selectedThemeData).reduce((acc, subCategory) => {
        return acc.concat(subCategory);
      }, []);

      const shuffledLots = shuffleArray(allLots);

      const initialBoxes = shuffledLots.map((lot, index) => ({
        isOpen: false,
        lotIndex: index,
        amount: lot,
      }));

      setBoxes(initialBoxes);
      setRemainingLots([...shuffledLots]);

      const randomBoxIndex = Math.floor(Math.random() * initialBoxes.length);
      setInitialChosenBox(randomBoxIndex);
    }
  }, [selectedTheme]);

  function openBox(index) {
    if (!gameStarted) {
      setGameStarted(true);
      setSelectedBox(index);
      return;
    }

    if (initialChosenBox === index && currentTurn <= 15) {
      if (currentTurn < 10) {
        return;
      }

      if (currentTurn === 10 || currentTurn === 15) {
        setInitialChosenBox(null);
      }
    }

    if (!boxes[index].isOpen && !gameWon) {
      const newBoxes = [...boxes];
      newBoxes[index] = { ...newBoxes[index], isOpen: true };
      setBoxes(newBoxes);

      const foundLot = boxes[index].amount;
      const category = Object.keys(remainingLotsData[selectedTheme]).find((cat) =>
        remainingLotsData[selectedTheme][cat].includes(foundLot)
      );

      if (category) {
        setFoundLots((prevFoundLots) => ({
          ...prevFoundLots,
          [category]: [...prevFoundLots[category], foundLot],
        }));
      }

      setCurrentTurn((prevTurn) => prevTurn + 1);

      const remainingBoxes = newBoxes.filter((box) => !box.isOpen).length;
      if (remainingBoxes === 0 && index === selectedBox) {
        setGameWon(true);
        alert("Félicitations ! Vous avez gagné !");
      }
    }
  }

  return (
    <div className="App">
      <h1>À Prendre ou à Laisser</h1>
      <ThemeButtons onThemeChange={setSelectedTheme} />
      <div className="game-container">
        {selectedTheme !== null && (
          <LotList theme={selectedTheme} remainingLots={remainingLotsData[selectedTheme]} foundLots={foundLots} boxes={boxes} />
        )}
        {selectedTheme !== null && (
          <div className="box-selection">
            <h2>Choisissez une boîte :</h2>
            <select value={selectedBox !== null ? selectedBox : ''} onChange={(e) => setSelectedBox(Number(e.target.value))}>
              <option value="">Choisir une boîte</option>
              {boxes.map((_, index) => (
                <option key={index} value={index}>
                  Boîte {index + 1}
                </option>
              ))}
            </select>
            {gameStarted ? (
              <button onClick={() => setGameStarted(true)}>Continuer la partie</button>
            ) : (
              <button onClick={() => openBox(selectedBox)}>Commencer la partie</button>
            )}
          </div>
        )}

        {gameStarted && (
          <div className="selected-box">
            <h2>Votre boîte sélectionnée :</h2>
            <Box
              amount={selectedBoxOpened ? boxes[selectedBox].amount : '?'}
              isOpen={selectedBoxOpened}
              onClick={() => setSelectedBoxOpened(true)}
              boxNumber={selectedBox + 1}
              allBoxesOpened={boxes.filter((box) => !box.isOpen).length === 0}
            />
          </div>
        )}

        {gameStarted && (
          <div className="remaining-boxes">
            <h2>Les autres boîtes :</h2>
            <div className="box-container">
              {boxes.map((box, index) => (
                index !== selectedBox && (
                  <Box
                    key={index}
                    amount={box.isOpen ? box.amount : '?'}
                    isOpen={box.isOpen}
                    onClick={() => openBox(index)}
                    boxNumber={index + 1}
                  />
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
