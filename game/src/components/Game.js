// Game.js
import React, { useState } from 'react';
import Box from './Box';

const Game = ({ lots }) => {
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [round, setRound] = useState(1);
    const [openedBoxes, setOpenedBoxes] = useState([]);

    const handleBoxClick = (index) => {
        if (selectedBoxIndex === null) {
            setSelectedBoxIndex(index);
        } else {
            // Handle opening the selected box
            // Update openedBoxes, round, etc.
        }
    };

    return (
        <div className="game-container">
            {/* Display boxes */}
            {lots.map((lot, index) => (
                <Box
                    key={index}
                    isOpen={openedBoxes.includes(index)}
                    onClick={() => handleBoxClick(index)}
                    amount={openedBoxes.includes(index) ? lot : '?'}
                />
            ))}

            {/* Display lots */}
            <div className="lots-container">
                {lots.map((lot, index) => (
                    <div key={index} className="lot">
                        {openedBoxes.includes(index) && lot}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;
