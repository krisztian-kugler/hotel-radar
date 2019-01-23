import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../global/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.pug',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService) { }

  getVenues: Subscription;
  fetchStatus: Subscription;
  dataFetched: boolean = false;
  venues: any;

  ngOnInit() {
    this.getVenues = this.dataService.dataTransfer.subscribe((venues: any) => {
      this.venues = venues.response.venues;
    })
    this.fetchStatus = this.dataService.dataFetched.subscribe((dataFetched: boolean) => {
      this.dataFetched = dataFetched;
    })
  }

  ngOnDestroy() {
    this.getVenues.unsubscribe();
    this.fetchStatus.unsubscribe();
  }

}