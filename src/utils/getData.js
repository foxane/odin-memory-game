// Goodluck keeping track a sink & a weight
const fetchItems = async () => {
  const IDS = [23, 54, 25, 65, 134, 90, 33, 95];

  try {
    const requests = IDS.map(async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(response);
      }

      return {
        id: result.id,
        name: result.name,
        imgSrc: result.sprites.other['official-artwork'].front_default,
      };
    });

    const results = await Promise.all(requests);
    return results;
  } catch (error) {
    console.log('Fetch failed: ', error);
    return [];
  }
};

export default fetchItems;
