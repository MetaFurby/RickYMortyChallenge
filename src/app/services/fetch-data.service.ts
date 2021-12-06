import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  API_FETCH_CHARACTERS= `${environment.API_ROOT_URL}${environment.API_CHARACTERS}`;
  API_FETCH_LOCATIONS= `${environment.API_ROOT_URL}${environment.API_LOCATIONS}`;
  API_FETCH_EPISODES= `${environment.API_ROOT_URL}${environment.API_EPISODES}`;

  constructor(private httpClient: HttpClient) { }

  private getObjectFromPage(url: string, page: number){
    if(page!==1){
      url = url + '?page=' + page.toString();
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.get<any>(url, httpOptions).pipe(
      map(res => { return res})
    );
  }

  getAllCharacters(currentPage = 1) {
    return this.getObjectFromPage(this.API_FETCH_CHARACTERS,currentPage);
  }
  getAllLocations(currentPage = 1) {
    return this.getObjectFromPage(this.API_FETCH_LOCATIONS,currentPage);  
  }
  getAllEpisodes(currentPage = 1) {
    return this.getObjectFromPage(this.API_FETCH_EPISODES,currentPage);
  }
}
