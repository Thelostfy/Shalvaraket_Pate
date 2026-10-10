const userInput = document.querySelector("#userChoosen");
const citySelectForm = document.querySelector("#citySelectForm")
const myModalAlternative = new bootstrap.Modal('#SelectModal');
const bgImageDiv = document.querySelector("#bgImage");
const MainDiv = document.querySelector("#MainImage");


const CityInfoURL = "https://geocoding-api.open-meteo.com/v1/search";
const forecast = "https://api.open-meteo.com/v1/forecast";

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

    longitude = data.longitude;
    latitude = data.latitude;

    const response2 = await fetch(forecast + `?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m `)
    const data2 = await response2.json();
    try {
        if (data2.current.apparent_temperature > 22 && data2.current.wind_speed_10m <= 15) {
            MainDiv.setAttribute("style", "background-color: #f5f4e0;")

            bgImageDiv.innerHTML = `
            <span><b>City:</b> ${UserCity}</span>
            <br>
            <span><b>temperature:</b> ${data2.current.apparent_temperature} C</span>
            <br>
            <span> <b>Wind speed: </b> ${data2.current.wind_speed_10m} K/m</span>

            <img src="Images/yes.png" class="img-fluid" alt="">`
        }
        else {
            MainDiv.setAttribute("style", "background-color: #f2e1c9;")
            bgImageDiv.innerHTML = `
            <span><b>City:</b> ${UserCity}</span>
            <br>
            <span><b>temperature:</b> ${data2.current.apparent_temperature} C</span>
            <br>
            <span> <b>Wind speed: </b> ${data2.current.wind_speed_10m} K/m</span>

            <img src="Images/no.png" class="img-fluid" alt="">`
        }

    } catch (error) {
        console.error("خطا در پردازش شهر ", error)
        bgImageDiv.innerHTML = `<span> خطا در پردازش شهر! لطفا مجدد تلاش کنید</span>`
    }

}
citySelectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    getCityData();
    myModalAlternative.hide();
});
