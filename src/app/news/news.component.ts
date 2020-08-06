import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from 'nativescript-angular/router';

import * as app from "tns-core-modules/application";
import { NovedadesService } from "../domain/news.service";
import { isIOS, isAndroid, Color, View } from 'tns-core-modules/ui/page';
import { duration } from "nativescript-toast";

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

    getNews(){
        return this.listNews.getNovedades();
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
        this.resultados = this.listNews.getNovedades().filter(x => x.indexOf(s) >= 0);

        const layout = <View>this.layout.nativeElement;
        layout.animate({
            backgroundColor: new Color("blue"),
            duration: 300,
            delay: 150
        }).then(() => layout.animate({
            backgroundColor: new Color("white"),
            duration: 300,
            delay: 150
        }))
    }
}