import React, { useState, useEffect, useRef } from 'react';
import choumeAudio from './assets/choume.mp3';
import shoushinAudio from './assets/shoushin.mp3';
import icchisuruAudio from './assets/icchisuru.mp3';
import tatoebaAudio from './assets/tatoeba.mp3';
import seikiAudio from './assets/seiki.mp3';
import './input.css'; // Import your styles if needed


const TitlePage = ({ onStartQuiz }) => (
  <div className="min-h-screen bg-indigo-800 text-white text-center flex flex-col items-center justify-center">
  <h1 className="text-6xl font-extrabold uppercase mb-8 rounded-full">日本語のイニシエーション</h1>
  <p className="text-2xl mb-4 rounded-full">『Japanese pitch accent is the fluxation of low and high pitch sounds within a word』</p>
  <p className="text-2xl mb-4 rounded-full">『Listen carefully and type the correct Pitch Fluctation using H(high pitch) and L(low) and X(medium)』</p>
  
  <button
    className="mt- px-20 py-4 border border-white rounded-full text-2xl font-bold hover:bg-white hover:text-slate-800 transition duration-300"
    onClick={onStartQuiz}
  >
    Start Quiz
  </button>
    <br></br>
    {/* <img
      src="/public/pitch.jpg"  // Replace with the actual path to your image
      alt="Hiragana Quiz Logo"     // Provide an appropriate alt text
      className="mb-8 rounded-full centered"
      style={{ width: '500px', height: '300px', margin: 'auto' }}  // Adjust the width and height as needed
    /> */}
  </div>
);

function App() {
  const audioRef = useRef(null);
  const [showTitle, setShowTitle] = useState(true);

  const hiragana = [
    { accent: 'LH', hiragana: 'ちょうめ', meaning: 'district of a town', audio: choumeAudio },
    { accent: 'LH', hiragana: 'しょうしん', meaning: 'heartbreak', audio: shoushinAudio },
    { accent: 'LHX', hiragana: 'いっちする', meaning: 'coincidence', audio: icchisuruAudio },
    { accent: 'LHL', hiragana: 'たとえば', meaning: 'for example', audio: tatoebaAudio },
    { accent: 'HL', hiragana: 'せいき', meaning: 'for example', audio: seikiAudio },
  ];

  const handleStartQuiz = () => {
    setShowTitle(false);
    setRandomHiragana();
  };

  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState(false);

  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const setRandomHiragana = () => {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    setCurrent(randomIndex);
  
    // Update audio source
    audioRef.current.pause();
  audioRef.current.currentTime = 0;

  // Update audio source and play
  audioRef.current.src = hiragana[randomIndex].audio;
  audioRef.current.playbackRate = playbackSpeed;
  }

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    audioRef.current.playbackRate = speed;
    playAudio(); // Play the audio again when the speed changes
  };

  const playAudio = () => {
    audioRef.current.play().catch(error => {
      console.error('Audio playback failed:', error);
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Input:', input.toLowerCase());
    console.log('Accent:', hiragana[current].accent.toLowerCase());
  
    if (input.toLowerCase() === hiragana[current].accent.toLowerCase()) {
      console.log('Correct answer!');
      setStreak(streak + 1);
      setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak);
      setError(false);
  
      localStorage.setItem('streak', streak + 1);
      localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak);
    } else {
      console.log('Wrong answer!');
      console.log('Current Streak:', streak);
      const h = hiragana[current].hiragana;
      const a = hiragana[current].accent;
      console.log('Correct Accent:', a.toLowerCase());
      setError(`Wrong! The correct answer for ${h} is ${a}`);
      console.log('Error State:', error); // Log the error state
      setStreak(0);
      console.log('Reset Streak:', 0);
      localStorage.setItem('streak', 0);
    }
  
    setInput('');
    setRandomHiragana();
    //playAudio();
  };
  
  useEffect(() => {
    // Log the error state after the component has re-rendered
    //setRandomHiragana();
    setStreak(parseInt(localStorage.getItem('streak')) || 0);
    setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0);
    console.log('Error State:', error);
  }, [error]);

  // useEffect(() => {
  //   setRandomHiragana();
  //   setStreak(parseInt(localStorage.getItem('streak')) || 0);
  //   setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0);
  // }, []);

  return (
    <>
      {showTitle ? (
        <TitlePage onStartQuiz={handleStartQuiz} />
      ) : (
        <div className="min-h-screen text-white text-center bg-indigo-800">
          {/* Audio element */}
          <audio ref={audioRef}>
            <source src={hiragana[current].audio} type="audio/mpeg" />
          </audio>
  
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
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2"
          />
        </form>
          {/* Display error message */}
    {error && (
      <div className="text-red-500 mb-4">
        <p>{error}</p>
      </div>
    )}
      </div>
   {/* Play Audio button */}
   <div className="mt-4">
        <button onClick={() => handleSpeedChange(1)} className="px-4 py-2 border border-white">
          Play Audio
        </button>
      </div>
{/* Playback speed controls */}
<div className="mt-4 flex justify-center space-x-4">
  <button
    onClick={() => handleSpeedChange(0.5)}
    className="px-4 py-2 border border-white mr-3"
  >
    0.5x
  </button>
  <br></br>
  <button
    onClick={() => handleSpeedChange(1)}
    className="px-4 py-2 border border-white mr-10"
  >
    1x
  </button>
  <br></br>
  <button
    onClick={() => handleSpeedChange(1.5)}
    className="px-4 py-2 border border-white"
  >
    1.5x
  </button>
</div>
</div>
)}
</>
);
    }
    
  

export default App;
