import { Component, OnInit } from '@angular/core';
import { DataService } from '../global/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '../global/location.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {}

}
