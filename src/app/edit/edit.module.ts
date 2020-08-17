import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditComponent } from './edit.component';
import { EditRoutingModule } from './edit-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';


@NgModule({
    imports: [EditRoutingModule, NativeScriptCommonModule],
    exports: [],
    declarations: [EditComponent],
    schemas: [ NO_ERRORS_SCHEMA]
})
export class EditModule { }
