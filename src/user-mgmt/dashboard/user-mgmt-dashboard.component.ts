/**
 * Created by anil on 3/22/17.
 */
import {Component, OnInit} from "@angular/core";
import * as  jQuery from "jquery";
import "../../../src/assets/resources/bootstrap/js/bootstrap.min.js";
import "../../../src/assets/resources/plugins/fastclick/fastclick.js";
import "../../..//src/assets/resources/plugins/fastclick/fastclick.js";
import "../../../src/assets/resources/dist/js/app.min.js";
declare let $:any;
declare let FastClick:any;
@Component({
  moduleId:module.id,
  selector:'user-mgmt-dashboard',
  templateUrl: '../../../src/assets/resources/pages/user-mgmt/dashboard/dashboard.html'
})

export class UserMgmtDashboardComponent implements OnInit{

  ngOnInit(): void {
    jQuery('#app-body').removeClass('login-page');
    jQuery('#app-body').addClass('skin-blue sidebar-mini');

    //Easy access to options
    let adminLteOptions = $.AdminLTE.options;

    //Activate the layout maker
    $.AdminLTE.layout.activate();

    //Enable sidebar tree view controls
    $.AdminLTE.tree('.sidebar');

    //Enable control sidebar
    if (adminLteOptions.enableControlSidebar) {
      $.AdminLTE.controlSidebar.activate();
    }

    //Add slimscroll to navbar dropdown
    if (adminLteOptions.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
      $(".navbar .menu").slimscroll({
        height: adminLteOptions.navbarMenuHeight,
        alwaysVisible: false,
        size: adminLteOptions.navbarMenuSlimscrollWidth
      }).css("width", "100%");
    }

    //Activate Bootstrap tooltip
    if (adminLteOptions.enableBSToppltip) {
      $('body').tooltip({
        selector: adminLteOptions.BSTooltipSelector
      });
    }

    //Activate box widget
    if (adminLteOptions.enableBoxWidget) {
      $.AdminLTE.boxWidget.activate();
    }

    //Activate fast click
    if (adminLteOptions.enableFastclick && typeof FastClick != 'undefined') {
      FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (adminLteOptions.directChat.enable) {
      $(document).on('click', adminLteOptions.directChat.contactToggleSelector, function () {
        var box = $(this).parents('.direct-chat').first();
        box.toggleClass('direct-chat-contacts-open');
      });
    }
  }
}
