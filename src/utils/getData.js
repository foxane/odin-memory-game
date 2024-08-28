const ITEM_COUNT = 9; // Hoy many card to use

const randomizeIds = () => {
  const result = [];
  for (let i = 0; i < ITEM_COUNT; i++) {
    let randomNumber = Math.ceil(Math.random() * 200);
    while (result.includes(randomNumber)) {
      randomNumber = Math.ceil(Math.random() * 200);
    }
    result.push(randomNumber);
  }
  return result;
};

const fetchItems = async () => {
  const IDS = randomizeIds();

  try {
    const requests = IDS.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching ID ${id}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((result) => ({
          id: result.id,
          name: result.name,
          imgSrc: result.sprites.other['official-artwork'].front_default,
        })),
    );

    const results = await Promise.all(requests);
    return results;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; // Pass error to App.jsx
  }
};

export default fetchItems;
