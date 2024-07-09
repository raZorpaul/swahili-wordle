import React, { useState } from 'react';
import './Keyboard.css';

function Keyboard({ onGuess }) {
  const [currentGuess, setCurrentGuess] = useState('');

  const handleKeyPress = (char) => {
    if (char === 'ENTER' && currentGuess.length === 5) {
      onGuess(currentGuess);
      setCurrentGuess('');
    } else if (char === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + char);
    }
  };

  return (
    <div className="keyboard">
      <div className="key-row">
        {'qwertyuiop'.split('').map(char => (
          <button key={char} onClick={() => handleKeyPress(char)}>
            {char}
          </button>
        ))}
      </div>
      <div className="key-row">
        {'asdfghjkl'.split('').map(char => (
          <button key={char} onClick={() => handleKeyPress(char)}>
            {char}
          </button>
        ))}
      </div>
      <div className="key-row">
        <button onClick={() => handleKeyPress('ENTER')}>ENTER</button>
        {'zxcvbnm'.split('').map(char => (
          <button key={char} onClick={() => handleKeyPress(char)}>
            {char}
          </button>
        ))}
        <button onClick={() => handleKeyPress('BACKSPACE')}>BACKSPACE</button>
      </div>
    </div>
  );
}

export default Keyboard;
