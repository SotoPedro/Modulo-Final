import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
const Toast = require("nativescript-toast");
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: "Edit",
  templateUrl: "./edit.component.html"
})
export class  EditComponent implements OnInit{

    txtValue: string;
  constructor(private router: RouterExtensions) {

  }

  ngOnInit(): void {
    this.txtValue = appSettings.getString("NombreUsuario");
  }
  onSaveItem(): void {
    appSettings.setString("NombreUsuario",this.txtValue);    
    let toast = Toast.makeText("Se ha guardado con éxito");
    toast.show();
    this.router.navigate(["settings"]);
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
}