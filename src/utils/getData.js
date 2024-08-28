const fetchItems = async () => {
  const IDS = [23, 54, 25, 65, 134, 90, 33, 95];

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
