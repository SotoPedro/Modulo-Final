import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ListadoRoutingModule } from "./listado-routing.module";
import { ListadoComponent } from "./listado.component";
import { MinLenDirective } from "./validator";
import { ListadoFormComponent } from "./listado-form.component";
import { HotelesService } from "../service/hotels.service";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        ListadoRoutingModule
    ],
    declarations: [
        ListadoComponent,
        MinLenDirective,
        ListadoFormComponent
    ],
    providers: [
        HotelesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ListadoModule { }