const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructure properties
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Imperial.Value}</span>
      <span>&deg;F</span>
      </div>
  `;

  // update the night/day and icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);


  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  // let timeSrc = null;
  // if (weather.IsDayTime) {
  //   timeSrc = 'img/day.svg';
  // } else {
  //   timeSrc = 'img/night.svg';
  // }

  //remove d-none class
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }

}

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets, weather
  };
}

cityForm.addEventListener('submit', e => {
  //prevent default action
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();



  // update the UI with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);
});


if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}