import axios from "axios";

axios.defaults.baseURL = "https://countriesnow.space/api/v0.1/countries";

const getCountries = async () => {
  const url = "https://api.countrystatecity.in/v1/countries";
  return await axios.get(url, {
    headers: {
      "X-CSCAPI-KEY":
        "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
    },
  });
};

const getStates = async ({
  countryIso,
  iso2,
}: {
  countryIso: string;
  iso2: string;
}) => {
  const url = `https://api.countrystatecity.in/v1/countries/${iso2}/states`;
  return await axios.get(url, {
    headers: {
      "X-CSCAPI-KEY":
        "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
    },
  });
};

export { getCountries, getStates };
