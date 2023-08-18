import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EChartsOption } from 'echarts';
import { CapacityService } from '../../services/capacity.service';
import { CurrentCapacity } from '../../models/current-capacity';
import { Subscription } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-capacity-graph',
  templateUrl: './capacity-graph.component.html',
  styleUrls: ['./capacity-graph.component.scss'],
})
export class CapacityGraphComponent implements OnDestroy {
  todayDate = new Date(Date.now());
  selectedDateFormControl = new FormControl(this.todayDate);
  displayData: Array<[Date, number, number]> = [];
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
    this.selectedDateFormControl.valueChanges.subscribe(() => this.fetchNewCapacity());
  }

  ngOnDestroy(): void {
    this.capacitySubscription.unsubscribe();
  }

  setPickedDate(event: MatDatepickerInputEvent<Date>) {
    let selectedDate: Date = event.value ? event.value : this.todayDate;
    this.selectedDateFormControl.setValue(selectedDate);
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
    console.log(selectedDate)
    this.selectedDateFormControl.setValue(selectedDate);
  }

  fetchNewCapacity(){
    let selectedDate: Date = this.selectedDateFormControl.value
    ? this.selectedDateFormControl.value
    : this.todayDate;

    this.capacitySubscription = this.capacityService
    .getCapacityDataForDay$(selectedDate)
    .subscribe((data) => {
      this.displayData = this.convertCurrentArrayToDisplayData(data);
      this.chartOption = this.initChart(this.displayData);
    });
  }

  private convertCurrentArrayToDisplayData(
    capacities: CurrentCapacity[]
  ): Array<[Date, number, number]> {
    let timestampCapacities: Array<[Date, number, number]> = [];

    capacities.forEach((capacity) => {
      timestampCapacities.push([
        capacity.timestamp,
        (capacity.currentlyCheckedInCount / (capacity.maximumAllowedCheckedIn - 160)) *
          100,
          capacity.currentlyCheckedInCount
      ]);
    });

    return timestampCapacities;
  }

  private initChart(data: Array<[Date, number, number]>): EChartsOption {
    return {
      legend: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          let currentCheckedInPercentage = Math.round(params.value[1]);
          let currentCheckedInCount = params.value[2];
          let date = new Date(params.value[0]);
          return (
            currentCheckedInCount + ' ' + '('+ currentCheckedInPercentage +'%) checked in at ' + 
            date.getHours() + ':'+  ( (date.getMinutes()<10?'0':'') + date.getMinutes() )
            
          );
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        axisLabel:{
          formatter: function (param: any){
            let date = new Date(param);
            return formatDate(date.toString(), 'HH:mm', 'en-US')
          }
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
      },
      visualMap: {
        top: 50,
        right: 10,
        dimension: 1,
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
