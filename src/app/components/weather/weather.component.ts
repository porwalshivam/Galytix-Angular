import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
  @Input() capitalWithCode: string;
  weatherInformation: any;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    console.log('WeatherComponent loaded.');
  }

  getWeatherInformation() {
    if (!this.capitalWithCode) {
      return;
    }
    this.weatherService.getWeatherInformation(this.capitalWithCode).subscribe(resp => {
      this.weatherInformation = resp;
    }, error => {
      console.log(error);
    });
  }


}
