import { COUNTRIES_API } from "../utils/config";

export async function getCountries() {
  // racing countries fetch request with TIMEOUT_SEC clock:
  //   const response = await Promise.race([
  //     fetch(COUNTRIES_API),
  //     timeout(TIMEOUT_SEC),
  //   ]);

  // testing:
  //   await new Promise((res) => setTimeout(res, 5000));

  const response = await fetch(COUNTRIES_API, 
    { headers: { 'Authorization': 'Bearer rc_live_db6c92463d89411499a12745ad770d9a' } });
  const data = await response.json();

    const updatedData = data.data.objects.map((item) => {
    if (item.names.common === "United States") item.names.common = "USA";
    if (item.names.common === "United Kingdom") item.names.common = "UK";
    return item;
  });

  // console.log(updatedData);
  return updatedData;
}
