const urlCafeterias = (latLong: string, limite: Number, query: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=9500&limit=${limite}`;
};

export const fetchCafeterias = async () => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_API_KEY}`,
    },
  };

  const response = await fetch(
    urlCafeterias("39.47156679883213%2C-0.37647716672590537", 6, "coffee"),
    options
  );
  const { results } = await response.json();

  return results;
};
