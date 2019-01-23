import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.pug',
  styleUrls: ['./venue.component.sass']
})
export class VenueComponent {

  constructor() { }

  @Input() venue;

}
