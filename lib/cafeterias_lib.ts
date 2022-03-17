import { createApi } from "unsplash-js";

const unsplashServerApi = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

const urlCafeterias = (latLong: string, limite: string, query: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=9500&limit=${limite}`;
};

const fotosCafeterias = async () => {
  const photos = await unsplashServerApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
    orientation: "landscape",
  });

  const unsplashResults = photos.response!.results;

  return unsplashResults.map((res) => res.urls["regular"]);
};

export const fetchCafeterias = async (
  latLong: string = "39.47156679883213%2C-0.37647716672590537",
  limite: string = "6"
) => {
  const photos = await fotosCafeterias();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
    },
  };

  const response = await fetch(
    urlCafeterias(latLong, limite, "coffee"),
    options
  );
  const { results } = await response.json();

  //idx of every result
  return results?.map(
    (
      result: {
        location: {
          neighborhood: string;
          address: string;
          cross_street: string;
        };
        fsq_id: string;
        name: string;
      },
      idx: number
    ) => {
      const neighborhood = result.location.neighborhood;
      return {
        fsq_id: result.fsq_id,
        address: result.location?.address || "",
        name: result.name,
        neighborhood:
          (neighborhood && neighborhood.length > 0 && neighborhood[0]) ||
          result.location.cross_street ||
          "",
        imgUrl: photos[idx],
      };
    }
  );
};
