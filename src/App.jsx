// import Card from './components/Card';
import fetchItems from './utils/getData';
import { useEffect, useState } from 'react';

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPokeData = async () => {
      const data = await fetchItems();
      setPokeData(data);
    };
    loadPokeData();
    console.log(pokeData);
  }, []);

  return <></>;
}

export default App;
