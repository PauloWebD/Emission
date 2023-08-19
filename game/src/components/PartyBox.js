import React from 'react';
import '../styles/Box.css';
import closedBoxSvg from '../svg/1.svg';
import openBoxSvg from '../svg/2.svg';
import dataGame from '../data/Lots.json';

const PartyBox = ({ amount, isOpen, onClick, boxNumber }) => {
    const handleClick = () => {
        onClick();
    };

    let lotsCategory;
    if (amount >= 1 && amount <= 5) {
        lotsCategory = "mauvaisLots"; // Remarquez que cette catégorie a été modifiée
    } else if (amount >= 6 && amount <= 10) {
        lotsCategory = "lotsMoyens"; // Remarquez que cette catégorie a été modifiée
    } else {
        lotsCategory = "bonsLots"; // Remarquez que cette catégorie a été modifiée
    }

    return (
        <div className={`ContainerBox ${isOpen ? 'open' : 'closed'}`} onClick={handleClick}>
            {isOpen ? dataGame[lotsCategory][amount - 1] : `${boxNumber}`}
            <img src={isOpen ? openBoxSvg : closedBoxSvg} alt={`Box ${boxNumber}`} />
        </div>
    );
};

export default PartyBox;
