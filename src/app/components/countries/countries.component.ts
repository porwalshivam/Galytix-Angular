import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

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

  constructor(private countriesService: CountriesService) {
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
    }, error => {
      console.error(error);
    });
  }

  searchCountries(searchText: string) {
    this.searchTermChanged.next(searchText);
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }

}
