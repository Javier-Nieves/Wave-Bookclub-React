import { COUNTRIES_API } from "../utils/config";

export async function getCountries() {
  // racing countries fetch request with TIMEOUT_SEC clock:
  //   const response = await Promise.race([
  //     fetch(COUNTRIES_API),
  //     timeout(TIMEOUT_SEC),
  //   ]);

  // testing:
  //   await new Promise((res) => setTimeout(res, 5000));

  const response = await fetch(COUNTRIES_API);
  const data = await response.json();

  const updatedData = data.map((item) => {
    if (item.name.common === "United States") item.name.common = "USA";
    if (item.name.common === "United Kingdom") item.name.common = "UK";
    return item;
  });

  console.log(updatedData);
  return updatedData;
}
