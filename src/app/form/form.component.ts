import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../global/data.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '../global/location.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.pug',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  getVenues: Subscription;

  formData = {
    location: <string>"",
    query: <string>"",
    radius: <number>3000
  }

  onSubmit(form: NgForm): void {
    this.dataService.dataFetched.next(false);
    let location: string;
    form.value.location.length > 0 ? location = form.value.location : location = this.dataService.userLocation;
    this.dataService.formData = form.value;

    if (this.router.url.endsWith("results")) {
      this.sendRequest(location, form.value.radius, form.value.query);
    } else {
      let navigate: Promise<boolean> = this.router.navigate(["/results"]);
      navigate.then(() => {
        this.sendRequest(location, this.dataService.formData.radius, this.dataService.formData.query);
      });
    }
  }

  sendRequest(location: string, radius: number, query: string): void {
    this.getVenues = this.dataService.getVenues(location, { radius: radius, query: query }).subscribe(venues => {
      this.dataService.dataTransfer.next(venues);
      this.dataService.dataFetched.next(true);
    });
  }

  getUserLocation(): void {
    this.dataService.getUserLocation().subscribe((location: Location) => {
      this.formData.location = location.city;
      this.dataService.userLocation = location.city;
    });
  }

  ngOnInit() {
    if (this.router.url.endsWith("home")) {
      this.getUserLocation();
    } else if (this.router.url.endsWith("results")) {
      if (!this.dataService.userLocation) {
        this.getUserLocation();
      }
      this.formData = this.dataService.formData;
    }
  }

}
