import { Injectable, EventEmitter } from '@angular/core';
import { EmitterVisitorContext } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public updateLog: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
