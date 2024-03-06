export const setPriceRange = (minPrice, currValue) => {
  if (currValue == minPrice) {
    return `${minPrice}`;
  } else {
    return `${minPrice}-${currValue}`;
  }
};

export const createQueryString = (name, value, searchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};
