import {ForecastDetails} from './ForecastDetails.model'

export class ForecastData {
    public name : string
    //Deatils array of type ForecastDetails class.
    public details : Array<ForecastDetails> = new Array<ForecastDetails>();
  }