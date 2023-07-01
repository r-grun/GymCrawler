import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  data: AppConfig = {};

  private CONFIG_FILE_PATH = '../../../assets/app.config.json'

  constructor(private _httpClient: HttpClient) { }

  load$(defaults?: AppConfig): Promise<AppConfig> {
    return new Promise<AppConfig>(resolve => {
      this._httpClient.get(this.CONFIG_FILE_PATH).subscribe(
        response => {
          console.log('using default configuration');
          this.data = Object.assign({}, defaults || {}, response || {});
          resolve(this.data);
        }
      );
    });
  }
}
