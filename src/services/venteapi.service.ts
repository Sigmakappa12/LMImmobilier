import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { VenteApiGlobal } from '../models/venteapi-global.model';

// Models
@Injectable()
export class VenteService {

    private baseUrl: string = 'https://example.com/api/';
    private source: string = 'the-next-web';
    private apiKey: string = '<API_KEY>';
    
    constructor(private http: Http) { }




    public getArticles() {
       const url = `${this.baseUrl}articles?source=${this.source}&sortBy=latest&apiKey=${this.apiKey}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as VenteApiGlobal)
        .catch(error => console.log('Une erreur est survenue ' + error))

    }









    public getObjects(): Promise<any> {
		const url = `${this.baseUrl}objects?apiKey=${this.apiKey}`;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(error => console.log('Une erreur est survenue ' + error))
    }

}







