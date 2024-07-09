import React from 'react';
import './Feedback.css';

function Feedback({ guess, actual }) {
  const feedback = guess.map((letter, index) => {
    if (letter === '') {
      return <span key={index} className="feedback-tile ⬜"></span>;
    } else if (letter === actual[index]) {
      return <span key={index} className="feedback-tile 🟩">{letter}</span>;
    } else if (actual.includes(letter)) {
      return <span key={index} className="feedback-tile 🟨">{letter}</span>;
    } else {
      return <span key={index} className="feedback-tile ⬜">{letter}</span>;
    }
  });

  return (
    <div className="feedback-row">
      {feedback}
    </div>
  );
}

export default Feedback;
