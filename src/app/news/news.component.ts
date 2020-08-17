import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from 'nativescript-angular/router';

import * as app from "tns-core-modules/application";
import { NovedadesService } from "../domain/news.service";
import { isIOS, isAndroid, Color, View } from 'tns-core-modules/ui/page';
import * as Toast from "nativescript-toast"

@Component ({
    selector: "News",
    templateUrl: "./news.component.html"
})
export class NewsComponent implements OnInit {
    plataforma_: string;
    resultados: Array<string>;
    
    @ViewChild("layout",{static: false}) layout: ElementRef;

    constructor(private listNews: NovedadesService, private router: RouterExtensions) {

    }

    ngOnInit(): void {
        if(isAndroid){
            this.plataforma_= "Android!";
        }
        else{
            this.plataforma_= "IOS!";
        }
    }
    getPlataform() {       
        return isAndroid;
    }
    
    onDrawerButtonTap(): void {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }    
    onItemTap(e): void {
        this.router.navigate(["info"]);        
        console.dir(e);
    }
    buscarAhora(s: string) {
        console.dir("Buscar ahora: " + s);
        this.listNews.buscar(s).then((r: any) => {
            console.log("Resultados: " + JSON.stringify(r));
            this.resultados = r;
        }, (e) => {
            console.log("Error buscar : " + e);
            Toast.makeText("Error en la busqueda","Long");
        })

        //const layout = <View>this.layout.nativeElement;
        //layout.animate({
            //backgroundColor: new Color("blue"),
            //duration: 300,
            //delay: 150
        //}).then(() => layout.animate({
        //    backgroundColor: new Color("white"),
            //duration: 300,
            //delay: 150
        //}))
    }
}