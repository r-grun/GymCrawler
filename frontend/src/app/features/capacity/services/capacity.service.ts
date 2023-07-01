import { Injectable } from '@angular/core';
import testData from './checkin_test.json';
import { CurrentCapacity } from '../models/current-capacity';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CapacityService {
  private BACKEND_URL: string;
  private PATH = 'capacity/';

  constructor(
    private _appConfig: AppConfigService,
    private _httpClient: HttpClient,
    private _datepipe: DatePipe
  ) {
    this.BACKEND_URL = _appConfig.data.backendUrl ?? '';
  }

  public getCapacityDataForDay$(date: Date): Observable<CurrentCapacity[]> {
    let httpHeaders = new HttpHeaders();
    httpHeaders
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Origin', '*');

    const httpOptions = {
      headers: httpHeaders
    };

    let formattedDate = this._datepipe.transform(date, 'yyyy-MM-dd')
    let req = this._httpClient.get<CurrentCapacity[]>(this.BACKEND_URL + this.PATH + formattedDate, httpOptions);

    return req
  }

  public getLatestCapacity$(): Observable<CurrentCapacity> {
    let res: CurrentCapacity = {
      timestamp: new Date(testData[-1].timestamp),
      centerId: testData[-1].centerId,
      currentlyCheckedInCount: testData[-1].currentlyCheckedInCount,
      maximumAllowedCheckedIn: testData[-1].maximumAllowedCheckedIn,
      numberOfAvailableSpots: testData[-1].numberOfAvailableSpots,
      numberOfReservedSpots: testData[-1].numberOfReservedSpots,
      webName: testData[-1].webName,
      status: testData[-1].status,
    };

    return of(res);
  }
}
