import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit {
  countries = [];
  page = 1;
  pageSize = 10;
  loading = false;
  searchTerm = '';

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    console.log('countries component loaded.');
    this.getCountries();
  }

  private getCountries() {
    this.countriesService.getCountries().subscribe((resp: Array<any>) => {
      this.countries = resp;
    }, error => {
      console.error(error);
    });
  }

}
