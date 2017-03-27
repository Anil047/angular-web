import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {UserMgmtRoute} from "../user-mgmt/route/user-mgmt.routes";
import {UserMgmtLoginComponent} from "../user-mgmt/login/component/user-mgmt-login.component";
import {UserMgmtDashboardComponent} from "../user-mgmt/dashboard/user-mgmt-dashboard.component";
import {UserMgmtRoleComponent} from "../user-mgmt/role/component/user-mgmt-role.component";
import {UserMgmtRoleFormComponent} from "../user-mgmt/role/component/user-mgmt-role-form.component";
import {DataTableModule} from "angular2-datatable";
import {HttpService} from "./service/http.service";
import {UserMgmtRoleListComponent} from "../user-mgmt/role/component/user-mgmt-role-list.component";
import {DataFilterPipe} from "../user-mgmt/utils/pipe/data-filter.pipe";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {EventEmittingService} from "../user-mgmt/global/service/event-emiting.service";

@NgModule({
  declarations: [
    AppComponent,
    UserMgmtLoginComponent,
    UserMgmtDashboardComponent,
    UserMgmtRoleComponent,
    UserMgmtRoleFormComponent,
    UserMgmtRoleListComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UserMgmtRoute,
    ReactiveFormsModule,
    DataTableModule,
    Ng2Bs3ModalModule
  ],
  providers: [HttpService,EventEmittingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
