import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {EventEmittingService} from "../../global/service/event-emiting.service";
import {EventSetting} from "../../global/model/event-setting.model";
//import * as $ from 'jquery';
/**
 * Created by anil on 3/22/17.
 */

@Component({
  selector:'role-widget',
  templateUrl: '../../../assets/resources/pages/user-mgmt/role/role-container.html'
})

export class UserMgmtRoleComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscribeEvent.unsubscribe();
  }
  currentPage = "Role";
  formMenu = {newBtn:'New',deleteBtn:'Delete', viewBtn:'View All'};
  selected:string;
  newBtnState: boolean;
  deleteBtnState: boolean;
  subscribeEvent: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventEmitter: EventEmittingService,) {
  }

  ngOnInit(): void {
    this.subscribeEvent = this.eventEmitter.getEventSettings().subscribe((eventSettings: EventSetting) => {
        this.selected=eventSettings.menuBtnName;
        this.newBtnState=eventSettings.newBtnState;
        this.deleteBtnState=eventSettings.deleteBtnState;
      });
    //   this.selected = 'View All';
    // this.router.navigate([this.route.children,{outlets: {'roleContainer':['list']}}],
    //   {relativeTo: this.route});
  }

  naviageTo(pathName,btnName){
    this.selected=btnName;
     this.router.navigate([this.route.children,{outlets: {'roleContainer':[pathName]}}],
       {relativeTo: this.route});
  }

  naviageToList(btnName) {
    this.selected = btnName;
    this.router.navigate(['../role'], {relativeTo: this.route});
  }

  onDeleteBtnClk(event) {
    event.preventDefault();
    //this.httpService.triggerDeleteBtn=true;
    this.eventEmitter.setDeleteBtnClk(true);
  }



}
