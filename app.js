let selectedCityWeather = []
const infoDiv = document.querySelector('.info')


const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3443d1903ee97e71b2efab4695e5f815&units=metric`);
        if(!response.ok){
          throw new Error ('data could not fetch')
        }
        const data = await response.json();
        if(!data || data.length === 0){
            throw new Error("City weather could not fetch")
        }
        document.getElementById('entered-input').value=''
        const isCityExist = selectedCityWeather.some(city => city.cityName === data.name);
        if(!isCityExist){
          pushDatatoArray(data); 
        }else{
          infoDiv.innerHTML=`
          <p class="info-text">City is already exist.</p>
        `
          setTimeout(() => {
            infoDiv.innerHTML=''
          }, 5000);
        }
      } catch (error) {
        infoDiv.innerHTML=`
          <p class="info-text">City not found</p>
        `
          setTimeout(() => {
            infoDiv.innerHTML=''
          }, 5000);
      }
}

const pushDatatoArray = async (data) =>{   
     const{name,sys,main,weather} = await data;
     selectedCityWeather.unshift({
        id: uuidv4(),
        cityName: name,
        countryName:sys.country,
        temp: Math.round(main.temp),
        // weather: weather.length === 0? '...' :weather[0].main,
        weatherDesc: weather.length === 0? '...' :weather[0].description,
        tempMin:Math.round(main.temp_min),
        tempMax:Math.round(main.temp_max),
        icon:weather.length === 0? '...' :weather[0].icon
  })
    printScreen()
}
const printScreen = () => {
  
    let uptadeArr = ''
    selectedCityWeather.map(({cityName,countryName,temp,weatherDesc,tempMin,tempMax,icon,id})=>{ 
        uptadeArr += `
        <div class="card">
        <div class="delete-card" onclick="deleteCard('${id}')">
                <i class="bi bi-x"></i>
        </div>
        <div class="card-img">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather"  />
        </div>
        <div class="desc">
        <div>
          <h1 class="primary-text">${temp}° C</h1>
          <h2 class="secondary-text">${weatherDesc}</h2>
          </div>
          <h1 class="primary-text">${cityName} , ${countryName}</h1>
        </div>
        <div class="details">
          <div class="rating">
            <h3 class="min-max-temp">${tempMin}° C</h3>
            <h3>Min</h3>
          </div>
          <div class="activity">
          <h3 class="min-max-temp">${tempMax}° C</h3>
          <h3>Max</h3>
        </div>
          </div>
        </div>
      </div>
        ` 
    }) 
    document.querySelector('.card-container').innerHTML = uptadeArr;
}
const deleteCard = (id) =>{
    selectedCityWeather = selectedCityWeather.filter(((city)=> city.id !== id))
    printScreen()
} 

const enteredValue = document.getElementById("entered-input")
enteredValue.addEventListener('keypress',  (e) => {
  if (e.key === 'Enter') {   
       if(selectedCityWeather.length === 3){
      infoDiv.innerHTML=`
        <p class="info-text">You have reached the limit of 3 cities. Please remove a city before adding another one.  </p>
         `
          setTimeout(() => {
            infoDiv.innerHTML=''
           }, 5000);
       }else{
        getWeatherData(enteredValue.value)
       }
    }
})

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


// window.onload= (e) => {
//   navigator.geolocation?.getCurrentPosition(async ({coords})=>{
//     const {lat, lon} = coords;
//     console.log(lat,lon);
//     try {
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3443d1903ee97e71b2efab4695e5f815&units=metric`);
//       if(!response.ok){
//         throw new Error ('strifsd')
//       }
//       console.log(response);
//     } catch (error) {
      
//     }
    
//   })
// };
