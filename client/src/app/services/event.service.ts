import { Injectable } from '@angular/core';
import { Event, Message, Sponsor } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventServise {

    constructor(private http: HttpClient) { }


    getById(id: string): Observable<Event> {
        return this.http.get<Event>(`api/event/${id}`)
    }

    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>('/api/event')
    }

    getTopSponsorsById(id: String): Observable<Sponsor[]> {
        return this.http.get<Sponsor[]>(`/api/user/sponsors/${id}`)
      }

    create(event: Event): Observable<Event> {
        return this.http.post<Event>('/api/event', event)
    }

    update(event: Event): Observable<Event> {
        return this.http.patch<Event>(`/api/event/${event._id}`, event)
    }

    delete(id: String): Observable<Message> {
        return this.http.delete<Message>(`/api/event/${id}`)
    }

}
