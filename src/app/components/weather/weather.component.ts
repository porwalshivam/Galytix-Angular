import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
  @Input() country;
  weatherInformation: any;
  units = ['metric', 'imperial'];
  currentUnit = this.units[0];

  constructor(private weatherService: WeatherService, private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log('WeatherComponent loaded.');
    this.getWeatherInformation();
  }

  getWeatherInformation() {
    if (!this.country) {
      return;
    }
    const capitalWithCode = `${this.country.capital},${this.country.alpha2Code}`;
    this.weatherService.getWeatherInformation(capitalWithCode, this.currentUnit).subscribe(resp => {
      this.weatherInformation = resp;
    }, error => {
      console.log(error);
    });
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}

