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
      const first20 = json.results.slice(0, 15); 
      get6random(first20); 
    } catch (err) {
      console.error('Error fetching characters:', err);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

 const handleClick = (e) => {
  const clickedName = e.target.alt;

  if (!track.includes(clickedName)) {
    setTrack((prev) => [...prev, clickedName]);
    setScore((prev) => prev + 1);
  } else {
    setTrack([]);
    setScore(0);
    sethighScore(score)
  }

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
