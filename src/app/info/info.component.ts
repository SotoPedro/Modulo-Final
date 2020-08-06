import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Info",
    templateUrl: "./info.component.html"
})
export class InfoComponent implements OnInit {
    constructor() {

    }
    ngOnInit(): void {

    }
    onDrawerButtonTap(): void {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }    
}