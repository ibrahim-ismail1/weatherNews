var firstDayName =document.getElementById('day1-name')
var firstDayDate =document.getElementById('day1-date')
var firstDayCity =document.getElementById('day1-city')
var firstDayTemp =document.getElementById('day1-temp')
var firstDayIcon =document.getElementById('day1-icon')
var firstDayText =document.getElementById('day1-text')
var firstDayHumidety =document.getElementById('day1-humidety')
var firstDayWind =document.getElementById('day1-wind')
var firstDayDir =document.getElementById('day1-dir')
var restDaysName=document.getElementsByClassName('days-name')
var restDaysIcon=document.getElementsByClassName('days-icon')
var restDaysMaxTemp=document.getElementsByClassName('days-max-temp')
var restDaysMinTemp=document.getElementsByClassName('days-min-temp')
var restDaysText=document.getElementsByClassName('days-text')
var searchInput=document.getElementById('search')


arr=['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday' ,'Friday', 'Saturday']

var Wdy=document.getElementById('dy')



  


async function res(city){
       let x= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=806600c2692d49429f2185845232208&q=${city}&days=3`);
       let resp=await x.json()
       return resp;
}

function displayDay1(data)
{
    let todayName=new Date()

    firstDayName.innerHTML=todayName.toLocaleDateString("en-Us",{weekday:'long'})
    firstDayDate.innerHTML=`${todayName.getDate()}`+'-'+todayName.toLocaleDateString('en-US',{month:'long'});
    firstDayCity.innerHTML=data.location.name;
    firstDayTemp.innerHTML=data.current.temp_c;
    firstDayIcon.setAttribute('src','https:'+data.current.condition.icon);
    firstDayText.innerHTML=data.current.condition.text;
    firstDayHumidety.innerHTML=data.current.humidity+'%';
    firstDayWind.innerHTML=data.current.wind_kph+'Km/h';
    firstDayDir.innerHTML=data.current.wind_dir;

}
function displayDay2(data)
{let forecastData=data.forecast.forecastday;
    
   
   

   
    for(let i=0;i<2;i++)
    {
        let nextDay=new Date(forecastData[i+1].date)
        restDaysName[i].innerHTML=nextDay.toLocaleDateString('en-US',{weekday:'long'})
        restDaysIcon[i].setAttribute('src','https:'+forecastData[i+1].day.condition.icon)
        restDaysMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
        restDaysMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
        restDaysText[i].innerHTML=forecastData[i+1].day.condition.text
    }
}
async function Display(city='cairo')
{
    let resp= await res(city)
   if(!resp.error)
   {
    displayDay1(resp)
    displayDay2(resp)
   }
   
}
Display()
searchInput.addEventListener('input',function(){
    let cityInput=searchInput.value
    Display(cityInput)
})
