// Box.js
import React from 'react';
import '../styles/Box.css';
import closedBoxSvg from '../svg/1.svg';
import openBoxSvg from '../svg/2.svg';

const Box = ({ amount, isOpen, onClick, boxNumber }) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <div className='ContaineBox' onClick={handleClick}>
            <img src={isOpen ? openBoxSvg : closedBoxSvg} alt={`Box ${boxNumber}`} />
            <div className="amount">
                {isOpen ? amount : `${boxNumber}`}
            </div>
        </div>
    );
};

export default Box;
