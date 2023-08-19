// Box.js
import React from 'react';
import '../styles/Box.css';
import closedBoxSvg from '../svg/1.svg';
import openBoxSvg from '../svg/2.svg';

function Box({ amount, isOpen, onClick, boxNumber, color }) {
    console.log("Box props:", { amount, isOpen, onClick, boxNumber, color });

    const handleClick = () => {
        if (!isOpen && onClick) {
            onClick(); // Appeler onClick seulement si la boîte n'est pas encore ouverte
        }
    };

    return (
        <div className='ContaineBox' onClick={handleClick}>
            <img src={isOpen ? openBoxSvg : closedBoxSvg} alt={`Box ${boxNumber}`} />
            <div className="amount">
                {isOpen ? amount : `${boxNumber}`}
            </div>
        </div>
    );
}

export default Box;
