import { createApi } from "unsplash-js";

const unsplashServerApi = createApi({
  accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

const urlCafeterias = (latLong: string, limite: Number, query: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=9500&limit=${limite}`;
};

const fotosCafeterias = async () => {
  const photos = await unsplashServerApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 10,
    orientation: "landscape",
  });

  const unsplashResults = photos.response!.results;

  return unsplashResults.map((res) => res.urls["regular"]);
};

export const fetchCafeterias = async () => {
  const photos = await fotosCafeterias();

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

  //idx of every result
  return results.map((result: {}, idx: number) => {
    return {
      ...result,
      imgUrl: photos[idx],
    };
  });
};
