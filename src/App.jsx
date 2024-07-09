import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

const swahili_words = [
    "rafiki", "nyota", "panda", "mboga", "kitabu",
    "punda", "tembo", "chafu", "tambi", "shuja",
    "pilau", "nyuki", "bahari", "sahani", "chembe",
    "mwezi", "hujua", "furaha", "bunda", "shamba",
    "mkate", "barua", "jambo", "chama", "msitu",
    "duara", "sukari", "roho", "nyasi", "mkoba",
    "kijana", "kijiji", "wimbo", "baridi", "robo",
    "ngoma", "mkali", "mwiko", "mwana", "chura",
    "mandi", "sauti", "tunda", "dunia", "timba",
    "maple", "chumi", "shimo", "zoezi", "mwema"
];

function getRandomWord(words) {
  const fiveLetterWords = words.filter(word => word.length === 5);
  return fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
}

function App() {
  const maxAttempts = 6;
  const wordLength = 5;
  const actual = getRandomWord(swahili_words);
  const initialGrid = Array(maxAttempts).fill().map(() => Array(wordLength).fill(''));

  const [grid, setGrid] = useState(initialGrid);
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [submittedRows, setSubmittedRows] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleNewGuess = useCallback((letter) => {
    if (gameOver) return;
    
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      const currentRow = newGrid[activeRowIndex];
      const emptyCellIndex = currentRow.findIndex(cell => cell === '');
      if (emptyCellIndex !== -1) {
        currentRow[emptyCellIndex] = letter;
        return newGrid;
      }
      return prevGrid;
    });
  }, [activeRowIndex, gameOver]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver) return;

      const { key } = event;
      if (key === 'Enter') {
        // Handle word submission
        const currentRow = grid[activeRowIndex];
        if (currentRow.every(cell => cell !== '')) {
          setSubmittedRows(prev => [...prev, currentRow]);
          if (activeRowIndex === maxAttempts - 1 || currentRow.join('') === actual) {
            setGameOver(true);
          } else {
            setActiveRowIndex(prev => prev + 1);
          }
        }
      } else if (key === 'Backspace') {
        // Handle backspace
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          const currentRow = newGrid[activeRowIndex];
          const lastFilledIndex = currentRow.findLastIndex(cell => cell !== '');
          if (lastFilledIndex !== -1) {
            currentRow[lastFilledIndex] = '';
            return newGrid;
          }
          return prevGrid;
        });
      } else if (key.length === 1 && /^[a-zA-Z]+$/.test(key)) {
        handleNewGuess(key.toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNewGuess, activeRowIndex, grid, actual, gameOver]);

  return (
    <div className="app">
      <header>
        <h2>Swahili Wordle</h2>
      </header>
      <div className="main-content">
        <GameBoard 
          grid={grid} 
          actual={actual} 
          submittedRows={submittedRows} 
          activeRowIndex={activeRowIndex} 
        />
      </div>
      {gameOver && <div>Game Over! The word was: {actual}</div>}
    </div>
  );
}

export default App;