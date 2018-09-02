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

    public getLocales(): Observable<any> {
        return this.http.get(this.url + '/locales');
    }

    public getPrevious(): Observable<any> {
        return this.http.get(this.url + '/previous');
    }
}
