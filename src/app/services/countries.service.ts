import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly baseUrl = 'https://restcountries.eu/rest/v2/';

  constructor(private http: HttpClient) {
  }

  getCountries(searchText: string = '') {
    let apiUrl = this.baseUrl;
    if (searchText) {
      apiUrl += `name/${searchText}`;
    } else {
      apiUrl += 'all';
    }

    return this.http.get(apiUrl);

  }

}
