import React, { useState, useEffect, useRef } from 'react';
import choumeAudio from './assets/choume.mp3';
import shoushinAudio from './assets/shoushin.mp3';
import icchisuruAudio from './assets/icchisuru.mp3';
import tatoebaAudio from './assets/tatoeba.mp3';
import seikiAudio from './assets/seiki.mp3';
import './input.css';  // Import your styles if needed

function App() {
  const audioRef = useRef(null);

  const hiragana = [
    { accent: 'LH', hiragana: 'ちょうめ', meaning: 'district of a town', audio: choumeAudio },
    { accent: 'LH', hiragana: 'しょうしん', meaning: 'heartbreak', audio: shoushinAudio },
    { accent: 'LH', hiragana: 'いっちする', meaning: 'coincidence', audio: icchisuruAudio },
    { accent: 'LHL', hiragana: 'たとえば', meaning: 'for example', audio: tatoebaAudio },
    { accent: 'HL', hiragana: 'せいき', meaning: 'for example', audio: seikiAudio },
  ];

  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(0);

  const setRandomHiragana = () => {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    setCurrent(randomIndex);

    // Play the audio
    audioRef.current.src = hiragana[randomIndex].audio;
    audioRef.current.play();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setRandomHiragana();
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 text-white text-center">
      {/* Audio element */}
      <audio ref={audioRef} />

      <header className="p-6 mb-8">
        <h1 className="text-2xl font-bold uppercase">Hiragana Quiz</h1>
        <div>
          {/* Display streak */}
          <p>Streak: {streak} / Max Streak: {maxStreak}</p>
        </div>
      </header>

      <div className="text-9xl font-bold mb-8">
        <p>{hiragana[current].hiragana}</p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={input}
            className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2"
          />
        </form>
      </div>

      {/* Display error message if any */}
      {error && 
        <div>
          <p>{ error }</p>
        </div>
      }
    </div>
  );
}

export default App;
