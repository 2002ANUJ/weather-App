const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', ()=> {

    const APIKey = '8d1bc0071f6455b84504854b16f9fe86';
    const city = document.querySelector('.search-box input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if(json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        // const humidity = document.querySelector('.weather-box .humidity span');
        const humidity = document.getElementById('data');
        const wind = document.getElementById('wind-data');

        switch(json.weather[0].main){
            case 'clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'clouds':
                image.src = 'images/cloud.png';
                break;
            
            case 'Mist':
                image.src = 'image/mist.png';
                break;
            
            case 'Haze':
                image.src = 'image/mist.png';
                break;
            
            default:
                image.src = 'images/cloud.png';
                break;
        };

        temperature.innerHTML = `${Math.round((parseInt(json.main.temp))-273.15)}<span>c</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        // console.log(json.wind.speed);
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
    });
});