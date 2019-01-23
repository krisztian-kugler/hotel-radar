import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public userLocation: string;

  public dataTransfer = new Subject<any>();
  public dataFetched = new Subject<boolean>();

  public formData = {
    query: <string>"",
    location: <string>"",
    radius: <number>3000
  }

  private client = {
    id: "DZB2DDDEUMZD1RPPP15LJ0FB1430D1SAQFXZNBIWCQYQ55DP",
    secret: "2YMMZEU25BMI5IOZKQ4OXSQGIYQ3KC32PJBVS4TRJH03OBUK"
  }

  public getUserLocation(): Observable<Object> {
    const url = "http://ip-api.com/json?fields=country,city,lat,lon";
    return this.http.get(url);
  }

  public getVenues(location: string, options: { radius: number, query?: string }): Observable<Object> {
    const urlRoot = "https://api.foursquare.com/v2/venues/search/";
    const auth = `?client_id=${this.client.id}&client_secret=${this.client.secret}`;
    const version = "&v=20190121";
    const city = `&near=${location}`;
    const category = "&categoryId=4bf58dd8d48988d1fa931735";
    const radius = `&radius=${options.radius}`;
    const query = options.query ? `&query=${options.query}` : "";
    return this.http.get(urlRoot + auth + version + city + category + radius + query);
  }

}