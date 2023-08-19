import React from 'react';

function ThemeButtons({ onThemeChange }) {
    return (
        <div className="theme-buttons">
            <button onClick={() => onThemeChange('romantic')}>Romantique</button>
            <button onClick={() => onThemeChange('partYfriends')}>Soirée entre amis</button>
        </div>
    );
}

export default ThemeButtons;
