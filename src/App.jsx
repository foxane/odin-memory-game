import Card from './components/Card';
import Loading from './components/Loading';
import fetchItems from './utils/getData';
import { useEffect, useState } from 'react';

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);

  useEffect(() => {
    const loadPokeData = async () => {
      try {
        const data = await fetchItems();
        setPokeData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setFetchFailed(true);
      } finally {
        setLoading(false);
      }
    };

    loadPokeData();
  }, []);

  const gameOver = () => {
    setScore(0);
    setClickedPokemon([]);
    alert('Game Over\nYour score is: ', score);
  };

  const clickHandler = (pokemonName) => {
    if (clickedPokemon.includes(pokemonName)) {
      gameOver();
      return;
    }

    setClickedPokemon((prevState) => [...prevState, pokemonName]);
    const currentScore = score + 1;
    setScore(currentScore);
    if (score >= highScore) setHighScore(currentScore);
  };

  if (fetchFailed) return <div>Fetch failed</div>;
  if (loading) return <Loading />;

  return (
    <div className="app">
      <p>{score}</p>
      <p>{highScore}</p>
      {pokeData.map((data) => (
        <Card key={data.id} data={data} clickHandler={clickHandler} />
      ))}
    </div>
  );
}

export default App;
