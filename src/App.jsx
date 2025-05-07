import { useEffect, useState } from 'react'
import './App.css'


function Pokemon() {
  const [Pokemon,setpokemon] = useState(null)
  const [poke,setpoke] = useState(null)
  

  useEffect(()=>{
    fetch('https://rickandmortyapi.com/api/character')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => {
      setpokemon(data.results);   // Save array of Rick characters
      
    })
  },[])
  useEffect(()=>{
    console.log(Pokemon);
  },[Pokemon])
  if (!Pokemon) return(
    <div className='container'>Hi</div>
  );
  const getRandomPokemon = () => {
    const shuffled = [...Pokemon].sort(() => 0.5 - Math.random()); // Shuffle array
    setpoke(shuffled.slice(0, 6))
  };
  console.log(poke);
  
  
  return(

    
    <>
    
     <div className="container">
     {Pokemon.map((poke,index)=>{
      return <div key={index} style={{
         backgroundImage: `url(${poke.image})`,
      }}>{poke.name}</div>
    })}
    </div>

      {/* <div className="scores">
         
      </div>
      <div className="grids">
        
      {Pokemon.map((poke,index) => {
        if (index === 6) {
          return
          
        }
        else{
          index++;
          return <div className='pok' key={poke.image}>{poke.name}</div>;
        }
        })}

      </div> */}
    {/* </div>  */}
    </>
  )
  
}
export default Pokemon