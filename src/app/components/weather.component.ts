import { Component } from '@angular/core';
import {ForecastService} from '../services/forecast.service'
import { MatIconRegistry} from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import {ForecastData} from '../models/ForecastData.model';
import {ForecastDetails} from '../models/ForecastDetails.model';
import {WeatherData} from '../models/weatherData.model';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['../app.component.scss']
})
export class WeatherComponent {
  //Declrations
  title = 'Weather App';
  listFilter;
  zip: number;
  showCurrent: boolean = false;
  showForecast: boolean = false;
  weatherDetails: WeatherData = new WeatherData();
  forecastData : ForecastData;
  isDark: boolean = false;

  /*
  Injected Forecast service, DomSanitizer for the icons 
  for the thirdparty icon sanitizing.
  */
  constructor(private forecastService: ForecastService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) { }

  ngOninit(){

    }

   /*
    This function is to load the forecast weather. This will subsrcibe from the 
    publisher of the URL from the Forecast service which returns an observable. 
   */ 
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
   
/**
 * This will subsrcibe from the publisher of the URL 
 * from the Forecast service which returns an observable.  
 */

   loadCurrentWeather() {
     this.forecastService.LoadCurrentWeather(this.zip).subscribe(
    res => {
         this.weatherDetails.cityName = res.name;
         this.weatherDetails.description = res.weather[0].description;
         this.weatherDetails.currentTemperature=   res.main.temp;
         this.weatherDetails.icon = res.weather[0].icon;
         this.weatherDetails.maxTemperature=res.main.temp_max;
         this.weatherDetails.minTemperature = res.main.temp_min;
         this.showCurrent = true;
         this.showForecast = false;
    }
   )
   }
   /** Registering the icons*/
   private registerIcons(): void {
     this.iconRegistry.addSvgIcon("menu", this.sanitizer.bypassSecurityTrustResourceUrl("assets/menu.svg"));
   }
   //Function to toggle the theme.
   toggleTheme(){
     this.isDark = !this.isDark;
   }


   }
   
  
   

   
   