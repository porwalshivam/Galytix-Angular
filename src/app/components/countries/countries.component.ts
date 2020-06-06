import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WeatherComponent} from '../weather/weather.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries = [];
  page = 1;
  pageSize = 10;
  loading = false;
  searchTerm = '';
  searchTermChanged: Subject<string> = new Subject<string>();
  searchTermSubscription: Subscription;

  constructor(private countriesService: CountriesService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    console.log('countries component loaded.');
    this.getCountries();
    this.searchTermSubscription = this.searchTermChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(searchTerm => this.getCountries(searchTerm));
  }

  private getCountries(searchText: string = '') {
    this.countriesService.getCountries(searchText).subscribe((resp: Array<any>) => {
      this.countries = resp;
      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  searchCountries(searchText: string) {
    this.loading = true;
    this.searchTermChanged.next(searchText);
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }

  openWeatherInformation(country) {
    if (!country) {
      return;
    }
    const weatherModal = this.modalService.open(WeatherComponent);
    weatherModal.componentInstance.country = country;
  }
}
