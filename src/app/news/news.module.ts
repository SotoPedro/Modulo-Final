import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news.component";
import { NewsFormComponent } from "./news-form.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NewsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        NewsComponent,
        NewsFormComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewsModule { }