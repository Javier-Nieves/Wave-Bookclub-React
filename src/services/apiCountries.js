import { COUNTRIES_API } from "../utils/config";

export async function getCountries() {
  // racing countries fetch request with TIMEOUT_SEC clock:
  //   const response = await Promise.race([
  //     fetch(COUNTRIES_API),
  //     timeout(TIMEOUT_SEC),
  //   ]);

  // testing:
  //   await new Promise((res) => setTimeout(res, 5000));

  // const response = await fetch(COUNTRIES_API, 
  //   { headers: { 'Authorization': 'Bearer rc_live_db6c92463d89411499a12745ad770d9a' } });
  // const data = await response.json();
      const response1 = await fetch(`${COUNTRIES_API}}`,
      { headers: { 'Authorization': 'Bearer rc_live_db6c92463d89411499a12745ad770d9a' } }
    );
    const data = await response1.json();
    const response2 = await fetch(`${COUNTRIES_API}&offset=100`,
      { headers: { 'Authorization': 'Bearer rc_live_db6c92463d89411499a12745ad770d9a' } }
    );
    const data2 = await response2.json();
    const response3 = await fetch(
      `${COUNTRIES_API}&offset=200`,
      { headers: { 'Authorization': 'Bearer rc_live_db6c92463d89411499a12745ad770d9a' } }
    );
    const data3 = await response3.json();
    data.data.objects = [...data.data.objects,...data2.data.objects,...data3.data.objects]

    const updatedData = data.data.objects.map((item) => {
    if (item?.names?.common === "United States") item.names.common = "USA";
    if (item?.names?.common === "United Kingdom") item.names.common = "UK";
    return item;
  });

  // console.log(updatedData);
  return updatedData;
}
