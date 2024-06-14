import React, { useState, useEffect, useRef } from 'react';
import drizzle from '../assets/drizzle.png';
import clouds from '../assets/clouds.png';
import clear from '../assets/clear.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import mist from '../assets/mist.png';
// import humidity from '../assets/humidity.png';
// import wind from '../assets/wind.png';
import "./weatherApi.css"

const Weatherfetch = () => {
    const [cityName, setCityName] = useState("Not Yet Loaded");
    const [temp,setTemp]=useState("Not yet Loaded");
    const [windSpeed,setWindSpeed]=useState("Not yet Loaded");
    const [weather,setWeather]=useState("Not yet Loaded");
    const [weatherId,setWeatherId]=useState();
    const [humidity,setHumidity]=useState("Not yet Loaded");
    // const [result,setResult]=useState();
    // const [imgdis,setImgdis] =useState();
    const weadis=useRef(null);
    const apiKey = "7269a9ead692ea6d826aaebf0b2f245a";
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    const fetchData = async () => {
        try {
            const response = await fetch(weatherApi);
            if (response.ok) {
                const res = await response.json();
                console.log(res);
                const temp= (res.main.temp && res.main.temp) || "";
                setTemp((temp-273.15).toFixed(2));
                setWindSpeed((res.wind.speed && res.wind.speed) || "");
                setWeather((res.weather && res.weather[0].description && res.weather[0].description) || "");
                setWeatherId((res.weather && res.weather[0].id && res.weather[0].id) || "")
                setHumidity(res.main.humidity);
                // setResult(res);
            try{
            if(weatherId>=200 && weatherId<300){
                // setImgdis({rain});
                weadis.current.src = rain;
            } else if(weatherId >= 300 && weatherId < 400){
                // setImgdis({drizzle});
                weadis.current.src = drizzle;
            }else if(weatherId >= 500 && weatherId < 600){
                // setImgdis({rain});
                weadis.current.src = rain;
            }else if(weatherId >= 600 && weatherId < 700){
                //  setImgdis({snow});
                weadis.current.src = snow;
            }else if(weatherId >= 700 && weatherId < 800){
                // setImgdis({mist});
                weadis.current.src = mist;
            }else if(weatherId === 800){
                // setImgdis({clear});
                weadis.current.src = clear;
            }else if(weatherId >= 801 && weatherId < 810){
                // setImgdis({clouds});
                weadis.current.src = clouds;
            }else{
                weadis.current.src = clouds;
            }
        } catch(err){
            console.error("error", err)
        }
            
            } else {
                console.error("Response not OK");
            }
        } catch (err) {
            console.error(err);
        }
       
    }

    useEffect(() => {
        fetchData();
    },[]);
    
    

    return(
        <div className='weatherapiDiv'>
            <div className='search'>
                <input type='text' placeholder='search' className='inputbox' onChange={(e)=>{setCityName(e.target.value)}}/>
                <button className='fetchbutton' onClick={fetchData}>Fetch</button>
            </div>
            <div className='card'>
                <div className='cardcols'>Name : {cityName}</div>
                <div className='cardcols'>Temperature : {temp}</div>
                <div className='cardcols'>Wind Speed : {windSpeed} m/s</div>
                <div className='cardcols'>Humidity : {humidity}%</div>
                <div className='cardcols'>Weather : {weather}</div>
                <div style={{margin:"auto"}}>
                    <img ref={weadis} className='cardimg' alt={weather}></img>
                </div>
            </div>
        </div>
    )
};

export default Weatherfetch;
