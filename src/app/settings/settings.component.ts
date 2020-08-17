import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";
import * as appSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    nombreUsuario: string = "Luis";     
    constructor(private router: RouterExtensions) {
        // Use the component constructor to inject providers.        
    }

    doLater(fn) { setTimeout(fn,1000);}

    ngOnInit(): void {
        // Init your component properties here.
        /*
        this.doLater(() => {
            dialogs.action("Mensaje","Cancelar",["Opcion1","Opcion2"])
                .then(result => {
                    console.log("Resultado: " + result);
                    if(result === "Opcion1") {
                        this.doLater(() => 
                            dialogs.alert({
                                title: "Titulo 1",
                                message: "msj 1",
                                okButtonText: "btn1"
                            }).then(() => console.log("Cerrado 1")));
                    } else if(result === "Opcion2") {
                        this.doLater(() => 
                            dialogs.alert({
                                title: "titulo 2",
                                message: "msj 2",
                                okButtonText: "btn 2"
                            }).then(() => console.log("cerrado 2")));
                    }
                })
        });
        */
       /*const toast = Toast.makeText("Hello world","long");       
       this.doLater(() => toast.show());
       */          
       this.nombreUsuario = appSettings.getString("NombreUsuario");
    }
        
    onEditionNavigation(): void {
        this.router.navigate(["Edit"]);
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
