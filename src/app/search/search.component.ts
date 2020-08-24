import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { FavoritosService } from "../domain/favs.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import * as Toast from "nativescript-toast";
import { NuevaNoticiaAction, Noticia } from "../domain/noticias-state.model";
import * as SocialShare from "nativescript-social-share";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    value: string;

    constructor(private favs: FavoritosService,private store: Store<AppState>) { //injectamos la dependecia del store de redux
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
       this.store.select((state) => state.noticias.sugerida) //seleccionamos el global, seleccionamos las noticias y detro de estás, las sugeridas
       .subscribe((data) => { //nos suscribimos a la informaciónq que nos manda
           const f = data;
           if(f != null) {
               let t = Toast.makeText("Te guerimos leer: " + f.titulo);
               t.show();

           }
       })
    }
    onItemTap(args): void {
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindinContext))); //nos sirve para ejecutar una nueva acción
        SocialShare.shareText("hola");
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onAddButton(s: string) {
        this.favs.buscar(this.value);
    }
    getFavs() {
        return this.favs.sendDB();
    }

}
