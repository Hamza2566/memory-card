import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [track, setTrack] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, sethighScore] = useState(0);

  const getRandomNumber = (max) => Math.floor(Math.random() * max);

  const get6random = (characters) => {
    const randomCharacters = [];
    const usedIndexes = new Set();

    while (randomCharacters.length < 6) {
      const randIndex = getRandomNumber(characters.length);
      if (!usedIndexes.has(randIndex)) {
        randomCharacters.push(characters[randIndex]);
        usedIndexes.add(randIndex);
      }
    }

    setData(randomCharacters);
  };

  const fetchCharacters = async () => {
    try {
      const res = await fetch('https://rickandmortyapi.com/api/character?page=1');
      const json = await res.json();
      const first20 = json.results.slice(0, 15); // Get only 20 characters
      get6random(first20); // Pick 6 from them
    } catch (err) {
      console.error('Error fetching characters:', err);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

 const handleClick = (e) => {
  const clickedName = e.target.alt;

  // If the character was not clicked before
  if (!track.includes(clickedName)) {
    // Update track and score in one go
    setTrack((prev) => [...prev, clickedName]);
    setScore((prev) => prev + 1);
  } else {
    // Reset if character was clicked before
    setTrack([]);
    setScore(0);
    sethighScore(score)
  }

  // Refresh with new 6 characters
  fetchCharacters();
};
useEffect(() => {
  console.log("Updated track:", track);
}, [track]);
useEffect(()=>{
  if (score > highscore) {
    sethighScore(score)
  }
},[score])

  return (
    <div className="container">
      <div className="scores">
          <p className="score">Score: {score}</p>
  <p className="highscore">High Score: {highscore}</p>
      </div>
      <div className="grids">
        {data.map((char, index) => (
          <div className="character-card" key={index} onClick={handleClick}>
            <img src={char.image} alt={char.name} className="character-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
