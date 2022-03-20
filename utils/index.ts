export const isEmpty = (obj: {}) => {
  return obj && Object.keys(obj).length === 0;
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("fetcher unsuccessful");
  }
  const data = await res.json();
  return data;
};
