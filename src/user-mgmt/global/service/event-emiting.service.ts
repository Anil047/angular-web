import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {EventSetting} from "../model/event-setting.model";
/**
 * Created by anil on 3/25/17.
 */
@Injectable()
export class EventEmittingService {

  private eventSettings: EventSetting;
  private menuBtn:string;
  private deletebtnClk: boolean;
  private subject: Subject<EventSetting> = new Subject<EventSetting>();

  private menuBtnSubject:Subject<string> = new Subject<string>();
  private deleteBtnSubject: Subject<any> = new Subject<any>();


  setEventSettings(eventSettings: EventSetting): void {
    this.eventSettings = eventSettings;
    this.subject.next(eventSettings);
  }

  getEventSettings(): Observable<EventSetting> {
    return this.subject.asObservable();
  }

  setMenuBtn(menuBtn:string){
    this.menuBtn=menuBtn;
    this.menuBtnSubject.next(menuBtn);
  }

  getMenuBtn(menuBtn:string){
    return this.menuBtnSubject.asObservable();
  }

  setDeleteBtnClk(status: boolean) {
    this.deletebtnClk = status;
    this.deleteBtnSubject.next(status);
  }

  getDeleteBtnClk() {
    return this.deleteBtnSubject.asObservable();
  }

}
