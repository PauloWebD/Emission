// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Box from './components/Box';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


function App() {

  const romanticLots = [
    "Un bisou doux",
    "Un dîner aux chandelles",
    "Un week-end romantique",
    "Un câlin chaleureux",
    "Un petit déjeuner au lit",
    "Une soirée cinéma à la maison",
    "Un massage relaxant",
    "Une promenade main dans la main",
    "Un pique-nique romantique",
    "Une lettre d'amour",
    "Un moment de danse en amoureux",
    "Un bain moussant à deux",
    "Une soirée jeux de société",
    "Une séance de stargazing",
    "Un gage romantique de ton choix",
    "Un jour de folie à deux",
    "Un rendez-vous surprise",
    "Une journée sans téléphone",
    "Une journée de câlins non-stop",
    "Une journée ménage"
  ];

  const [boxes, setBoxes] = useState([]);
  const [remainingLots, setRemainingLots] = useState([]);

  useEffect(() => {
    const shuffledLots = shuffleArray(romanticLots);
    const initialBoxes = shuffledLots.map((lot, index) => ({
      isOpen: false,
      lotIndex: index,
      amount: lot,
    }));

    setBoxes(initialBoxes);
    setRemainingLots([...shuffledLots]);
  }, []);

  const openBox = (index) => {
    if (!boxes[index].isOpen) {
      const newBoxes = [...boxes];
      newBoxes[index] = { ...newBoxes[index], isOpen: true };
      setBoxes(newBoxes);
    }
  };

  return (
    <div className="App">
      <h1>À Prendre ou à Laisser</h1>
      <div className="game-container">

        <div className="remaining-lots">
          <ul>
            {remainingLots.map((lot, index) => (
              <li key={index}>{lot}</li>
            ))}
          </ul>
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