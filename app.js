const userInput = document.querySelector("#userCityInput");
const citySelectForm = document.querySelector("#citySelectForm")
const myModalAlternative = new bootstrap.Modal('#exampleModal');

const CityInfoURL = "https://geocoding-api.open-meteo.com/v1/search";

window.addEventListener("load", async () => {
    myModalAlternative.show();
})

let getCityData = async function () {
    const UserCity = userInput.value;
    let longitude;
    let latitude;

    const response = await fetch(CityInfoURL + `?name=${UserCity}&count=1`)
    let data = await response.json();
    data = data.results[0];

    if (data.lentgh != 0) {
        longitude = data.longitude;
        latitude = data.latitude;
        console.log(longitude);

    }
}
citySelectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    getCityData();
    myModalAlternative.hide();
});
