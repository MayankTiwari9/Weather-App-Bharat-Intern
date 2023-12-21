document.addEventListener("DOMContentLoaded", () => {

    const formSubmit = document.getElementById("formSubmit");
    
formSubmit.addEventListener('submit', function (e) {
    e.preventDefault();

    const search = document.getElementById("search").value;

    if (search === '') {
        alert('Please Give a City Name to Get Weather Data');
        return;
    } else {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0b4ae15b6e44d28fd75aa378da3ef714`)
            .then(res => {
                const searchedData = res.data;
                const resultElement = document.getElementById("result");
                resultElement.innerHTML = displaySearchedData(searchedData);
                displaySearchedData(searchedData);
            })
            .catch(err => {
                console.log(err);
            });
    }
});

function displaySearchedData(response) {
    console.log(response);

    const icon = response.weather[0].icon;
            const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
            const dir = directions[Math.round(response.wind.deg / 45) % 8];
            const sunset = new Date(response.sys.sunset * 1000);
            const sunsethours = sunset.getHours();
            const sunsetminutes = sunset.getMinutes();
            const sunsetseconds = sunset.getSeconds();
            const sunsetformattedTime = `${sunsethours}:${sunsetminutes}:${sunsetseconds}`;

            const sunrise = new Date(response.sys.sunrise * 1000);
            const sunrisehours = sunrise.getHours();
            const sunriseminutes = sunrise.getMinutes();
            const sunriseseconds = sunrise.getSeconds();
            const sunriseformattedTime = `${sunrisehours}:${sunriseminutes}:${sunriseseconds}`;

    return (
        `<div key=${response.id}>
            <div class='main-div'>
                <div class='first-div'>
                    <div class='address-div'>
                        <h1>${response.name}</h1>&nbsp;
                        <p>|</p>&nbsp;
                        <h1>${response.sys.country}</h1>
                    </div>
                    <div class='cloud-div'>
                        <p>Cloud: ${response.clouds.all}%</p>
                    </div>
                    <div class='temp-div'>
                        <h1>${(response.main.temp - 273).toFixed(2)}<sup>o</sup></h1>
                    </div>
                </div>
                <div class='icon-div'>
                <img src=${`http://openweathermap.org/img/w/${icon}.png`} alt="icon" />
                    <h2>${response.weather[0].description}</h2>
                </div>
            </div>
            <div class='condition-div'>
                  <div class='condition-heading'>
                    <h4>Weather Conditions</h4>
                  </div>
                  <div class='condition-description'>
                    <div>
                      <h2>Feels Like</h2>
                      <h2>${(response.main.feels_like - 273).toFixed(2)}<sup>o</sup></h2>
                    </div>
                    <div>
                      <h2>Minimum Temperature</h2>
                      <h2>${(response.main.temp_min - 273).toFixed(2)}<sup>o</sup></h2>
                    </div>
                    <div>
                      <h2>Maximum Temperature</h2>
                      <h2>${(response.main.temp_max - 273).toFixed(2)}<sup>o</sup></h2>
                    </div>
                    <div>
                      <h2>Humidity</h2>
                      <h2>${(response.main.humidity)}%</h2>
                    </div>
                  </div>
                  <div class='condition-description'>
                    <div>
                      <h2>Sunrise</h2>
                      <h2>${(sunriseformattedTime)}</h2>
                    </div>
                    <div>
                      <h2>Sunset</h2>
                      <h2>${sunsetformattedTime}</h2>
                    </div>
                    <div>
                      <h2>Wind Speed</h2>
                      <h2>${(response.wind.speed)} kmph</h2>
                    </div>
                    <div>
                      <h2>Wind Direction</h2>
                      <h2>${response.wind.deg} {dir}</h2>
                    </div>
                  </div>
                </div>
        </div>`
    );
}

axios.get("https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=0b4ae15b6e44d28fd75aa378da3ef714")
.then((res) => {
    const searchedData = res.data;
                const resultElement = document.getElementById("result");
                resultElement.innerHTML = displaySearchedData(searchedData);
                displaySearchedData(searchedData);
})
.catch((err) => {
    console.log(err);
})

})