import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NovedadesService } from "./domain/news.service";
import { FavoritosService } from "./domain/favs.service";
import { NoticiasState, reducersNoticias, initializeNoticiaState, NoticiasEffects } from "./domain/noticias-state.model";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

//redux init
export interface AppState { //definimos un estado global al modulo
    noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
    noticias: reducersNoticias
}

const reducerInitialState = {
    noticias: initializeNoticiaState() //inicializamos el store (el objeto)
}
//fin redux init

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgRxStoreModule.forRoot(reducers, { initialState: reducerInitialState}), //definimos un estado raiz
        EffectsModule.forRoot([NoticiasEffects]) //si tenemos muchos effects, es añadirlos aquí
    ],
    providers: [
        NovedadesService,
        FavoritosService
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
