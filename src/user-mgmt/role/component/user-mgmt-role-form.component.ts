/**
 * Created by anil on 3/23/17.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserMgmtRole} from "../model/user-mgmt-role.model";
import {Router} from "@angular/router";
import {HttpService} from "../../../app/service/http.service";
import {EventEmittingService} from "../../global/service/event-emiting.service";
@Component({
  moduleId:module.id,
  selector: 'user-mgmt-role-form',
  templateUrl:'../../../assets/resources/pages/user-mgmt/role/role-form.html'
})

export class UserMgmtRoleFormComponent implements OnInit{
  //global
  buttonName: string = "Submit";
  showMsg: boolean = false;
  infoMsg: string = "New Role Has been added Successfully";
  styleClass: string = "alert-success";
  //private url = HealthAppConstants.ROOT_URL + "Bed/";
  onSubmitUrl = 'add';
  //Model Driven Form Validation
  userMgmtRole:UserMgmtRole = new UserMgmtRole();
  roleForm: FormGroup;
  id: FormControl;
  name: FormControl;
  code: FormControl;
  description: FormControl;
  constructor(
    private router:Router,
    private httpService:HttpService,
    private eventEmitter:EventEmittingService
  ){}
  ngOnInit() {
    this.checkEditEvent();
    if (this.buttonName === 'Submit') {
      this.eventEmitter.setEventSettings({menuBtnName: 'New', newBtnState: true, deleteBtnState: false});
    }
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.id = new FormControl(this.userMgmtRole.id);
    this.name = new FormControl(this.userMgmtRole.name, [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.code = new FormControl(this.userMgmtRole.code, [
      Validators.required,
    ]);
    this.description = new FormControl(this.userMgmtRole.description);
  }

  createForm() {
    this.roleForm = new FormGroup({
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description
    });
  }

  onSubmit(event){
    event.preventDefault();
    alert(JSON.stringify(this.roleForm.value));
  }

  onAddNewBtnClk(){
    this.roleForm.reset();
    this.buttonName='Submit';
    this.eventEmitter.setEventSettings({menuBtnName:'New',newBtnState:true,deleteBtnState:false});
  }

  private checkEditEvent() {
    if (typeof this.httpService.otherSettings != 'undefined') {
      if (typeof this.httpService.otherSettings.buttonName != 'undefined') {
        let otherSettings = this.httpService.otherSettings;
        if (otherSettings.buttonName.toLowerCase() == 'update') {
          this.buttonName = otherSettings.buttonName;
          this.showMsg = otherSettings.showMsg;
          this.infoMsg = otherSettings.infoMsg;
          this.onSubmitUrl = otherSettings.onSubmitUrl;
          this.userMgmtRole = this.httpService.model;
        }
      }
    }
  }
}
