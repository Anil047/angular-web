import {Component, OnInit, ViewChild, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {UserMgmtRole} from "../model/user-mgmt-role.model";
import {HttpService} from "../../../app/service/http.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {EventEmittingService} from "../../global/service/event-emiting.service";
/**
 * Created by anil on 3/13/17.
 */

@Component({
  selector: 'user-mgmt-role-list',
  templateUrl: '../../../assets/resources/pages/user-mgmt/role/role-list.html',
})
export class UserMgmtRoleListComponent implements OnInit,OnDestroy {
  public data: UserMgmtRole[] = [];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "name";
  public subscribedDeleteEvent;

  ngOnDestroy(): void {
    this.httpService.triggerDeleteBtn = false;
    this.subscribedDeleteEvent.unsubscribe();
  }

  public sortOrder = "asc";
  public roleToDelete: UserMgmtRole;
  public checkBoxState: boolean;
  public checkBoxCounter: number = 0;
  public deleteBtnMenu: boolean = false;



  // private url = HealthAppConstants.ROOT_URL + "UserMgmtRoleList/";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private eventEmitter:EventEmittingService
  ) {}

  @ViewChild('deleteModal')
  modal: ModalComponent;

  closeModal() {
    this.modal.close();
  }


  openModal() {
    this.modal.open();
  }

  getUserMgmtRoleListList(): void {
    let roleList: UserMgmtRole[] = [
      {id: 1, code: 'R-0001', checked: false, name: 'Admin', description: 'Admin Role'},
      {id: 2, code: 'R-0002', checked: false, name: 'Manager', description: 'Manager Role'},
      {id: 3, code: 'R-0003', checked: false, name: 'Developer', description: 'Developer Role'},
      {id: 4, code: 'R-0004', checked: false, name: 'Tester', description: 'Tester Role'},
      {id: 5, code: 'R-0005', checked: false, name: 'User', description: 'General User Role'},
      {id: 6, code: 'R-0006', checked: false, name: 'Supervisor', description: 'SuperVisor Role'},
    ];
    this.data = roleList;
  }

  ngOnInit(): void {
    this.eventEmitter.setEventSettings({menuBtnName:'View All',newBtnState:true,deleteBtnState:false});
    this.eventListner(this).then(res => this.httpService.triggerDeleteBtn = res);

    this.httpService.clearFields();
    //this.httpService.clearFields();
    this.getUserMgmtRoleListList();

  }

  onOpenModal() {
    this.httpService.triggerDeleteBtn = false;
  }

  onCloseModal() {
    this.httpService.triggerDeleteBtn = true;
  }

  //
  // eventListner():any{
  //     let me = this;
  //     me.eventEmitter.getDeleteBtnClk().subscribe((deleteBtnStatus:boolean)=>{
  //       if(deleteBtnStatus && me.httpService.triggerDeleteBtn) {
  //         console.log("Delete btn Event: "+deleteBtnStatus);
  //         me.deleteBtnMenu = deleteBtnStatus;
  //         me.deleteAll(deleteBtnStatus);
  //       }else {
  //         this.httpService.triggerDeleteBtn=true;
  //         alert("Event Listner: "+this.httpService.triggerDeleteBtn);
  //       }
  //     });
  //
  //
  //
  // }


  eventListner(me): any {
    // let me = this;
    return new Promise(function (resolve, reject) {
      let success = true;
      me.subscribedDeleteEvent = me.eventEmitter.getDeleteBtnClk().subscribe((deleteBtnStatus: boolean) => {
        if (deleteBtnStatus && me.httpService.triggerDeleteBtn) {
          me.deleteBtnMenu = deleteBtnStatus;
          me.deleteAll(deleteBtnStatus);
        }
      });
      resolve(success);
    });
  }


  deleteAll(deleteStatus: boolean) {
    if (deleteStatus) {
      this.openModal();
    }
  }

  public removeRole(role: UserMgmtRole, rowNum) {
    this.deleteBtnMenu = false;
    this.roleToDelete = role;
    let index1 = this.data.indexOf(role);
    if (!this.data[index1].checked) {
      this.data[index1].checked = true;
      this.checkBoxCounter++;
    }
    this.openModal();
    //let index1 = this.data.indexOf(role);
    // this.data.splice(index1, 1);
    // this.httpService.deleteRow(this.url + `${bed.id}`)
    //     .subscribe(
    //         (res: Response) => {
    //             if (res.statusText.toString().toLowerCase() == "ok") {
    //                 let index1 = this.data.indexOf(bed);
    //                 this.data.splice(index1, 1);
    //             }
    //
    //             // console.log("Delete Response: "+res.statusText)
    //         });
  }

  onDeleteConfirm(confirmDelete: boolean) {
    let index1 = this.data.indexOf(this.roleToDelete);
    if (!this.deleteBtnMenu) {
      if (confirmDelete) {
        this.data.splice(index1, 1);
      } else {
        this.data[index1].checked = false;
        this.roleToDelete = null;
      }
      this.checkBoxCounter--;
    } else {
      if (confirmDelete) {
        this.onDeleteConfirmFromMenu(this.deleteBtnMenu);
      }
    }
    this.closeModal();
    if (this.checkBoxCounter == 0) {
      this.eventEmitter.setEventSettings({menuBtnName: 'View All', newBtnState: true, deleteBtnState: false});
    }

  }

  public editRole(role: UserMgmtRole) {
    this.httpService.model = role;
    this.httpService.otherSettings = {
      buttonName: 'Update',
      showMsg: false,
      infoMsg: 'Record Updated Successfully',
      onSubmitUrl: 'update'
    };
    //eventSettings:EventSetting = {menuBtnName:'none',newBtnState};

    this.eventEmitter.setEventSettings({menuBtnName:'none',newBtnState:false,deleteBtnState:false});
    this.router.navigate([this.route.children, {outlets: {'roleContainer': ['form']}}],
      {relativeTo: this.route});
  }

  onCheckBoxClk() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].checked = !this.checkBoxState;
    }
    this.checkBoxState = this.data[0].checked;
    if (this.checkBoxState) {
      this.checkBoxCounter = this.data.length;
    } else {
      this.checkBoxCounter = 0;
    }
    if (this.data.length != 0) {
      this.eventEmitter.setEventSettings({
        menuBtnName: 'View All',
        newBtnState: true,
        deleteBtnState: this.checkBoxState
      });
    }
  }

  onEachCheckBoxClk(item) {
    let checkedStatus: boolean;
    let index1 = this.data.indexOf(item);
    checkedStatus = this.data[index1].checked;
    this.data[index1].checked = !checkedStatus;
    if (!checkedStatus) {
      this.checkBoxCounter++;
    } else {
      this.checkBoxCounter--;
    }
    if (this.checkBoxCounter != 0) {
      this.eventEmitter.setEventSettings({menuBtnName: 'View All', newBtnState: true, deleteBtnState: true});
    } else {
      this.checkBoxState = false;
      this.eventEmitter.setEventSettings({menuBtnName: 'View All', newBtnState: true, deleteBtnState: false});
    }
  }

  onDeleteConfirmFromMenu(status: boolean) {
    let totalLoop = this.checkBoxCounter;
    //alert("data size: "+this.data.length + " checkBoxcounter: "+this.checkBoxCounter +" deleteBtnStatus: "+this.deleteBtnMenu);
    // alert('data: '+JSON.stringify(this.data));
    if (status) {
      for (let i = this.data.length - 1; i >= 0; i--) {
        if (this.data[i].checked) {
          this.data.splice(i, 1);
          this.checkBoxCounter--;
        }
      }
      this.checkBoxState = false;
    }
    if (this.checkBoxCounter == 0) {
      this.eventEmitter.setEventSettings({menuBtnName: 'View All', newBtnState: true, deleteBtnState: false});
    }
    this.closeModal();
    //this.eventEmitter.setDeleteBtnClk(false);


  }


}
