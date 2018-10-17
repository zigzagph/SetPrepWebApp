import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

/* const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
    })
}; */

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private url = 'http://' + location.hostname + ':3000';

    constructor(private http: HttpClient) { }

    public getSongs(): Observable<any> {        
        //return this.http.get(this.url + '/songs').pipe(map( (res: Response) => res));
        return this.http.get(this.url + '/songs');
    }

    public getVenues(): Observable<any> {
        return this.http.get(this.url + '/venues');
    }

    public getAllLocales(): Observable<any> {
        return this.http.get(this.url + '/locales');
    }

    public getPrevious(shows: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders()
                        .append('Content-Type', 'application/json, text/plain'),
            params: new HttpParams()
                        .append('shows', shows)
        };
        return this.http.get(this.url + '/previous', httpOptions);
    }
}
