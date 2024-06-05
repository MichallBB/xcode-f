import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RequestModel } from '../models/request.model';
import { ListOfRequestsComponent } from '../list-of-requests/list-of-requests.component';


@Injectable({
  providedIn: 'root',
})
export class RequestService {
    http = inject(HttpClient);
    formSubmitted = new Subject<void>();

    getRequests(): Observable<RequestModel[]> {
        return this.http.get<RequestModel[]>('http://localhost:8080/currencies/requests');
    }

    getCurrencyValue(currencyCode: string, name: string): Observable<number> {
        return this.http.post<number>('http://localhost:8080/currencies/get-current-currency-value-command', {currencyCode, name});
    }
}