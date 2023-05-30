const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(nameCity.value === ''){
        showError('Campo obligatorio');
        return;}
    
    callAPI(nameCity.value);
    //console.log(nameCity.value);
})


function callAPI(city){
    const apiId = '04db14a2270bf89c43fff15a037b2925';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if(dataJSON.cod == '404'){
                showError('Ciudad no encontrada');
            } else{
                clearHTML();
                showWeather(dataJSON);}

            console.log(dataJSON);})
            
        .catch(error => {
            console.log(error);})}


function showWeather(data){
    const{name, main:{temp, temp_max, temp_min}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const max = kelvinToCentigrade(temp_max);
    const min = kelvinToCentigrade(temp_min);

    const content = document.createElement('div');
    content.innerHTML = `
    <h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="Icon">
    <h2>${degrees}ºC</h2>
    <p>Max: ${max}ºC</p>
    <p>Min: ${min}ºC</p>`;

    result.appendChild(content);

    console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr);}


function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);}


function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);}

    
function clearHTML(){
    result.innerHTML = '';}