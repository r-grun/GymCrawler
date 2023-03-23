import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { color } from 'echarts/types/dist/echarts';
import { CapacityService } from '../../services/capacity.service';

@Component({
  selector: 'app-capacity-current',
  templateUrl: './capacity-current.component.html',
  styleUrls: ['./capacity-current.component.scss'],
})
export class CapacityCurrentComponent {

  constructor(private capacityService: CapacityService){}

  todayDate = new Date(Date.now());
  selectedDate = new FormControl(this.todayDate);
  private displayData = this.capacityService.getCapacityData(new Date());

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
      max: 1
    },
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          gt: 0,
          lte: 0.4,
          color: '#4CAF50',
        },
        {
          gt: 0.4,
          lte: 0.7,
          color: '#FFA000',
        },
        {
          gt: 0.7,
          lte: 1,
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
        y: 'rate'
      },
      markLine: {
        silent: true,
        lineStyle: {
          color: '#99A3A4',
          type: 'dashed',
        },
        data: [
          {
            yAxis: 0.4,
          },
          {
            yAxis: 0.7,
          },
        ],
      },
    },
  };
}
