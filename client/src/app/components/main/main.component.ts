import { Component, OnInit } from '@angular/core';
import { EventServise } from 'src/app/services/event.service';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private eventService: EventServise) { }

  events: Event[] = [];

  ngOnInit() {
    this.eventService.getAll().subscribe(e => {
      this.events = e;
      console.log('here');
      console.log(this.events);
    });
  }

}
