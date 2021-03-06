import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { EditComponent } from './edit.component';

const routes: Routes = [
    {path: "", component: EditComponent}
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],    
})
export class EditRoutingModule { }
