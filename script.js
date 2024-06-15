
const myForm = document.querySelector(".myform")
const city = document.getElementById("cityinput")
const weatherDetails = document.querySelector("weatherdata") 
const defaultText = document.getElementById("default")

const place = document.getElementById("city")
const myIcon = document.getElementById("icon")
const myTemprature = document.getElementById("temprature")
const myFeelsLike = document.getElementById("feelslike")
const myHumidity = document.getElementById("humidity")
const desc = document.getElementById("desc")

const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ernakulam?unitGroup=us&include=current&key=P3HZ2BL2HXDRJBBRG3LHRAN6K&contentType=json`


document.addEventListener("submit",async event=>{
    event.preventDefault()
    const cityName = city.value
    if(cityName){
        try{
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&include=current&key=P3HZ2BL2HXDRJBBRG3LHRAN6K&contentType=json`)
            if(!response.ok){
                throw new Error("Could Not Fetch Data")
            }
            defaultText.textContent =``
            wetherData = await response.json()
            const {resolvedAddress:name,currentConditions:{conditions,humidity,icon,temp,feelslike}} = wetherData
            place.textContent = name
            myIcon.textContent = getWeatherEmoji(icon)
            let fl = parseFloat(feelslike)
            let temprature = parseFloat(temp)
            temprature = ((temprature - 32) * 5 / 9).toFixed()
            fl = ((fl - 32) * 5 / 9).toFixed()
            myTemprature.textContent = `Temprature: ${temprature}℃`
            myHumidity.textContent = `Humidity: ${humidity}%`
            myFeelsLike.textContent = `FeelsLike: ${fl}℃`
            desc.textContent = `${conditions}`
            
        }catch(error)
        {
            defaultText.textContent =`Could not fetch data.`
        }
    }
    else{
        defaultText.textContent ="Please enter a city name."
    }
})

function getWeatherEmoji(icon) {
    const weatherIcons = {
        "snow": "❄️",
        "snow-showers-day": "🌨️",
        "snow-showers-night": "🌨️",
        "thunder-rain": "⛈️",
        "thunder-showers-day": "🌦️",
        "thunder-showers-night": "🌦️",
        "rain": "🌧️",
        "showers-day": "🌦️",
        "showers-night": "🌦️",
        "fog": "🌫️",
        "wind": "💨",
        "cloudy": "☁️",
        "partly-cloudy-day": "⛅",
        "partly-cloudy-night": "🌤️",
        "clear-day": "☀️",
        "clear-night": "🌕",
    };

    return weatherIcons[icon] || "❓";
}
