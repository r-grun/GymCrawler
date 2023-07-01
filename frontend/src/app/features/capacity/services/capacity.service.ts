import { Injectable } from '@angular/core';
import testData from './checkin_test.json'
import { CurrentCapacity } from '../models/current-capacity';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  constructor() { }

  public getCapacityDataForDay$(date: Date): Observable<CurrentCapacity[]>{
    let res = new Array<CurrentCapacity>;
    
    testData.forEach(item => {
      res.push ({
        timestamp: new Date(item.timestamp),
        centerId: item.centerId,
        currentlyCheckedInCount: item.currentlyCheckedInCount,
        maximumAllowedCheckedIn: item.maximumAllowedCheckedIn,
        numberOfAvailableSpots: item.numberOfAvailableSpots,
        numberOfReservedSpots: item.numberOfReservedSpots,
        webName: item.webName,
        status: item.status
      });
    });

    return of(res);
  }

  public getLatestCapacity$(): Observable<CurrentCapacity>{
    let res: CurrentCapacity = {
      timestamp: new Date(testData[-1].timestamp),
        centerId: testData[-1].centerId,
        currentlyCheckedInCount: testData[-1].currentlyCheckedInCount,
        maximumAllowedCheckedIn: testData[-1].maximumAllowedCheckedIn,
        numberOfAvailableSpots: testData[-1].numberOfAvailableSpots,
        numberOfReservedSpots: testData[-1].numberOfReservedSpots,
        webName: testData[-1].webName,
        status: testData[-1].status
    };
    
    return of(res);
  }
}
