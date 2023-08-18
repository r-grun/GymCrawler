import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CapacityService } from '../../services/capacity.service';
import { CurrentCapacity } from '../../models/current-capacity';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-capacity-current',
  templateUrl: './capacity-current.component.html',
  styleUrls: ['./capacity-current.component.scss'],
})
export class CapacityCurrentComponent implements OnDestroy {
  currentCapacity: CurrentCapacity | undefined;
  capacityPercentage: number = 0;
  chartOption: EChartsOption;

  private capacitySubscription: Subscription;

  constructor(private capacityService: CapacityService) {
    this.capacitySubscription = capacityService
      .getLatestCapacity$()
      .subscribe((data) => {
        this.currentCapacity = data;
        if (this.currentCapacity)
          this.capacityPercentage = this.calculateCapacityPercentage(this.currentCapacity);
        this.chartOption = this.initChart();
      });
    this.chartOption = this.initChart();
  }

  ngOnDestroy(): void {
    this.capacitySubscription.unsubscribe();
  }

  private calculateCapacityPercentage(currentCapacity: CurrentCapacity): number{
    return Math.round( (currentCapacity.currentlyCheckedInCount / (currentCapacity.maximumAllowedCheckedIn - 160)) *
    100);
  }

  private initChart(): EChartsOption {
    let checkedInSpots = this.currentCapacity?.currentlyCheckedInCount ?? 0;
    let maximumSpots = this.currentCapacity?.maximumAllowedCheckedIn ?? 0;
    let freeSpots = maximumSpots - checkedInSpots;

    return {
      legend: {
        show: false,
      },
      series: {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#f5f5f5',
          borderWidth: 1,
        },
        label: {
          show: false,
        },
        data: [
          { value: checkedInSpots, name: 'checked in' , itemStyle: {color: '#D32F2F'}},
          { value: freeSpots, name: 'free' , itemStyle: {color: '#4CAF50'}},
        ],
      },
    };
  }
}
