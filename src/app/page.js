
'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';



function Card(props) {
  const [likes, setLikes] = useState(0);

  <div
    className="card col-4 d-flex justify-content-center"
  >
    <img
      className="card img-top"
      src={props.src}
      alt="..."
    />

    <div className="card-body">
      
      <Link href={{pathname:"pokemons/[id]" , query: {id: props.id}}} >  
      <h5 className="card-title">{props.title} </h5>
      hello
      </Link>
      <p className="card-text">{props.text}</p>


    </div>
  </div>

  /*
    if (likes === 0) {
      return (
        <div className="container col-4 d-flex justify-content-center">
          <div className="card">
            <button onClick={() => { setLikes(likes + 1) }}> Click to reveal a surprise</button>
          </div>
        </div>
      );
    }
  */

  return (
    <div className="card col-4 d-flex justify-content-center">
      <img src={props.src} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        {likes === 0 ? null : <p className="card-text"> Likes: {likes} </p>}
        {likes === 8 ? null : <button className="btn btn-danger" onClick={() => { setLikes(likes + 1) }}> {props.buttonText} </button>}


      </div>
    </div >
  );
}



function App() {
  
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset] = useState(0);
  const limit = 3;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)


      .then(response => {
        return response.json(); 
      })
      .then(json => {
        setIsLoading(false);
        setPokemonList([...pokemonList, ...json["results"]]);
      })


  }, [offset]) /* ,[] tells the function useEffect() to only re-render the component once, 
        as opposed to re-rendering every time the function is called
  */


  function getIDFromPokemon(pokemon) {
    return pokemon.url.replace(
      "https://pokeapi.co/api/v2/pokemon/", ""
    ).replace("/", "");
  }


  return (
    <div className="App">
      <div className ="container">
        <div className="row">
          {pokemonList.map(pokemon => {
            const id=getIDFromPokemon(pokemon)
            return <Card
              key={id}
              id={id}
              title={pokemon["name"]}
              buttonText="Likes"
              text="text"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            />
          })}
        </div>
      </div>

      <div>
        {isLoading == true ? <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> : null}
      </div>

      <div style = {{textAlign:"center" }}>
        <button onClick={() => { setOffset(offset + limit) }}> More Pokemons </button>
      </div>
    </div>
  );
}

export default App;
