import { useState, useEffect, createContext, useContext } from "react";

import { COUNTRIES_API } from "../utils/config";

const CountriesContext = createContext();

function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  // getting initial countries list (for flags and book origin selector)
  useEffect(function () {
    async function getCountryList() {
      // todo - catchAsync
      try {
        setLoadingCountries(true);
        const res = await fetch(COUNTRIES_API);
        const data = await res.json();
        setCountries(
          data.map((item) => {
            if (item.name.common === "United States") item.name.common = "USA";
            if (item.name.common === "United Kingdom") item.name.common = "UK";
            return item;
          })
        );
      } catch (err) {
        console.error("Error in country list API", err.message);
      } finally {
        setLoadingCountries(false);
      }
    }
    getCountryList();
  }, []);
  return (
    <CountriesContext.Provider value={{ countries, loadingCountries }}>
      {children}
    </CountriesContext.Provider>
  );
}

function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined)
    throw new Error("Countries context used outside of the provider");
  return context;
}

export { CountriesProvider, useCountries };
