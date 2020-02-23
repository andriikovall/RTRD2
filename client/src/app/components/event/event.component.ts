import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventServise } from 'src/app/services/event.service';
import { Event } from '../../interfaces';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Event;

  reported = false;

  @ViewChild('reportModal', { static: true }) public reportModal;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventServise ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.getById(id).subscribe(ev => {
      this.event = ev;
    }, err => {
      console.log(err);
    })
  }

  onReportClicked() {
    this.reportModal.show();
  }

  onReportConfirmed() {
    this.reported = true;
    setTimeout(() => this.reportModal.hide(), 3000);
  }


}
