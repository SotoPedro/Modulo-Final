import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { DetalleComponent } from './detalle.component';
import { DetalleRoutingModule } from "./detalle-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        DetalleRoutingModule
    ],    
    declarations: [DetalleComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]    
})
export class DetalleModule { }
