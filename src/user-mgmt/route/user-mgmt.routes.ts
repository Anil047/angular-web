import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserMgmtLoginComponent} from "../login/component/user-mgmt-login.component";
import {UserMgmtDashboardComponent} from "../dashboard/user-mgmt-dashboard.component";
import {UserMgmtRoleComponent} from "../role/component/user-mgmt-role.component";
import {UserMgmtRoleFormComponent} from "../role/component/user-mgmt-role-form.component";
import {UserMgmtRoleListComponent} from "../role/component/user-mgmt-role-list.component";
/**
 * Created by anil on 3/22/17.
 */
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:UserMgmtLoginComponent},
  {path:'dashboard',component:UserMgmtDashboardComponent,children:[
    {path:'role',component:UserMgmtRoleComponent, outlet:'userMgmt',children:[
      {path: '', component: UserMgmtRoleListComponent, outlet: 'roleContainer'},
      {path: 'form', component: UserMgmtRoleFormComponent, outlet: 'roleContainer'}

    ]}
  ]}
  //{path:'**', redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class UserMgmtRoute{}
