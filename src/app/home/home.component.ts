import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as Camera from  "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import { ImageAsset } from "tns-core-modules/image-asset";
import * as ImageSoruceModule from "image-source";
import * as SocialShare from "nativescript-social-share";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonTap(): void {
        Camera.requestCameraPermissions().then(
            function success() {
                const options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true};
                Camera.takePicture(options).then((imageAsset) => {                    
                    ImageSoruceModule.fromAsset(imageAsset)
                    .then((imageSoruce) => {
                        SocialShare.shareImage(imageSoruce,"Asunto: Compartdio dede el curso");
                    }).catch((err) => {console.log("Error" + err.message);});
                }).catch((err) => {
                    console.log("Error -> " + err.message);
                });
            },() => { console.log("Permiso no aceptado por usuario");}
        );
    }
}
