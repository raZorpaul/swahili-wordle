import React from 'react';
import Feedback from './Feedback';
import './GameBoard.css';

function GameBoard({ grid, actual, submittedRows, activeRowIndex }) {
  return (
    <div className="game-board">
      {grid.map((guess, rowIndex) => (
        <div key={rowIndex} className="guess-row">
          {rowIndex < submittedRows.length ? (
            <Feedback guess={submittedRows[rowIndex]} actual={actual} />
          ) : (
            guess.map((letter, colIndex) => (
              <div 
                key={colIndex} 
                className={`feedback-tile ${rowIndex === activeRowIndex ? 'active' : ''}`}
              >
                {letter}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;