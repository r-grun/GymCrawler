import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-capacity-current',
  templateUrl: './capacity-current.component.html',
  styleUrls: ['./capacity-current.component.scss'],
})
export class CapacityCurrentComponent {
    todayDate = new Date(Date.now());
    selectedDate = new FormControl(this.todayDate);
}
