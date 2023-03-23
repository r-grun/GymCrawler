import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import testData from './checkin_test.json'

@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  constructor() { }

  public getCapacityData(date: Date): {"timestamp": Date, "rate": number}[]{
    
    return testData.map(item => {
      let timestamp = new Date(item.timestamp);
      let rate = (item.currentlyCheckedInCount / item.maximumAllowedCheckedIn);
      return {"timestamp": timestamp, "rate": rate}
    });
  }
}
