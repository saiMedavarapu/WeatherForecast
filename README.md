# WeatherForecast:[![](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/saiMedavarapu/WeatherForecast/blob/master/LICENSE)
Integration of Open weather API using Angular, Angular Material. It gives the Current Day weather details and 5 Day forecast.
# Demo:
Click here for [Demo](https://youtu.be/fQyCqcOD1Ec)
# Running Guide:
1) Download the Repository
2) Open the project in Visual Studio Code
3) Type 'ng serve' in the terminal
# API Key.
You can generate API Key from [openweathermap](https://openweathermap.org/api) or use the existing key.
# Forecast Service

When the zip code  is entered and clciked this triggers the Loadforecast and LoadCurrentWeather methods.

This method returns an observable for forecast weather which can be subscribed in the component.
``` typescript
  LoadForecastWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?
    zip="+zip+",us&APPID=dabc2b57d81c4493c08ab63bb4d9e326&units=imperial" );
  }
```
This Method returns an observable for the current weather from API.
```typescript
  LoadCurrentWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?
    zip="+zip+",us&APPID=dabc2b57d81c4493c08ab63bb4d9e326&units=imperial" );
  }

```

# Forecast Component 

When Forecast service return the observable, we can subscribe to it and the returned 
data is in JSON. We have to fetch the data accordingly

``` typescript
loadForecastWeather() {
       this.forecastService.LoadForecastWeather(this.zip).subscribe(
      res => {
               this.forecastData = new ForecastData();//Instance to store the Data of ForecastModel
               this.forecastData.name = res.city.name;
           for(var i=7; i<res.list.length;i=i+8)//Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
           {
             //Instance of type ForecastDetails and stores the data in it.
             var details = new ForecastDetails();
                 details.date = res.list[i].dt_txt;
                 details.maxTemperature = res.list[i].main.temp_max;
                 details.minTemperature = res.list[i].main.temp_min;
                 details.description = res.list[i].weather[0].description;
                 details.icon = res.list[i].weather[0].icon;
                 this.forecastData.details.push(details);//Pushing the data to the to created object
   
           }
           this.showCurrent = false;
           this.showForecast = true;
      }
    )
   }
```
