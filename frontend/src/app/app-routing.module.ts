import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { BookingsComponent } from './features/bookings/bookings.component';
import { CapacityCurrentComponent } from './features/capacity/components/capacity-current/capacity-current.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'capacity', component: CapacityCurrentComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
