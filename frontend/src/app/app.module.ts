import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingsComponent } from './features/bookings/bookings.component';
import { HomeComponent } from './core/components/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { CapacityGraphComponent } from './features/capacity/components/capacity-graph/capacity-graph.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './core/services/app-config.service';
import { DatePipe } from '@angular/common';

export function setupAppConfigServiceFactory(
  service: AppConfigService
): Function {
  return () => service.load$();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CapacityGraphComponent,
    BookingsComponent,
    HomeComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {
      provide: APP_INITIALIZER,
      useFactory: setupAppConfigServiceFactory,
      deps: [
          AppConfigService
      ],
      multi: true
  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
