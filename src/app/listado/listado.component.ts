import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from 'nativescript-angular/router';
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";
import * as dialogs from "tns-core-modules/ui/dialogs";

import * as app from "tns-core-modules/application";
import { Color } from "tns-core-modules/color";
import { HotelesService } from "../service/hotels.service";

@Component({
    selector: "listado",
    templateUrl: "./listado.component.html"
})
export class ListadoComponent implements OnInit {

    resultado: Array<string>;
    idItem: any;

    constructor(private router: RouterExtensions, private hotels: HotelesService){

    }
    ngOnInit() {

    }

    Hotels() {
        return this.hotels.getHotels();
    }
    onDrawerButtonTap(): void {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }    
    /*
    onPull(e): void {
        console.log(e);
        const pullRefresh = e.object;
        setTimeout(() => {
            this.hoteles.push("abc");
            pullRefresh.refreshing = false;
        },2000);
    }
    */
    onItemTap(item): void {        
        this.router.navigate(["detalle", this.hotels.getHotel(item.index)]);        
    }
    Buscar(s: string): void {
        this.resultado = this.hotels.getHotels().filter(x => x.indexOf(s) >= 0);
    }

    onLongPress(args: GestureEventData) {

        const flex = <FlexboxLayout>args.object;
        flex.rotate = 0;
        flex.animate({
            backgroundColor: new Color("blue"),
            duration: 300,
            delay: 150
        }).then(() => flex.animate({
            backgroundColor: new Color("white"),
            duration: 300,
            delay: 150
        }))        
        dialogs.action("¿Qué deseas hacer?","Cancelar", ["Borrar","Archivar"])
        .then(result => {
            if(result === "Borrar") {
                this.hotels.deleteHotel(this.hotels.getHotel(this.idItem.index));
            } else if( result === "Archivar") {
                this.hotels.archiveHotel(this.hotels.getHotel(this.idItem.index))
            }
        })
    }
}