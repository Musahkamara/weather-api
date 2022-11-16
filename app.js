const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon');



const updateUI = (data) => {

    console.log(data)

    // destructuring
 const  {cityDets,weather} = data;
//  const  weather=data.weather;
   
    // updates templates
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>`;



    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc)
   
    
}



const updateCity =  async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { 
        cityDets,weather};

}

cityForm.addEventListener('change', e => {
    // prevent default action
    e.preventDefault();

    //get city value

    const city = cityForm.city.value.trim();
    cityForm.reset()
   
    updateCity(city)
        .then(data => updateUI(data))
        .then(err => console.log(err))
    
})