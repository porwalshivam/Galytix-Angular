import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private readonly appId = '794ee95e63c5a32aaf88cd813fa2e425';

  constructor(private http: HttpClient) {
  }

  getWeatherInformation(capitalWithCode: string, unit) {
    return this.http.get(this.baseUrl, {
      params: {
        q: capitalWithCode,
        APPID: this.appId,
        units: unit
      }
    });
  }
}
