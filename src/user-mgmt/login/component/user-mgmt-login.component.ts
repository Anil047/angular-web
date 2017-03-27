import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
//import * as $ from 'jquery';
/**
 * Created by anil on 3/22/17.
 */

@Component({
  moduleId:module.id,
  selector:'login-widget',
  templateUrl: '../../../assets/resources/pages/user-mgmt/login/login.html'
})

export class UserMgmtLoginComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit() {

  }

  onSubmit(event){
    event.preventDefault();
   // console.log(("Hello"));
    //alert("How'dy");
    this.router.navigate(['/dashboard']);
  }
}
