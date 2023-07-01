import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EChartsOption } from 'echarts';
import { CapacityService } from '../../services/capacity.service';
import { CurrentCapacity } from '../../models/current-capacity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-capacity-graph',
  templateUrl: './capacity-graph.component.html',
  styleUrls: ['./capacity-graph.component.scss'],
})
export class CapacityGraphComponent implements OnDestroy {
  todayDate = new Date(Date.now());
  selectedDateFormControl = new FormControl(this.todayDate);
  displayData: Array<[Date, number]> = [];
  chartOption: EChartsOption;
  capacitySubscription: Subscription;

  constructor(private capacityService: CapacityService) {
    this.selectedDateFormControl.setValue(this.todayDate);
    this.capacitySubscription = capacityService
      .getCapacityDataForDay$(this.todayDate)
      .subscribe((data) => {
        this.displayData = this.convertCurrentArrayToDisplayData(data);
        this.chartOption = this.initChart(this.displayData);
      });
    this.chartOption = this.initChart(this.displayData);
  }

  ngOnDestroy(): void {
    this.capacitySubscription.unsubscribe();
  }

  setPickedDate(event: MatDatepickerInputEvent<Date>) {
    let selectedDate: Date = event.value ? event.value : this.todayDate;
    this.selectedDateFormControl.setValue(selectedDate);
    this.capacitySubscription = this.capacityService
      .getCapacityDataForDay$(selectedDate)
      .subscribe((data) => {
        this.displayData = this.convertCurrentArrayToDisplayData(data);
        this.chartOption = this.initChart(this.displayData);
      });
  }

  changeDate(amount: string) {
    let selectedDate: Date = this.selectedDateFormControl.value
      ? this.selectedDateFormControl.value
      : this.todayDate;
    if (amount === 'later') {
      selectedDate.setDate(selectedDate.getDate() + 1);
    } else {
      selectedDate.setDate(selectedDate.getDate() - 1);
    }
    this.selectedDateFormControl.setValue(selectedDate);
  }

  private convertCurrentArrayToDisplayData(
    capacities: CurrentCapacity[]
  ): Array<[Date, number]> {
    let timestampCapacities: Array<[Date, number]> = [];

    capacities.forEach((capacity) => {
      timestampCapacities.push([
        capacity.timestamp,
        (capacity.currentlyCheckedInCount / capacity.maximumAllowedCheckedIn) *
          100,
      ]);
    });

    return timestampCapacities;
  }

  private initChart(data: Array<[Date, number]>): EChartsOption {
    return {
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
        showSymbol: false,
        data: data,
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
      },
      dataZoom: {
        type: 'slider',
      },
    };
  }
}
