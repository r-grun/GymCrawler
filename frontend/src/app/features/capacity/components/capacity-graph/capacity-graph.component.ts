import { Component } from '@angular/core';
import { FormControl,  } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EChartsOption } from 'echarts';
import { CapacityService } from '../../services/capacity.service';

@Component({
  selector: 'app-capacity-graph',
  templateUrl: './capacity-graph.component.html',
  styleUrls: ['./capacity-graph.component.scss'],
})
export class CapacityGraphComponent {
  constructor(private capacityService: CapacityService) {
    this.selectedDateFormControl.setValue(this.todayDate);
  }

  todayDate = new Date(Date.now());
  selectedDateFormControl = new FormControl(this.todayDate);
  private displayData = this.capacityService.getCapacityData(this.todayDate);

  chartOption: EChartsOption = {
    dataset: {
      source: this.displayData,
    },
    legend: {
      show: false,
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
    },
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          lte: 40,
          color: '#4CAF50',
        },
        {
          gt: 40,
          lte: 70,
          color: '#FFA000',
        },
        {
          gt: 70,
          color: '#D32F2F',
        },
      ],
      outOfRange: {
        color: '#999',
      },
    },
    series: {
      type: 'line',
      encode: {
        x: 'timestamp',
        y: 'rate',
      },
      markLine: {
        silent: true,
        lineStyle: {
          color: '#99A3A4',
          type: 'dashed',
        },
        data: [
          {
            yAxis: 40,
          },
          {
            yAxis: 70,
          },
        ],
      },
      showSymbol: false,
    },
    dataZoom: {
      type: 'slider',
    },
  };

  setPickedDate(event: MatDatepickerInputEvent<Date>) {
    let selectedDate: Date = event.value ? event.value : this.todayDate;
    this.selectedDateFormControl.setValue(selectedDate);
    this.displayData = this.capacityService.getCapacityData(selectedDate);
  }

  changeDate(amount: string) {
    let selectedDate: Date = this.selectedDateFormControl.value ? this.selectedDateFormControl.value : this.todayDate;
    if (amount === 'later') {
      selectedDate.setDate(selectedDate.getDate() + 1);
    } else {
      selectedDate.setDate(selectedDate.getDate() - 1);
    }
    this.selectedDateFormControl.setValue(selectedDate);
  }
}
