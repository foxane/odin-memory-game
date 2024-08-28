import Card from './components/Card';
import Loading from './components/Loading';
import Header from './components/Header';
import Modal from './components/Modal';
import fetchItems from './utils/getData';
import { useEffect, useState } from 'react';

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [modal, setModal] = useState('');

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

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const shuffleCard = () => {
    const result = pokeData.slice();
    for (let i = pokeData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    setPokeData(result);
  };

  const gameOver = (isWin) => {
    const message = [
      'You win',
      `You lose! Already clicked ${capitalize(
        clickedPokemon[clickedPokemon.length - 1],
      )}`,
    ];
    setModal(isWin ? message[0] : message[1]);
    setScore(0);
    setClickedPokemon([]);
    shuffleCard();
  };

  const clickHandler = (pokemonName) => {
    const currentScore = score + 1;

    if (clickedPokemon.includes(pokemonName)) {
      gameOver(false);
      return;
    }
    setScore(currentScore);
    if (currentScore >= highScore) setHighScore(currentScore);
    if (currentScore === pokeData.length) {
      gameOver(true);
      return;
    }
    setClickedPokemon((prevState) => [...prevState, pokemonName]);
    shuffleCard();
  };

  if (fetchFailed)
    return <Modal text={'Failed receiving data'} setModal={setModal} />;
  if (loading) return <Loading />;

  return (
    <div className="app">
      {modal !== '' && <Modal text={modal} setModal={setModal} />}
      <Header score={score} highScore={highScore} />
      <div className="card-container">
        {pokeData.map((data) => (
          <Card key={data.id} data={data} clickHandler={clickHandler} />
        ))}
      </div>
    </div>
  );
}

export default App;
