import React from 'react';
import '../styles/styles.css'


function LotList({ theme, remainingLots, foundLots, boxes }) {
    return (
        <div className="remaining-lots">
            <h2>{theme === 'romantic' ? 'Romantique' : 'Soirée entre amis'}</h2>
            {Object.keys(remainingLots).map((category) => (
                <div key={category}>
                    <h3>{category}</h3>
                    <ul>
                        {remainingLots[category].map((lot, index) => (
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
    );
}

export default LotList;
